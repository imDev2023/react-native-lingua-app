import { createPublicKey } from "crypto";
import { verify } from "jsonwebtoken";

type JwkKey = { kid?: string; kty?: string; n?: string; e?: string; use?: string; alg?: string };
type JwksResponse = { keys: JwkKey[] };

let cachedJwks: JwksResponse | null = null;
let jwksCachedAt = 0;
const CACHE_TTL_MS = 60 * 60 * 1000;

function getJwksUrl(): string | null {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  // Publishable key format: pk_[test|live]_<base64(hostname$)>
  const base64Part = publishableKey.replace(/^pk_(test|live)_/, "");
  if (!base64Part) return null;
  try {
    const hostname = Buffer.from(base64Part, "base64").toString("utf8").replace(/\$$/, "");
    return `https://${hostname}/.well-known/jwks.json`;
  } catch {
    return null;
  }
}

async function getJwks(): Promise<JwksResponse | null> {
  if (cachedJwks && Date.now() - jwksCachedAt < CACHE_TTL_MS) return cachedJwks;
  const url = getJwksUrl();
  if (!url) return null;
  const res = await fetch(url);
  if (!res.ok) return null;
  cachedJwks = (await res.json()) as JwksResponse;
  jwksCachedAt = Date.now();
  return cachedJwks;
}

/**
 * Verifies a Clerk session token (RS256 JWT).
 * Returns the authenticated Clerk user id (sub claim) on success, or null.
 */
export async function verifyClerkToken(token: string): Promise<string | null> {
  try {
    const [rawHeader] = token.split(".");
    const header = JSON.parse(Buffer.from(rawHeader, "base64url").toString()) as { kid?: string };

    const jwks = await getJwks();
    if (!jwks) return null;

    const jwk = jwks.keys.find((k) => k.kid === header.kid);
    if (!jwk) return null;

    const publicKey = createPublicKey(
      { key: jwk, format: "jwk" } as Parameters<typeof createPublicKey>[0]
    );
    const decoded = verify(token, publicKey, { algorithms: ["RS256"] });

    if (typeof decoded === "string" || !decoded.sub) return null;
    return decoded.sub;
  } catch {
    return null;
  }
}
