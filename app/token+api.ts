import { StreamClient } from "@stream-io/node-sdk";

export async function POST(request: Request) {
  const { userId } = await request.json();

  if (!userId) {
    return Response.json({ error: "userId is required" }, { status: 400 });
  }

  const apiKey = process.env.STREAM_API_KEY;
  const secret = process.env.STREAM_SECRET_KEY;

  if (!apiKey || !secret) {
    return Response.json({ error: "Stream not configured" }, { status: 500 });
  }

  const client = new StreamClient(apiKey, secret);
  const token = client.generateUserToken({ user_id: userId });

  return Response.json({ token });
}
