import { Context } from "hono";
import { DEFAULT_MODELS, PERPLEXITY } from "../../globals";
import { PerplexityChatCompletionRequest } from './types';
import { buildChatRequest } from '../base';

const createRequestBody = (body: Partial<PerplexityChatCompletionRequest>): PerplexityChatCompletionRequest => {
  return {
    model: body.model || DEFAULT_MODELS.CHAT.PERPLEXITY,
    messages: body.messages || [],
    max_tokens: body.max_tokens || 500,
    temperature: body.temperature || 0,
    top_p: body.top_p || 1.0,
    stream: body.stream || false,
    // Add any Perplexity-specific options here
  };
}

const getHeaders = (apiKey: string) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`
});

export const buildPerplexityChatRequest = (c: Context): Promise<Response> => {
  return buildChatRequest(
    c,
    'https://api.perplexity.ai/chat/completions',
    PERPLEXITY,
    getHeaders,
    createRequestBody
  );
}