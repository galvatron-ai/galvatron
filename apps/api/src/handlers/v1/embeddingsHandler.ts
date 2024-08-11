import { EMBEDDING_MODELS, OPENAI } from "@/globals";
import { buildOpenAIEmbeddingRequest } from "@/providers/openai";
import type { Context } from "hono";

export const embeddingsHandler = async (c: Context) => {
  const validModels = EMBEDDING_MODELS;
  const body = (await c.req.json()) as { model: keyof typeof validModels };
  const config: (typeof validModels)[keyof typeof validModels] = validModels[body.model];

  if (config.provider === OPENAI) {
    return buildOpenAIEmbeddingRequest(c);
  }

  throw new Error(`Unsupported model or provider: ${body.model}`);
};
