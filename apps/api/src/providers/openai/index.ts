import type { Context } from "hono";
import { DEFAULT_MODELS, OPENAI } from "@/globals";
import { buildChatRequest } from "@/providers/base";
import type { ChatCompletionRequest } from "@/providers/commonTypes";
import type { OpenAIChatCompletionRequest } from "./types";

const createRequestBody = (body: Partial<ChatCompletionRequest>): OpenAIChatCompletionRequest => {
  return {
    model: body.model || DEFAULT_MODELS.CHAT.OPENAI,
    messages: body.messages || [],
    max_tokens: body.max_tokens || 500,
    temperature: body.temperature || 0,
    top_p: body.top_p || 1.0,
    n: body.n || 1,
    stream: body.stream || false,
    stop: body.stop || null,
    stream_options: body.stream ? { include_usage: true } : null,
  };
};

const getHeaders = (apiKey: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
});

export const buildOpenAIChatRequest = (c: Context): Promise<Response> => {
  return buildChatRequest(c, "https://api.openai.com/v1/chat/completions", OPENAI, getHeaders, createRequestBody);
};
