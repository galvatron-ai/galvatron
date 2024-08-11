import { DEFAULT_MODELS, OPENAI } from "@/globals";
import { buildChatRequest } from "@/providers/base";
import type { ChatCompletionRequest } from "@/providers/commonTypes";
import type { Context } from "hono";
import type { OpenAIChatCompletionRequest, OpenAIEmbeddingRequest } from "./types";

/**
 * Creates the request body for the OpenAI chat completion API.
 *
 * @param {Partial<ChatCompletionRequest>} body - The partial request body containing optional parameters.
 * @returns {OpenAIChatCompletionRequest} - The complete request body for the OpenAI chat completion API.
 */
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

/**
 * Builds and sends a request to the OpenAI API for generating chat completions.
 *
 * @param {Context} c - The context object containing the request and environment variables.
 * @returns {Promise<Response>} - The response from the OpenAI API.
 */
export const buildOpenAIChatRequest = (c: Context): Promise<Response> => {
  return buildChatRequest(c, "https://api.openai.com/v1/chat/completions", OPENAI, getHeaders, createRequestBody);
};

/**
 * Builds and sends a request to the OpenAI API for generating embeddings.
 *
 * @param {Context} c - The context object containing the request and environment variables.
 * @returns {Promise<Response>} - The response from the OpenAI API.
 */
export const buildOpenAIEmbeddingRequest = async (c: Context): Promise<Response> => {
  const body = (await c.req.json()) as OpenAIEmbeddingRequest;
  const apiKey = c.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response("OpenAI API key not found", { status: 400 });
  }

  const requestBody = {
    model: body.model || "text-embedding-ada-002",
    input: body.input,
    user: body.user,
  };

  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: getHeaders(apiKey),
    body: JSON.stringify(requestBody),
  });

  return response;
};
