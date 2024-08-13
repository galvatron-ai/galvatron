import { EMBEDDING_MODELS, OPENAI } from "@/globals";
import { buildOpenAIEmbeddingRequest } from "@/providers/openai";
import type { Context } from "hono";

/**
 * Handler for processing embedding requests.
 *
 * This function handles incoming requests to generate embeddings using specified models.
 * It validates the model provided in the request body and delegates the request to the
 * appropriate provider's embedding request builder.
 *
 * @param {Context} c - The context object containing the request and response.
 * @returns {Promise<Response>} - The response from the embedding request builder.
 * @throws {Error} - Throws an error if the model or provider is unsupported.
 */
export const embeddingsHandler = async (c: Context) => {
  const validModels = EMBEDDING_MODELS;
  const body = (await c.req.json()) as { model: keyof typeof validModels };
  const config: (typeof validModels)[keyof typeof validModels] = validModels[body.model];

  if (config.provider === OPENAI) {
    return buildOpenAIEmbeddingRequest(c);
  }

  throw new Error(`Unsupported model or provider: ${body.model}`);
};
