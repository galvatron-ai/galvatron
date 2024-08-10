import { Context } from "hono";
import { DEFAULT_MODELS, MODELS, OPEN_AI } from "../../globals";
import { OpenAIChatCompletionRequest } from '../../types/openai';
import { createStream } from '../utils';

const createRequestBody = (body: Partial<OpenAIChatCompletionRequest>): OpenAIChatCompletionRequest => {
  return {
    model: body.model || DEFAULT_MODELS.CHAT.OPEN_AI,
    messages: body.messages || [],
    max_tokens: body.max_tokens || 500,
    temperature: body.temperature || 0,
    top_p: body.top_p || 1.0,
    n: body.n || 1,
    stream: body.stream || false,
    stop: body.stop || null,
    stream_options: body.stream ? { include_usage: true } : null,
  };
}

/**
 * Builds a request object for the OpenAI Chat API.
 * 
 * @param {Context} c - The context object containing the request and environment.
 * @returns {Promise<object>} - The request object to be sent to the OpenAI Chat API.
 * @throws {Error} - Throws an error if the specified model is not supported.
 */
export const buildOpenAIChatRequest = async (c: Context): Promise<Response> => {
  const body = await c.req.json() as Partial<OpenAIChatCompletionRequest> & { model: keyof typeof MODELS }

  if (!MODELS[body.model]) {
    throw new Error(`Model ${body.model} is not supported.`);
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${c.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify(createRequestBody(body))
  });

  if (body.stream) {
    return new Response(createStream(response, OPEN_AI), {
      headers: {
        'Content-Type': 'text/event-stream'
      }
    });
  } else {
    return response;
  }
}