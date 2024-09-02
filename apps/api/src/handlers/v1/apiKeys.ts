import type { Context } from 'hono';
import { nanoid } from 'nanoid';
import { sign, verify } from '@tsndr/cloudflare-worker-jwt';


const verifyDashboardRequest = async (c: Context) => {
  const token = c.req.header('X-Dashboard-Token');
  if (!token) return false;

  try {
    const isValid = await verify(token, c.env.DASHBOARD_SECRET);
    return isValid;
  } catch {
    return false;
  }
};

/**
 * Handler to get all API keys.
 * @param {Context} c - The context object provided by Hono.
 * @returns {Promise<Response>} - A JSON response containing the list of API keys or an error message.
 */
export const getApiKeys = async (c: Context): Promise<Response> => {
  if (!await verifyDashboardRequest(c)) {
    return c.json({ error: 'Unauthorized' }, 403);
  }

  const { keys: apiKeys } = await c.env.API_KEYS.list();
  return c.json({ apiKeys }, 200);
};

/**
 * Handler to create a new API key.
 * @param {Context} c - The context object provided by Hono.
 * @returns {Promise<Response>} - A JSON response containing the new API key or an error message.
 */
export const createApiKey = async (c: Context): Promise<Response> => {
  if (!await verifyDashboardRequest(c)) {
    return c.json({ error: 'Unauthorized' }, 403);
  }

  try {
    const apiKey = `sk-${nanoid(32)}`;
    const { userId } = await c.req.json();

    await c.env.API_KEYS.put(apiKey, JSON.stringify({ userId, createdAt: new Date().toISOString() }));

    return c.json({ apiKey }, 201);
  } catch (error) {
    console.error('Error creating API key:', error);
    return c.json({ error: 'Failed to create API key' }, 500);
  }
};

/**
 * Handler to delete an API key.
 * @param {Context} c - The context object provided by Hono.
 * @returns {Promise<Response>} - A JSON response indicating the result of the deletion operation.
 */
export const deleteApiKey = async (c: Context): Promise<Response> => {
  if (!await verifyDashboardRequest(c)) {
    return c.json({ error: 'Unauthorized' }, 403);
  }

  try {
    const apiKeyToDelete = c.req.param('apiKey');
    await c.env.API_KEYS.delete(apiKeyToDelete);
    return c.json({ message: 'API key deleted successfully' }, 200);
  } catch (error) {
    console.error('Error deleting API key:', error);
    return c.json({ error: 'Failed to delete API key' }, 500);
  }
};

/**
 * Handler to verify an API key.
 * @param {Context} c - The context object provided by Hono.
 * @returns {Promise<Response>} - A JSON response indicating the validity of the API key.
 */
export const verifyApiKey = async (c: Context): Promise<Response> => {
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