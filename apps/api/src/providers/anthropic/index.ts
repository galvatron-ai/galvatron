import { Context } from "hono";
import { ANTHROPIC, DEFAULT_MODELS, MODELS } from "../../globals";
import { OpenAIChatCompletionRequest } from "../openai/types";
import { createStream } from "../utils";
import type { AnthropicResponse } from "./types";

const createAnthropicRequestBody = (body: Partial<OpenAIChatCompletionRequest>) => {
  return {
    model: body.model || DEFAULT_MODELS.CHAT.ANTHROPIC,
    messages: body.messages || [],
    max_tokens: body.max_tokens || 1024,
    temperature: body.temperature || 1.0,
    top_p: body.top_p || 1.0,
    stream: body.stream || false,
    stop_sequences: body.stop || [],
  };
};

export const buildAnthropicChatRequest = async (c: Context): Promise<Response> => {
  const body = (await c.req.json()) as Partial<OpenAIChatCompletionRequest> & { model: keyof typeof MODELS };

  if (!MODELS[body.model]) {
    throw new Error(`Model ${body.model} is not supported.`);
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": c.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(createAnthropicRequestBody(body)),
  });

  if (body.stream) {
    return new Response(createStream(response, ANTHROPIC), {
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
  } else {
    const anthropicResponse = (await response.json()) as AnthropicResponse;

    // Transform Anthropic response to match OpenAI format
    const openAIFormattedResponse = {
      id: anthropicResponse.id,
      object: "chat.completion",
      created: Date.now(),
      model: anthropicResponse.model,
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: anthropicResponse.content[0].text,
          },
          finish_reason: anthropicResponse.stop_reason,
        },
      ],
      usage: anthropicResponse.usage,
    };
    return new Response(JSON.stringify(openAIFormattedResponse), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
