import { createHmac, timingSafeEqual } from "crypto";
import { StreamClient } from "@stream-io/node-sdk";

/**
 * Verifies a Stream user token (HS256 JWT signed with STREAM_SECRET_KEY).
 * Returns the authenticated user_id on success, or null if invalid/expired.
 */
export function verifyStreamToken(token: string, secret: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [header, payload, sig] = parts;

  const expectedBuf = createHmac("sha256", secret)
    .update(`${header}.${payload}`)
    .digest();

  try {
    const sigBuf = Buffer.from(sig, "base64url");
    if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
      return null;
    }
  } catch {
    return null;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      user_id?: string;
      exp?: number;
    };
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) return null;
    return decoded.user_id ?? null;
  } catch {
    return null;
  }
}


type AuthError = { error: Response };
type AuthOk = { ownerId: string };

export async function verifyCallOwner(
  callId: string,
  userId: string | undefined
): Promise<AuthError | AuthOk> {
  if (!userId) {
    return { error: Response.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const apiKey = process.env.STREAM_API_KEY;
  const secret = process.env.STREAM_SECRET_KEY;

  if (!apiKey || !secret) {
    return { error: Response.json({ error: "Stream not configured" }, { status: 500 }) };
  }

  const client = new StreamClient(apiKey, secret);
  const call = client.video.call("audio_room", callId);

  let callResponse;
  try {
    callResponse = await call.get();
  } catch {
    return { error: Response.json({ error: "Forbidden" }, { status: 403 }) };
  }

  if (callResponse.call.created_by.id !== userId) {
    return { error: Response.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { ownerId: userId };
}
