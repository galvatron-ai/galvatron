import type { ChatCompletionRequest } from "@/providers/commonTypes";

export interface OpenAIChatCompletionRequest extends ChatCompletionRequest {
  n?: number;
  stop?: string | string[] | null;
  stream_options?: { include_usage: boolean } | null;
}

export type OpenAIChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type OpenAIChatCompletionResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: OpenAIChatMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};
