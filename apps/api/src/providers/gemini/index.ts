import { Context } from "hono";
import { DEFAULT_MODELS, MODELS, GOOGLE } from "../../globals";
import { OpenAIChatCompletionRequest } from "../openai/types";
import { createStream } from "../utils";

const createGeminiRequestBody = (body: Partial<OpenAIChatCompletionRequest>) => {
  return {
    contents:
      body.messages?.map((message) => ({
        role: message.role === "assistant" ? "model" : message.role,
        parts: [{ text: message.content }],
      })) || [],
    generationConfig: {
      temperature: body.temperature || 1.0,
      topK: 64,
      topP: body.top_p || 0.95,
      maxOutputTokens: body.max_tokens || 8192,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_NONE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_NONE",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_NONE",
      },
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_NONE",
      },
    ],
  };
};

export const buildGeminiChatRequest = async (c: Context): Promise<Response> => {
  const body = (await c.req.json()) as Partial<OpenAIChatCompletionRequest> & { model: keyof typeof MODELS };

  if (!MODELS[body.model]) {
    throw new Error(`Model ${body.model} is not supported.`);
  }

  const apiKey = c.env.GEMINI_API_KEY;
  const model = body.model || DEFAULT_MODELS.CHAT.GOOGLE;
  const requestType = body.stream ? "streamGenerateContent" : "generateContent";
  let url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:${requestType}?key=${apiKey}`;
  if (body.stream) url += "&alt=sse";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createGeminiRequestBody(body)),
  });

  if (body.stream) {
    return new Response(createStream(response, GOOGLE), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } else {
    const geminiResponse = await response.json();

    // Add type assertion here
    const typedGeminiResponse = geminiResponse as {
      candidates: Array<{
        content: { parts: Array<{ text: string }> };
        finishReason: string;
        tokenCount?: number;
      }>;
      promptFeedback?: { tokenCount?: number };
    };

    // Transform Gemini response to match OpenAI format
    const openAIFormattedResponse = {
      id: `gemini-${Date.now()}`,
      object: "chat.completion",
      created: Date.now(),
      model: model,
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: typedGeminiResponse.candidates[0].content.parts[0].text,
          },
          finish_reason: typedGeminiResponse.candidates[0].finishReason,
        },
      ],
      usage: {
        prompt_tokens: typedGeminiResponse.promptFeedback?.tokenCount || 0,
        completion_tokens: typedGeminiResponse.candidates[0]?.tokenCount || 0,
        total_tokens:
          (typedGeminiResponse.promptFeedback?.tokenCount || 0) + (typedGeminiResponse.candidates[0]?.tokenCount || 0),
      },
    };
    return new Response(JSON.stringify(openAIFormattedResponse), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
