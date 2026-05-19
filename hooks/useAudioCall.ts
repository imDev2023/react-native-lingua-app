import { useEffect, useRef, useState } from "react";
import {
  Call,
  StreamVideoClient,
  useCallStateHooks,
} from "@stream-io/video-react-native-sdk";
import { useAuth, useUser } from "@clerk/expo";
import { createStreamClient } from "@/lib/stream";

export type CallStatus =
  | "idle"
  | "connecting"
  | "joined"
  | "ended"
  | "error";

export type AgentStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "failed";

interface UseAudioCallOptions {
  lessonId: string;
  languageId: string;
}

export function useAudioCall({ lessonId, languageId }: UseAudioCallOptions) {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [status, setStatus] = useState<CallStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("idle");
  const clientRef = useRef<StreamVideoClient | null>(null);
  const callRef = useRef<Call | null>(null);
  const agentStartedRef = useRef<boolean>(false);
  const callIdRef = useRef<string>(`lesson-${lessonId}`);
  const [call, setCall] = useState<Call | null>(null);

  async function startAgent() {
    setAgentStatus("connecting");
    try {
      const res = await fetch("/agent/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callId: callIdRef.current, userId: user?.id }),
      });
      if (!res.ok) throw new Error(`Agent start failed: ${res.status}`);
      agentStartedRef.current = true;
      setAgentStatus("connected");
    } catch {
      setAgentStatus("failed");
    }
  }

  async function stopAgent() {
    if (!agentStartedRef.current) return;
    agentStartedRef.current = false;
    try {
      await fetch("/agent/stop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callId: callIdRef.current, userId: user?.id }),
      });
    } catch {
      // ignore stop errors
    }
  }

  async function startCall() {
    if (!user) return;
    setStatus("connecting");
    setError(null);

    try {
      // Fetch Stream token — server verifies the Clerk session and mints the token
      const clerkToken = await getToken();
      if (!clerkToken) throw new Error("Not authenticated");
      const tokenRes = await fetch("/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${clerkToken}`,
        },
      });
      if (!tokenRes.ok) throw new Error("Failed to get token");
      const { token } = await tokenRes.json();

      // Create Stream client
      const streamUser = {
        id: user.id,
        name: user.fullName ?? user.id,
        image: user.imageUrl,
      };
      const client = createStreamClient(streamUser, token);
      clientRef.current = client;

      // Create/get the call on the server (packs lesson data + adds agent admin)
      const callRes = await fetch("/call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          callId: callIdRef.current,
          lessonId,
          languageId,
        }),
      });
      if (!callRes.ok) throw new Error("Failed to create call");

      // Create call instance and join
      const streamCall = client.call("audio_room", callIdRef.current);
      callRef.current = streamCall;
      setCall(streamCall);

      await streamCall.join({ create: true });
      setStatus("joined");

      // Start muted so push-to-talk is the default; fail closed if this errors
      try {
        await streamCall.microphone.disable();
      } catch (micErr) {
        // No alternative mute API exists — disable() is the only primitive.
        // Treat as fatal: mic state is unknown, PTT would be unsafe to show.
        console.warn(
          "[useAudioCall] microphone.disable() failed on join:",
          micErr instanceof Error ? micErr.message : micErr
        );
        setError("Could not initialize push-to-talk. Please retry.");
        setStatus("error");
        return;
      }

      // Enable live captions for both user and AI teacher speech
      try { await streamCall.startClosedCaptions({ language: "en" }); } catch {}

      // Start AI teacher in the background — don't block the user's audio session
      startAgent();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not connect";
      setError(message);
      setStatus("error");
    }
  }

  async function endCall() {
    await stopAgent();
    try {
      await callRef.current?.leave();
    } catch {
      // ignore leave errors
    } finally {
      setStatus("ended");
      setAgentStatus("idle");
      setCall(null);
      callRef.current = null;
      await clientRef.current?.disconnectUser();
      clientRef.current = null;
    }
  }

  async function retryCall() {
    await endCall();
    setStatus("idle");
    setError(null);
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopAgent();
      callRef.current?.leave().catch(() => {});
      clientRef.current?.disconnectUser().catch(() => {});
    };
  }, []);

  return {
    call,
    client: clientRef.current,
    status,
    error,
    agentStatus,
    startCall,
    endCall,
    retryCall,
  };
}

// Used inside StreamCall provider to read microphone state
export function useMicControls() {
  const { useMicrophoneState } = useCallStateHooks();
  const { microphone, isMute, optimisticIsMute } = useMicrophoneState();

  async function toggleMic() {
    await microphone.toggle();
  }

  async function enableMic() {
    await microphone.enable();
  }

  async function disableMic() {
    await microphone.disable();
  }

  return { isMute: optimisticIsMute ?? isMute, toggleMic, enableMic, disableMic };
}
