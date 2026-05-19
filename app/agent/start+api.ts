import { spawnAgent } from "@/lib/agentRegistry";

export async function POST(request: Request) {
  const { callId } = await request.json();

  if (!callId) {
    return Response.json({ error: "callId is required" }, { status: 400 });
  }

  spawnAgent(callId);

  // Return immediately — the agent warms up and joins in the background.
  // The mobile app shows "AI joining…" while it connects to Stream.
  return Response.json({ sessionId: callId, callId });
}
