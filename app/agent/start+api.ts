import { spawnAgent } from "@/lib/agentRegistry";
import { verifyCallOwner } from "@/lib/streamCallAuth";

export async function POST(request: Request) {
  const { callId, userId } = await request.json();

  if (!callId) {
    return Response.json({ error: "callId is required" }, { status: 400 });
  }

  const auth = await verifyCallOwner(callId, userId);
  if ("error" in auth) return auth.error;

  spawnAgent(callId);

  // Return immediately — the agent warms up and joins in the background.
  // The mobile app shows "AI joining…" while it connects to Stream.
  return Response.json({ sessionId: callId, callId });
}
