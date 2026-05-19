import { useEffect, useRef, useState } from "react";
import { usePostHog } from "posthog-react-native";
import {
  ActivityIndicator,
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  StreamVideo,
  StreamCall,
  callManager,
} from "@stream-io/video-react-native-sdk";
import { getLessonById } from "@/data/lessons";
import { images } from "@/constants/images";
import { useAudioCall, useMicControls, type CallStatus, type AgentStatus } from "@/hooks/useAudioCall";
import { useLanguageStore } from "@/store/languageStore";
import { LiveCaptions } from "@/components/LiveCaptions";

const SESSION_STATS = [
  { label: "Speaking", value: "Excellent", color: "#21C16B" },
  { label: "Pronunciation", value: "Great", color: "#21C16B" },
  { label: "Grammar", value: "Good", color: "#4D88FF" },
];

function extractShortGreeting(greeting: string): string {
  const match = greeting.match(/^.+?[!?.！。？]/u);
  if (match && match[0].length <= 22) return match[0];
  if (match) return match[0].slice(0, 20) + "…";
  return greeting.slice(0, 18) + (greeting.length > 18 ? "…" : "");
}

function AgentStatusBadge({ status }: { status: AgentStatus }) {
  if (status === "idle") return null;
  const config: Record<Exclude<AgentStatus, "idle">, { label: string; color: string }> = {
    connecting: { label: "AI joining…", color: "#FFCB00" },
    connected:  { label: "AI ready",   color: "#21C16B" },
    failed:     { label: "AI offline", color: "#EF4444" },
  };
  const { label, color } = config[status as Exclude<AgentStatus, "idle">];
  return (
    <View style={styles.onlineRow}>
      <View style={[styles.onlineDot, { backgroundColor: color }]} />
      <Text className="font-poppins-regular text-[12px]" style={{ color }}>
        {label}
      </Text>
    </View>
  );
}

function StatusBadge({ status }: { status: CallStatus }) {
  const config: Record<CallStatus, { label: string; color: string }> = {
    idle:       { label: "Ready",       color: "#9CA3AF" },
    connecting: { label: "Connecting…", color: "#FFCB00" },
    joined:     { label: "Live",        color: "#21C16B" },
    ended:      { label: "Ended",       color: "#9CA3AF" },
    error:      { label: "Error",       color: "#EF4444" },
  };
  const { label, color } = config[status];
  return (
    <View style={styles.onlineRow}>
      <View style={[styles.onlineDot, { backgroundColor: color }]} />
      <Text className="font-poppins-regular text-[13px]" style={{ color }}>
        {label}
      </Text>
    </View>
  );
}

// Must render inside <StreamCall> so useCallStateHooks resolves correctly
function PushToTalkButton() {
  const { enableMic, disableMic } = useMicControls();
  const [isListening, setIsListening] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const ringScale = useRef(new Animated.Value(1)).current;
  const ringOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isListening) return;
    ringScale.setValue(1);
    ringOpacity.setValue(0.45);
    const pulse = Animated.loop(
      Animated.parallel([
        Animated.timing(ringScale, { toValue: 1.65, duration: 900, useNativeDriver: true }),
        Animated.timing(ringOpacity, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => {
      pulse.stop();
      ringScale.setValue(1);
      ringOpacity.setValue(0);
    };
  }, [isListening]);

  function handlePressIn() {
    callManager.speaker.setMute(true); // silence the agent immediately
    setIsListening(true);
    enableMic();
    Animated.spring(scale, { toValue: 1.1, useNativeDriver: true, friction: 5 }).start();
  }

  function handlePressOut() {
    disableMic();
    callManager.speaker.setMute(false); // restore agent audio
    setIsListening(false);
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5 }).start();
  }

  return (
    <View style={styles.pttContainer}>
      <View style={styles.pttRingWrapper}>
        <Animated.View
          style={[styles.pttRing, { transform: [{ scale: ringScale }], opacity: ringOpacity }]}
        />
        <Animated.View style={{ transform: [{ scale }] }}>
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[styles.pttButton, isListening && styles.pttButtonActive]}
          >
            <Ionicons
              name={isListening ? "mic" : "mic-outline"}
              size={36}
              color={isListening ? "white" : "#374151"}
            />
          </Pressable>
        </Animated.View>
      </View>
      <Text
        className="font-poppins-semibold text-[14px]"
        style={[styles.pttLabel, isListening && styles.pttLabelActive]}
      >
        {isListening ? "Listening…" : "Hold to speak"}
      </Text>
    </View>
  );
}

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lesson = getLessonById(id);
  const { selectedLanguageId } = useLanguageStore();
  const posthog = usePostHog();

  const { call, client, status, error, agentStatus, startCall, endCall, retryCall } = useAudioCall({
    lessonId: id,
    languageId: selectedLanguageId ?? lesson?.languageId ?? "en",
  });

  const startTimeRef = useRef<number | null>(null);
  const lessonStartedRef = useRef(false);
  const statusRef = useRef(status);
  useEffect(() => { statusRef.current = status; }, [status]);

  useEffect(() => {
    return () => {
      if (lessonStartedRef.current && statusRef.current !== "ended") {
        const elapsed = startTimeRef.current
          ? Math.floor((Date.now() - startTimeRef.current) / 1000)
          : 0;
        posthog.capture("lesson_abandoned", {
          lesson_id: id,
          time_into_lesson_seconds: elapsed,
          last_question_index: 0,
        });
      }
    };
  }, []);

  function handleStartLesson() {
    startTimeRef.current = Date.now();
    lessonStartedRef.current = true;
    posthog.capture("lesson_started", {
      lesson_id: id,
      language: selectedLanguageId ?? lesson?.languageId ?? "en",
      lesson_number: lesson?.order ?? 1,
    });
    startCall();
  }

  const greeting = lesson?.aiTeacher?.greeting ?? "Hello! Let's practice together!";
  const shortGreeting = extractShortGreeting(greeting);

  async function handleEndCall() {
    await endCall();
    router.back();
  }

  const isConnecting = status === "connecting";
  const isJoined = status === "joined";
  const isEnded = status === "ended";
  const isError = status === "error";

  const speechText = isEnded
    ? "Great work today! 🎉"
    : shortGreeting;

  const isIdle = status === "idle";

  const subText = isJoined
    ? "Session is live — speak naturally!"
    : isConnecting
    ? "Starting audio session…"
    : isError
    ? "Could not start session."
    : isIdle
    ? "Tap Start to begin"
    : "That was great! 👋";

  const screen = (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleEndCall}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#001328" />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text className="font-poppins-bold text-[19px] text-text-primary">
            AI Teacher
          </Text>
          <StatusBadge status={status} />
          <AgentStatusBadge status={agentStatus} />
        </View>

        <View style={styles.headerRight}>
          <View style={styles.xpBadge}>
            <Ionicons name="star-outline" size={14} color="#6C4EF5" />
            <Text className="font-poppins-semibold text-[13px] text-lingua-purple">
              {lesson?.xpReward ?? 12} XP
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleEndCall}
            style={styles.endCallBtn}
            activeOpacity={0.8}
          >
            <Ionicons
              name="call"
              size={18}
              color="white"
              style={{ transform: [{ rotate: "135deg" }] }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Teacher Preview Card */}
      <View style={styles.teacherCard}>
        <View style={styles.mascotWrapper}>
          <Image
            source={images.mascotWelcome}
            style={styles.mascotImage}
            resizeMode="contain"
          />
        </View>

        {/* User PiP — green border when live */}
        <View style={[styles.pip, isJoined && styles.pipActive]}>
          <Ionicons name="person" size={30} color="#6C4EF5" />
        </View>

        {/* Connecting overlay */}
        {isConnecting && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#6C4EF5" />
            <Text
              className="font-poppins-semibold text-[15px] text-text-primary"
              style={{ marginTop: 12 }}
            >
              Connecting to lesson…
            </Text>
          </View>
        )}

        {/* Error overlay */}
        {isError && (
          <View style={styles.overlay}>
            <Ionicons name="alert-circle-outline" size={40} color="#EF4444" />
            <Text
              className="font-poppins-semibold text-[15px] text-text-primary"
              style={{ marginTop: 10, textAlign: "center" }}
            >
              {error ?? "Connection failed"}
            </Text>
            <TouchableOpacity style={styles.retryBtn} onPress={retryCall} activeOpacity={0.8}>
              <Text className="font-poppins-bold text-[14px]" style={{ color: "white" }}>
                Retry
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Ended overlay */}
        {isEnded && (
          <View style={styles.overlay}>
            <Ionicons name="checkmark-circle-outline" size={44} color="#21C16B" />
            <Text
              className="font-poppins-bold text-[17px] text-text-primary"
              style={{ marginTop: 10 }}
            >
              Lesson complete!
            </Text>
          </View>
        )}

        {/* Live Captions — shown for both AI teacher and user speech */}
        {isJoined && call && <LiveCaptions />}

        {/* Speech Bubble */}
        <View style={styles.speechBubble}>
          <View style={styles.speechBubbleInner}>
            <View style={{ flex: 1, marginRight: 14 }}>
              <Text className="font-poppins-bold text-[16px] text-text-primary">
                {speechText}
              </Text>
              <Text
                className="font-poppins-regular text-[14px] text-text-secondary"
                style={{ marginTop: 3 }}
              >
                {subText}
              </Text>
            </View>
            <TouchableOpacity style={styles.speakerBtn} activeOpacity={0.7}>
              <Ionicons name="volume-high" size={20} color="#6C4EF5" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controlsArea}>
        {isIdle ? (
          <TouchableOpacity style={styles.startBtn} onPress={handleStartLesson} activeOpacity={0.8}>
            <Ionicons name="play" size={20} color="white" />
            <Text className="font-poppins-bold text-[16px]" style={{ color: "white" }}>
              Start Lesson
            </Text>
          </TouchableOpacity>
        ) : isJoined && call ? (
          <PushToTalkButton />
        ) : null}
      </View>

      {/* Session Stats */}
      <View style={styles.statsRow}>
        {SESSION_STATS.map((stat) => (
          <View key={stat.label} style={styles.statItem}>
            <Text className="font-poppins-regular text-[13px] text-text-secondary">
              {stat.label}
            </Text>
            <Text
              className="font-poppins-bold text-[14px]"
              style={{ color: stat.color }}
            >
              {stat.value}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );

  // Wrap in Stream providers only once client + call are ready
  if (client && call) {
    return (
      <StreamVideo client={client}>
        <StreamCall call={call}>
          {screen}
        </StreamCall>
      </StreamVideo>
    );
  }

  return screen;
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: {
    marginRight: 14,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 2,
  },
  onlineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF0FF",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    gap: 5,
  },
  teacherCard: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#EDE8FF",
    position: "relative",
  },
  mascotWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 130,
  },
  mascotImage: {
    width: "100%",
    height: "100%",
  },
  pip: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 80,
    height: 80,
    borderRadius: 18,
    backgroundColor: "#C8BCFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  pipActive: {
    borderColor: "#21C16B",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 130,
    backgroundColor: "rgba(237, 232, 255, 0.88)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  retryBtn: {
    marginTop: 16,
    backgroundColor: "#6C4EF5",
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 999,
  },
  speechBubble: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: 22,
    padding: 18,
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  speechBubbleInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  speakerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  endCallBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  controlsArea: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 22,
    marginBottom: 8,
  },
  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#6C4EF5",
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 999,
    shadowColor: "#6C4EF5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  pttContainer: {
    alignItems: "center",
  },
  pttRingWrapper: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  pttRing: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#6C4EF5",
  },
  pttButton: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pttButtonActive: {
    backgroundColor: "#6C4EF5",
    shadowColor: "#6C4EF5",
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 10,
  },
  pttLabel: {
    marginTop: 14,
    color: "#9CA3AF",
  },
  pttLabelActive: {
    color: "#6C4EF5",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
    gap: 3,
  },
});
