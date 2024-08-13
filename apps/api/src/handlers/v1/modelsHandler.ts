import type { ModelConfig } from "@/globals";
import { EMBEDDING_MODELS, IMAGE_MODELS, MODELS, PROVIDERS } from "@/globals";
import type { Context } from "hono";

/**
 * Handler for retrieving available models.
 *
 * This function handles incoming requests to retrieve available models grouped by their providers.
 * It first determines the available providers based on environment variables, then groups the models
 * by their respective providers for language, embedding, and image models.
 *
 * @param {Context} c - The context object containing the request and response.
 * @returns {Promise<Response>} - The response containing the grouped models.
 */
export const modelsHandler = async (c: Context) => {
  const availableProviders = getAvailableProviders(c);

  const languageModels = groupModelsByProvider(MODELS, availableProviders);
  const embeddingModels = groupModelsByProvider(EMBEDDING_MODELS, availableProviders);
  const imageModels = groupModelsByProvider(IMAGE_MODELS, availableProviders);

  return c.json({
    languageModels,
    embeddingModels,
    imageModels,
  });
};

/**
 * Retrieves the list of available providers based on environment variables.
 *
 * This function filters the list of providers and returns only those for which
 * the corresponding API key environment variable is defined.
 *
 * @param {Context} c - The context object containing the environment variables.
 * @returns {string[]} - An array of available provider names.
 */
function getAvailableProviders(c: Context): string[] {
  return PROVIDERS.filter((provider) => {
    const envVar = `${provider.toUpperCase()}_API_KEY`;
    return c.env[envVar] !== undefined;
  });
}

/**
 * Groups models by their provider.
 *
 * This function takes a model configuration object and a list of available providers,
 * and returns an object where the keys are provider names and the values are arrays
 * of model names associated with those providers.
 *
 * @param {ModelConfig} modelObject - The object containing model configurations.
 * @param {string[]} availableProviders - The list of providers that are available.
 * @returns {Record<string, string[]>} - An object mapping providers to their respective models.
 */
function groupModelsByProvider(modelObject: ModelConfig, availableProviders: string[]): Record<string, string[]> {
  return Object.entries(modelObject).reduce(
    (acc, [modelName, { provider }]) => {
      if (availableProviders.includes(provider)) {
        if (!acc[provider]) {
          acc[provider] = [];
        }
        acc[provider].push(modelName);
      }
      return acc;
    },
    {} as Record<string, string[]>,
  );
}
