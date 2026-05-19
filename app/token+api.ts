import { StreamClient } from "@stream-io/node-sdk";
import { verifyClerkToken } from "@/lib/clerkAuth";

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization") ?? "";
  const clerkToken = authHeader.replace(/^Bearer\s+/i, "");

  const userId = await verifyClerkToken(clerkToken);
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.STREAM_API_KEY;
  const secret = process.env.STREAM_SECRET_KEY;

  if (!apiKey || !secret) {
    return Response.json({ error: "Stream not configured" }, { status: 500 });
  }

  const client = new StreamClient(apiKey, secret);
  const streamToken = client.generateUserToken({ user_id: userId });

  return Response.json({ token: streamToken });
}
