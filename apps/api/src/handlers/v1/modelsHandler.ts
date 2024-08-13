import { EMBEDDING_MODELS, IMAGE_MODELS, MODELS } from "@/globals";
import { PROVIDERS } from "@/globals";
import type { Context } from "hono";

export const modelsHandler = async (c: Context) => {
  const availableProviders = getAvailableProviders(c);

  const languageModels = filterModelsByAvailableProviders(MODELS, availableProviders);
  const embeddingModels = filterModelsByAvailableProviders(EMBEDDING_MODELS, availableProviders);
  const imageModels = filterModelsByAvailableProviders(IMAGE_MODELS, availableProviders);

  return c.json({
    languageModels,
    embeddingModels,
    imageModels,
  });
};

function getAvailableProviders(c: Context): string[] {
  return PROVIDERS.filter((provider) => {
    const envVar = `${provider.toUpperCase()}_API_KEY`;
    return c.env[envVar] !== undefined;
  });
}

function filterModelsByAvailableProviders(
  modelObject: Record<string, { provider: string; depricated: boolean; fallback: string | null }>,
  availableProviders: string[],
): string[] {
  return Object.entries(modelObject)
    .filter(([_, { provider }]) => availableProviders.includes(provider))
    .map(([modelName, _]) => modelName);
}
