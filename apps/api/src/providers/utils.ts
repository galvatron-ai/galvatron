import { ParsedEvent, ReconnectInterval, createParser } from "eventsource-parser";
import { ANTHROPIC, GOOGLE, MISTRAL, OPENAI, PERPLEXITY, PROVIDERS, TOGETHER } from "../globals";

export const createStream = (response: Response, provider: (typeof PROVIDERS)[number]): ReadableStream<any> => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let tokens = 0;

  return new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;

          if (data === "[DONE]") {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            let text = "";

            if (provider === ANTHROPIC) {
              if (json.usage?.output_tokens) {
                tokens += json.usage.output_tokens;
              }

              if (json.type === "content_block_start" || json.type === "content_block_delta") {
                text = json.delta?.text || "";
              } else if (json.type === "message_stop") {
                controller.close();
                return;
              }
            }

            if ([OPENAI, PERPLEXITY, MISTRAL, TOGETHER].includes(provider)) {
              text = json.choices[0]?.delta?.content || "";
            }

            if (provider === GOOGLE) {
              text = json.candidates[0]?.content.parts[0].text || "";
            }

            if (text) {
              const queue = encoder.encode(text);
              controller.enqueue(queue);
            }
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);

      try {
        for await (const chunk of response.body as any) {
          parser.feed(decoder.decode(chunk));
        }
      } catch (e) {
        controller.error(e);
      }
    },
  });
};
