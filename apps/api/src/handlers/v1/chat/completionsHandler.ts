import { Context } from "hono";
import { ANTHROPIC, EMBEDDING_MODELS, GOOGLE, IMAGE_MODELS, MISTRAL, MODELS, OPENAI, PERPLEXITY, TOGETHER } from "../../../globals";
import { buildAnthropicChatRequest } from "../../../providers/anthropic";
import { buildGeminiChatRequest } from "../../../providers/gemini";
import { buildMistralChatRequest } from "../../../providers/mistral";
import { buildOpenAIChatRequest } from "../../../providers/openai";
import { buildPerplexityChatRequest } from "../../../providers/perplexity";
import { buildTogetherAIChatRequest } from "../../../providers/togetherAI";

const buildRequest = async (c: Context) => {
  const validModels = {...MODELS, ...EMBEDDING_MODELS, ...IMAGE_MODELS}
  const body = await c.req.json() as { model: keyof typeof validModels }
  const config: any = validModels[body.model]

  if (!config) {
    throw new Error(`Model ${body.model} not found`)
  }

  if (config.provider === OPENAI) {
    return buildOpenAIChatRequest(c)
  }

  if (config.provider === ANTHROPIC) {
    return buildAnthropicChatRequest(c)
  }

  if (config.provider === GOOGLE) {
    return buildGeminiChatRequest(c)
  }

  if (config.provider === PERPLEXITY) {
    return buildPerplexityChatRequest(c)
  }

  if (config.provider === MISTRAL) {
    return buildMistralChatRequest(c)
  }

  if (config.provider === TOGETHER) {
    return buildTogetherAIChatRequest(c)
  }

  throw new Error(`Unsupported model or provider: ${body.model}`)
}

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