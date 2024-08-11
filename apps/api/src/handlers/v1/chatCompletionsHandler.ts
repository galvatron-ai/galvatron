import type { Context } from "hono";
import {
  ANTHROPIC,
  EMBEDDING_MODELS,
  GOOGLE,
  IMAGE_MODELS,
  MISTRAL,
  MODELS,
  OPENAI,
  PERPLEXITY,
  TOGETHER,
} from "@/globals";
import { buildAnthropicChatRequest } from "@/providers/anthropic";
import { buildGeminiChatRequest } from "@/providers/gemini";
import { buildMistralChatRequest } from "@/providers/mistral";
import { buildOpenAIChatRequest } from "@/providers/openai";
import { buildPerplexityChatRequest } from "@/providers/perplexity";
import { buildTogetherAIChatRequest } from "@/providers/togetherAI";

const buildRequest = async (c: Context) => {
  const validModels = MODELS;
  const body = (await c.req.json()) as { model: keyof typeof validModels };
  const config: (typeof validModels)[keyof typeof validModels] = validModels[body.model];

  if (!config) {
    throw new Error(`Model ${body.model} not found`);
  }

  if (config.provider === OPENAI && c.env.OPENAI_API_KEY) {
    return buildOpenAIChatRequest(c);
  }

  if (config.provider === ANTHROPIC && c.env.ANTHROPIC_API_KEY) {
    return buildAnthropicChatRequest(c);
  }

  if (config.provider === GOOGLE && c.env.GOOGLE_API_KEY) {
    return buildGeminiChatRequest(c);
  }

  if (config.provider === PERPLEXITY && c.env.PERPLEXITY_API_KEY) {
    return buildPerplexityChatRequest(c);
  }

  if (config.provider === MISTRAL && c.env.MISTRAL_API_KEY) {
    return buildMistralChatRequest(c);
  }

  if (config.provider === TOGETHER && c.env.TOGETHER_API_KEY) {
    return buildTogetherAIChatRequest(c);
  }

  throw new Error(`Unsupported model or provider: ${body.model}`);
};

export const completionsHandler = async (c: Context) => {
  try {
    const request = await buildRequest(c);

    if (!request) {
      return c.json({ error: "Unsupported model or provider" }, 400);
    }

    return request;
  } catch (error) {
    console.error("Chat completion error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};
