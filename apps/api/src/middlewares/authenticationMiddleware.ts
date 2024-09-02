import type { Context, Next } from "hono";
import { verify } from '@tsndr/cloudflare-worker-jwt';

export const authenticationMiddleware = async (c: Context, next: Next) => {
  const path = c.req.path;
  const requestHeaders = Object.fromEntries(c.req.raw.headers);

  // Special handling for API key management endpoints
  if (path.startsWith('/v1/api-keys')) {
    const dashboardToken = requestHeaders["x-dashboard-token"];
    if (!dashboardToken) {
      return c.json({ error: "Unauthorized", success: false }, 401);
    }

    try {
      const isValid = await verify(dashboardToken, c.env.DASHBOARD_SECRET);
      if (!isValid) {
        return c.json({ error: "Invalid dashboard token", success: false }, 401);
      }
    } catch (error) {
      console.log(error)
      return c.json({ error: "Invalid dashboard token", success: false }, 401);
    }
  } else {
    // Regular API key authentication for other endpoints
    const apiKey = requestHeaders["x-api-key"];
    if (!apiKey) {
      return c.json({ error: "API key is missing", success: false }, 401);
    }

    // Verify the API key
    const apiKeyData = await c.env.API_KEYS.get(apiKey);
    if (!apiKeyData) {
      return c.json({ error: "Invalid API key", success: false }, 401);
    }
  }

  await next();
};
