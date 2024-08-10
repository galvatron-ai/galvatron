import { Context } from "hono"
import { ANTHROPIC, EMBEDDING_MODELS, GOOGLE, IMAGE_MODELS, MODELS, OPEN_AI } from "../globals"
import { buildAnthropicChatRequest } from "./anthropic"
import { buildGeminiChatRequest } from "./gemini"
import { buildOpenAIChatRequest } from "./openai"

export const buildRequest = async (c: Context) => {
  const validModels = {...MODELS, ...EMBEDDING_MODELS, ...IMAGE_MODELS}
  const body = await c.req.json() as { model: keyof typeof validModels }
  const config: any = validModels[body.model]

  if (!config) {
    throw new Error(`Model ${body.model} not found`)
  }

  if (config.provider === OPEN_AI) {
    return buildOpenAIChatRequest(c)
  }

  if (config.provider === ANTHROPIC) {
    return buildAnthropicChatRequest(c)
  }

  if (config.provider === GOOGLE) {
    return buildGeminiChatRequest(c)
  }

  throw new Error(`Unsupported model or provider: ${body.model}`)
}