import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Lesson } from "@/types/learning";

export type LessonStatus = "completed" | "inProgress" | "notStarted";

interface LessonCardProps {
  lesson: Lesson;
  lessonNumber: number;
  status: LessonStatus;
  onPress: () => void;
}

const STATUS_CONFIG = {
  completed: {
    circleBg: "#21C16B",
    icon: "checkmark" as const,
    iconColor: "#FFFFFF",
    iconSize: 18,
  },
  inProgress: {
    circleBg: "#6C4EF5",
    icon: "play" as const,
    iconColor: "#FFFFFF",
    iconSize: 16,
  },
  notStarted: {
    circleBg: "#F3F4F6",
    icon: "lock-closed" as const,
    iconColor: "#9CA3AF",
    iconSize: 16,
  },
};

export default function LessonCard({ lesson, lessonNumber, status, onPress }: LessonCardProps) {
  const { circleBg, icon, iconColor, iconSize } = STATUS_CONFIG[status];
  const imageUri = `https://picsum.photos/seed/${lesson.id}/80/80`;
  const isInProgress = status === "inProgress";

  return (
    <TouchableOpacity
      style={[styles.card, isInProgress && styles.cardActive]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Status circle */}
      <View style={[styles.statusCircle, { backgroundColor: circleBg }]}>
        <Ionicons name={icon} size={iconSize} color={iconColor} />
      </View>

      {/* Lesson info */}
      <View className="flex-1 mx-3">
        <Text className="font-poppins-regular text-[11px] text-text-secondary mb-0.5">
          Lesson {lessonNumber}
        </Text>
        <Text
          className="font-poppins-semibold text-[15px] text-text-primary"
          numberOfLines={1}
        >
          {lesson.title}
        </Text>

        {isInProgress ? (
          <View className="flex-row items-center mt-1.5">
            <View className="bg-[#EEF0FF] rounded-full px-2.5 py-0.5">
              <Text className="font-poppins-medium text-[11px] text-lingua-purple">
                In progress
              </Text>
            </View>
          </View>
        ) : (
          <Text className="font-poppins-regular text-[12px] text-text-secondary mt-0.5">
            {lesson.activities.length} activities · {lesson.xpReward} XP
          </Text>
        )}
      </View>

      {/* Thumbnail */}
      <Image
        source={{ uri: imageUri }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardActive: {
    borderColor: "#6C4EF5",
    shadowColor: "#6C4EF5",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  statusCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
    flexShrink: 0,
  },
});
