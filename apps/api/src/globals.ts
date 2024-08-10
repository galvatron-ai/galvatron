export const OPENAI: string = "openai";
export const COHERE: string = "cohere";
export const ANTHROPIC: string = "anthropic";
export const ANYSCALE: string = "anyscale";
export const GOOGLE: string = "google";
export const TOGETHER: string = "together";
export const PERPLEXITY: string = "perplexity";
export const MISTRAL: string = "mistral";
export const GROQ: string = "groq";

export const DEFAULT_MODELS = {
  CHAT: {
    OPENAI: "gpt-3.5-turbo",
    PERPLEXITY: "mistral-7b-instruct",
    MISTRAL: "mistral-tiny",
    ANTHROPIC: "claude-3-5-sonnet-20240620",
    GOOGLE: "gemini-1.5-flash",
  }
}

export const PROVIDERS = [
    ANTHROPIC,
    ANYSCALE,
    COHERE,
    GOOGLE,
    MISTRAL,
    OPENAI,
    PERPLEXITY,
    TOGETHER,
    GROQ,
  ];

export const MODELS = {
    // OpenAI
    "gpt-4o": { provider: OPENAI, depricated: false, fallback: null },
    "gpt-4o-mini": { provider: OPENAI, depricated: false, fallback: null },
    "gpt-4": { provider: OPENAI, depricated: false, fallback: null },
    "gpt-4-tubo": { provider: OPENAI, depricated: false, fallback: null },
  
    // Anthropic
    "claude-3-5-sonnet-20240620": {
      provider: ANTHROPIC,
      depricated: false,
      fallback: null,
    },
    "claude-3-opus-20240229": {
      provider: ANTHROPIC,
      depricated: false,
      fallback: null,
    },
    "claude-3-sonnet-20240229": {
      provider: ANTHROPIC,
      depricated: false,
      fallback: null,
    },
    "claude-3-haiku-20240307": {
      provider: ANTHROPIC,
      depricated: false,
      fallback: null,
    },
  
    // Mistral AI
    "mistral-large-latest": {
      provider: MISTRAL,
      depricated: false,
      fallback: null,
    },
    "open-mistral-nemo": {
      provider: MISTRAL,
      depricated: false,
      fallback: null,
    },
    "codestral-latest": {
      provider: MISTRAL,
      depricated: false,
      fallback: null,
    },
    "open-mistral-7b": {
      provider: MISTRAL,
      depricated: false,
      fallback: null,
    },
    "open-mixtral-8x7b": {
      provider: MISTRAL,
      depricated: false,
      fallback: null,
    },
    "open-mixtral-8x22b": {
      provider: MISTRAL,
      depricated: false,
      fallback: null,
    },
  
    // Perplexity AI
    "llama-3.1-sonar-small-128k-online": {
      provider: PERPLEXITY,
      depricated: false,
      fallback: null,
    },
  
    "llama-3.1-sonar-small-128k-chat": {
      provider: PERPLEXITY,
      depricated: false,
      fallback: null,
    },
  
    "llama-3.1-sonar-large-128k-online": {
      provider: PERPLEXITY,
      depricated: false,
      fallback: null,
    },
  
    "llama-3.1-sonar-large-128k-chat": {
      provider: PERPLEXITY,
      depricated: false,
      fallback: null,
    },
  
    "llama-3.1-8b-instruct": {
      provider: PERPLEXITY,
      depricated: false,
      fallback: null,
    },
  
    "llama-3.1-70b-instruct": {
      provider: PERPLEXITY,
      depricated: false,
      fallback: null,
    },
  
    // Together AI
    "Qwen/Qwen1.5-0.5B-Chat": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "Qwen/Qwen1.5-1.8B-Chat": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "Qwen/Qwen1.5-4B-Chat": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "Qwen/Qwen1.5-14B-Chat": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "Qwen/Qwen1.5-32B-Chat": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "Qwen/Qwen1.5-72B-Chat": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "Qwen/Qwen1.5-110B-Chat": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "Qwen/Qwen2-72B-Instruct": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "meta-llama/Meta-Llama-3-8B-Instruct-Turbo": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "meta-llama/Meta-Llama-3-70B-Instruct-Turbo": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "meta-llama/Meta-Llama-3-8B-Instruct-Lite": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "meta-llama/Meta-Llama-3-70B-Instruct-Lite": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    //  Google
    "gemini-1.5-flash": {
      provider: GOOGLE,
      depricated: false,
      fallback: null,
    },
  
    "gemini-1.5-pro": {
      provider: GOOGLE,
      depricated: false,
      fallback: null,
    },
  
    "gemini-1.5-pro-exp-0801": {
      provider: GOOGLE,
      depricated: false,
      fallback: null,
    },
  
    // GROQ
    "llama-3.1-70b-versatile": {
      provider: GROQ,
      depricated: false,
      fallback: null,
    },
  
    "llama-3.1-8b-instant": {
      provider: GROQ,
      depricated: false,
      fallback: null,
    },
  
    "llama3-groq-70b-8192-tool-use-preview": {
      provider: GROQ,
      depricated: false,
      fallback: null,
    },
  
    "llama3-groq-8b-8192-tool-use-preview": {
      provider: GROQ,
      depricated: false,
      fallback: null,
    },
  } as const;
  
  export const EMBEDDING_MODELS = {
    // OpenAI
    "text-embedding-ada-002": {
      provider: OPENAI,
      depricated: false,
      fallback: null,
    },
  
    "text-embedding-3-small": {
      provider: OPENAI,
      depricated: false,
      fallback: null,
    },
  
    "text-embedding-3-large": {
      provider: OPENAI,
      depricated: false,
      fallback: null,
    },
  
    // Together AI
    "bert-base-uncased": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "sentence-transformers/msmarco-bert-base-dot-v5": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "togethercomputer/m2-bert-80M-2k-retrieval": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "togethercomputer/m2-bert-80M-8k-retrieval": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    "togethercomputer/m2-bert-80M-32k-retrieval": {
      provider: TOGETHER,
      depricated: false,
      fallback: null,
    },
  
    // Google
    "text-embedding-004": {
      provider: GOOGLE,
      depricated: false,
      fallback: null,
    },
  } as const;
  
  export const IMAGE_MODELS = {
    // OpenAI
    "dall-e-3": {
      provider: OPENAI,
      depricated: false,
      fallback: null,
    },
  } as const;