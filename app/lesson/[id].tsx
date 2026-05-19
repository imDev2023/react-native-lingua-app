import {
  ActivityIndicator,
  Image,
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
} from "@stream-io/video-react-native-sdk";
import { getLessonById } from "@/data/lessons";
import { images } from "@/constants/images";
import { useAudioCall, useMicControls, type CallStatus, type AgentStatus } from "@/hooks/useAudioCall";
import { useLanguageStore } from "@/store/languageStore";

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
function MicButton() {
  const { isMute, toggleMic } = useMicControls();
  return (
    <View style={styles.controlItem}>
      <TouchableOpacity
        onPress={toggleMic}
        style={[styles.controlBtn, isMute ? styles.controlBtnRed : styles.controlBtnGray]}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isMute ? "mic-off-outline" : "mic-outline"}
          size={24}
          color={isMute ? "white" : "#374151"}
        />
      </TouchableOpacity>
      <Text className="font-poppins-regular text-[12px] text-text-secondary">
        {isMute ? "Muted" : "Mic"}
      </Text>
    </View>
  );
}

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const lesson = getLessonById(id);
  const { selectedLanguageId } = useLanguageStore();

  const { call, client, status, error, agentStatus, startCall, endCall, retryCall } = useAudioCall({
    lessonId: id,
    languageId: selectedLanguageId ?? lesson?.languageId ?? "en",
  });

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
            <Ionicons name="videocam-outline" size={14} color="#6C4EF5" />
            <Text className="font-poppins-semibold text-[13px] text-lingua-purple">
              {lesson?.xpReward ?? 12}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="notifications-outline" size={24} color="#001328" />
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

      {/* Call Controls */}
      <View style={styles.controlsCard}>
        <View style={styles.controlsRow}>
          {/* Camera — always disabled for audio-only */}
          <View style={styles.controlItem}>
            <View style={[styles.controlBtn, styles.controlBtnGray]}>
              <Ionicons name="videocam-off-outline" size={24} color="#9CA3AF" />
            </View>
            <Text className="font-poppins-regular text-[12px] text-[#9CA3AF]">
              Camera
            </Text>
          </View>

          {/* Mic — live mute toggle when joined, static otherwise */}
          {isJoined && call ? (
            <MicButton />
          ) : (
            <View style={styles.controlItem}>
              <View style={[styles.controlBtn, styles.controlBtnGray]}>
                <Ionicons name="mic-outline" size={24} color="#9CA3AF" />
              </View>
              <Text className="font-poppins-regular text-[12px] text-[#9CA3AF]">
                Mic
              </Text>
            </View>
          )}

          {/* Start (idle) / Subtitles (active) */}
          <View style={styles.controlItem}>
            {status === "idle" ? (
              <TouchableOpacity
                style={[styles.controlBtn, styles.controlBtnPurple]}
                onPress={startCall}
                activeOpacity={0.7}
              >
                <Ionicons name="play" size={22} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.controlBtn, styles.controlBtnGray]}
                activeOpacity={0.7}
              >
                <Text className="font-poppins-bold text-[18px] text-[#374151]">
                  Aa
                </Text>
              </TouchableOpacity>
            )}
            <Text className="font-poppins-regular text-[12px] text-text-secondary">
              {status === "idle" ? "Start" : "Subtitles"}
            </Text>
          </View>

          {/* End Call */}
          <View style={styles.controlItem}>
            <TouchableOpacity
              onPress={handleEndCall}
              style={[styles.controlBtn, styles.controlBtnRed]}
              activeOpacity={0.8}
            >
              <Ionicons
                name="call"
                size={24}
                color="white"
                style={{ transform: [{ rotate: "135deg" }] }}
              />
            </TouchableOpacity>
            <Text className="font-poppins-regular text-[12px] text-text-secondary">
              End Call
            </Text>
          </View>
        </View>
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
  controlsCard: {
    marginHorizontal: 16,
    marginBottom: 14,
    backgroundColor: "white",
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  controlItem: {
    alignItems: "center",
    gap: 8,
  },
  controlBtn: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
  },
  controlBtnGray: {
    backgroundColor: "#F3F4F6",
  },
  controlBtnRed: {
    backgroundColor: "#EF4444",
  },
  controlBtnPurple: {
    backgroundColor: "#6C4EF5",
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
