import { Context } from "hono";
import { DEFAULT_MODELS, PERPLEXITY, TOGETHER } from "../../globals";
import { buildChatRequest } from "../base";
import { ChatCompletionRequest } from "../commonTypes";
import { TogetherChatCompletionRequest } from "./types";

const createRequestBody = (body: Partial<ChatCompletionRequest>): TogetherChatCompletionRequest => {
  return {
    model: body.model || DEFAULT_MODELS.CHAT.PERPLEXITY,
    messages: body.messages || [],
    max_tokens: body.max_tokens || 500,
    temperature: body.temperature || 0,
    top_p: body.top_p || 1.0,
    stream: body.stream || false,
    // Add any Perplexity-specific options here
  };
};

const getHeaders = (apiKey: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
});

export const buildTogetherAIChatRequest = (c: Context): Promise<Response> => {
  return buildChatRequest(c, "https://api.together.ai/chat/completions", TOGETHER, getHeaders, createRequestBody);
};
