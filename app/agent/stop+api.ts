import { killAgent } from "@/lib/agentRegistry";

export async function POST(request: Request) {
  const { callId } = await request.json();

  if (!callId) {
    return Response.json({ error: "callId is required" }, { status: 400 });
  }

  killAgent(callId);

  return Response.json({ ok: true });
}
