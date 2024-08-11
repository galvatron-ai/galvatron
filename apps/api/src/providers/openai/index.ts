import { Context } from "hono";
import { DEFAULT_MODELS, OPENAI } from "../../globals";
import { OpenAIChatCompletionRequest } from "./types";
import { buildChatRequest } from "../base";
import { ChatCompletionRequest } from "../commonTypes";

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
