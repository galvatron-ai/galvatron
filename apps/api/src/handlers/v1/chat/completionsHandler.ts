import { Context } from "hono";
import { buildRequest } from "../../../providers/selectProvider";

export const completionsHandler = async (c: Context) => {
  try {
    const request = await buildRequest(c);
    
    if (!request) {
      return c.json({ error: "Unsupported model or provider" }, 400);
    }

    return request;
  } catch (error) {
    console.error("Chat completion error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};