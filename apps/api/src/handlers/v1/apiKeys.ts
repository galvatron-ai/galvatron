import { Context } from 'hono';
import { nanoid } from 'nanoid';

export const createApiKey = async (c: Context) => {
  try {
    const apiKey = `sk-${nanoid(32)}`;
    const userId = c.get('userId');

    if (!userId) {
      return c.json({ error: 'User not authenticated' }, 401);
    }

    // Save the API key in Cloudflare KV
    await c.env.API_KEYS.put(apiKey, JSON.stringify({ userId, createdAt: new Date().toISOString() }));

    return c.json({ apiKey }, 201);
  } catch (error) {
    console.error('Error creating API key:', error);
    return c.json({ error: 'Failed to create API key' }, 500);
  }
};

export const deleteApiKey = async (c: Context) => {
  try {
    const apiKeyToDelete = c.req.param('apiKey');
    const userId = c.get('userId');

    if (!userId) {
      return c.json({ error: 'User not authenticated' }, 401);
    }

    // Retrieve the API key data from Cloudflare KV
    const apiKeyData = await c.env.API_KEYS.get(apiKeyToDelete);

    if (!apiKeyData) {
      return c.json({ error: 'API key not found' }, 404);
    }

    const { userId: apiKeyUserId } = JSON.parse(apiKeyData);

    // Check if the API key belongs to the authenticated user
    if (userId !== apiKeyUserId) {
      return c.json({ error: 'Unauthorized to delete this API key' }, 403);
    }

    // Delete the API key from Cloudflare KV
    await c.env.API_KEYS.delete(apiKeyToDelete);

    return c.json({ message: 'API key deleted successfully' }, 200);
  } catch (error) {
    console.error('Error deleting API key:', error);
    return c.json({ error: 'Failed to delete API key' }, 500);
  }
};

export const verifyApiKey = async (c: Context) => {
  try {
    const apiKey = c.req.header('X-API-Key');

    if (!apiKey) {
      return c.json({ error: 'API key is missing' }, 401);
    }

    // Retrieve the API key data from Cloudflare KV
    const apiKeyData = await c.env.API_KEYS.get(apiKey);

    if (!apiKeyData) {
      return c.json({ error: 'Invalid API key' }, 401);
    }

    const { userId, createdAt } = JSON.parse(apiKeyData);

    return c.json({
      valid: true,
      userId,
      createdAt
    }, 200);

  } catch (error) {
    console.error('Error verifying API key:', error);
    return c.json({ error: 'Failed to verify API key' }, 500);
  }
};
