import { StreamVideoClient } from "@stream-io/video-react-native-sdk";

const API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY!;

export function createStreamClient(
  user: { id: string; name?: string; image?: string },
  token: string
): StreamVideoClient {
  return new StreamVideoClient({ apiKey: API_KEY, user, token });
}
