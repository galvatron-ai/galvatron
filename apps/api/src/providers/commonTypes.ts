type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export type ChatCompletionRequest = {
  model: string;
  messages: ChatMessage[];
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string | string[] | null;
  stream_options?: {
    include_usage?: boolean;
  } | null;
};