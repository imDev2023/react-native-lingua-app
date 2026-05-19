import { StreamVideoClient } from "@stream-io/video-react-native-sdk";

const rawApiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;
if (!rawApiKey) {
  throw new Error("EXPO_PUBLIC_STREAM_API_KEY is not set — check your .env.local file");
}
const API_KEY: string = rawApiKey;

export function createStreamClient(
  user: { id: string; name?: string; image?: string },
  token: string
): StreamVideoClient {
  return new StreamVideoClient({ apiKey: API_KEY, user, token });
}
