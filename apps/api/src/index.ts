import { completionsHandler } from "@/handlers/v1/chatCompletionsHandler";
import { embeddingsHandler } from "@/handlers/v1/embeddingsHandler";
import { modelsHandler } from "@/handlers/v1/modelsHandler";
import { createApiKey, deleteApiKey, verifyApiKey } from "@/handlers/v1/apiKeys";
import { authenticationMiddleware } from "@/middlewares/authenticationMiddleware";
import { Hono } from "hono";

const app = new Hono();

// Root route
app.get("/", (c) => {
  return c.json({ message: "Service Running", success: true });
});

// Group all /v1 routes
const v1 = new Hono();

// Apply authentication middleware to all /v1 routes
v1.use("*", authenticationMiddleware);

// Add /v1 routes
v1.post("/chat/completions", completionsHandler);
v1.post("/embeddings", embeddingsHandler);
v1.get("/models", modelsHandler);

// Add API key routes
v1.post("/api-keys", createApiKey);
v1.delete("/api-keys/:apiKey", deleteApiKey);
v1.get("/api-keys/verify", verifyApiKey);

// Mount the v1 routes under /v1
app.route("/v1", v1);

// Error handling
app.onError((err, c) => {
  return c.json({ error: err.message, success: false }, 500);
});

app.notFound((c) => {
  return c.json({ error: "Not Found", success: false }, 404);
});

export default app;
