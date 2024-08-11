import { Context } from "hono";
import { DEFAULT_MODELS, MISTRAL } from "../../globals";
import { MistralChatCompletionRequest } from "./types";
import { buildChatRequest } from "../base";

const createRequestBody = (body: Partial<MistralChatCompletionRequest>): MistralChatCompletionRequest => {
  return {
    model: body.model || DEFAULT_MODELS.CHAT.MISTRAL,
    messages: body.messages || [],
    max_tokens: body.max_tokens || 500,
    temperature: body.temperature || 0,
    top_p: body.top_p || 1.0,
    stream: body.stream || false,
    // Add any Mistral-specific options here
  };
};

const getHeaders = (apiKey: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
});

export const buildMistralChatRequest = (c: Context): Promise<Response> => {
  return buildChatRequest(c, "https://api.mistral.ai/v1/chat/completions", MISTRAL, getHeaders, createRequestBody);
};
