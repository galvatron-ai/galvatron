import type { Context, Next } from "hono";

export const authenticationMiddleware = async (c: Context, next: Next) => {
  const requestHeaders = Object.fromEntries(c.req.raw.headers);
  const apiKey = requestHeaders["x-api-key"];
  const accessToken = c.env.accessToken;
  const isAuthenticated = apiKey === accessToken;

  if (isAuthenticated) {
    return new Response(JSON.stringify({ error: "Unauthorized", success: false }), { status: 401 });
  }

  await next();
};
