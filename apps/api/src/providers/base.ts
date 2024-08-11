import type { Context } from "hono";
import { MODELS } from "@/globals";
import type { ChatCompletionRequest } from "@/providers/commonTypes";
import { createStream } from "@/providers/utils";

export const buildChatRequest = async (
  c: Context,
  apiUrl: string,
  provider: string,
  getHeaders: (apiKey: string) => Record<string, string>,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  createRequestBody: (body: Partial<ChatCompletionRequest>) => any,
): Promise<Response> => {
  const body = (await c.req.json()) as Partial<ChatCompletionRequest> & { model: keyof typeof MODELS };

  if (!MODELS[body.model]) {
    throw new Error(`Model ${body.model} is not supported.`);
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: getHeaders(c.env[`${provider.toUpperCase()}_API_KEY`]),
    body: JSON.stringify(createRequestBody(body)),
  });

  if (body.stream) {
    return new Response(createStream(response, provider), {
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
  }

  return response;
};
