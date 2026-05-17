import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Redirect, useRouter } from "expo-router";
import { useLanguageStore } from "@/store/languageStore";
import { useProgressStore } from "@/store/progressStore";
import { getLanguageById } from "@/data/languages";
import { getUnitsByLanguage } from "@/data/units";
import { getLessonsByUnit } from "@/data/lessons";
import { images } from "@/constants/images";
import LessonCard from "@/components/LessonCard";
import type { LanguageCode, Lesson } from "@/types/learning";
import type { LessonStatus } from "@/components/LessonCard";

type ActiveTab = "lessons" | "practice";

export default function LearnScreen() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("lessons");
  const { selectedLanguageId, _hasHydrated } = useLanguageStore();
  const { completedLessonIds } = useProgressStore();
  const router = useRouter();

  if (!_hasHydrated) return null;
  if (!selectedLanguageId) return <Redirect href="/language-selection" />;

  const langCode = selectedLanguageId as LanguageCode;
  const language = getLanguageById(langCode);
  const units = getUnitsByLanguage(langCode);

  const allLessons: Lesson[] = units.flatMap((unit) => getLessonsByUnit(unit.id));

  const inProgressLesson = allLessons.find((l) => !completedLessonIds.includes(l.id));

  const currentUnit =
    (inProgressLesson ? units.find((u) => u.id === inProgressLesson.unitId) : null) ?? units[0];

  const completedCount = allLessons.filter((l) => completedLessonIds.includes(l.id)).length;

  const getLessonStatus = (lesson: Lesson): LessonStatus => {
    if (completedLessonIds.includes(lesson.id)) return "completed";
    if (lesson.id === inProgressLesson?.id) return "inProgress";
    return "notStarted";
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ── Unit Banner ── */}
        <View style={styles.banner}>
          {/* Decorative circles */}
          <View style={styles.circle1} />
          <View style={styles.circle2} />

          {/* Language flag + name row */}
          <View className="flex-row items-center gap-2 mb-3">
            {language?.flag ? (
              <Image
                source={{ uri: language.flag }}
                style={styles.flagImage}
              />
            ) : null}
            <Text className="font-poppins-medium text-[13px] text-white/80">
              {language?.name ?? "Language"}
            </Text>
          </View>

          {/* Unit title */}
          <Text className="font-poppins-bold text-[26px] text-white mb-1" numberOfLines={1}>
            {currentUnit?.title ?? "Basics"}
          </Text>

          {/* Progress subtitle */}
          <View className="flex-row items-center gap-1.5">
            <View className="bg-white/20 rounded-full px-2.5 py-0.5">
              <Text className="font-poppins-medium text-[12px] text-white">
                Unit {currentUnit?.order ?? 1}
              </Text>
            </View>
            <Text className="font-poppins-regular text-[13px] text-white/70">
              · {completedCount} / {allLessons.length} lessons
            </Text>
          </View>

          {/* Mascot image */}
          <Image
            source={images.mascotWelcome}
            style={styles.mascot}
            resizeMode="contain"
          />
        </View>

        {/* ── Lessons / Practice Tabs ── */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab("lessons")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "lessons" && styles.tabTextActive,
              ]}
            >
              Lessons
            </Text>
            {activeTab === "lessons" && <View style={styles.tabIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab("practice")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "practice" && styles.tabTextActive,
              ]}
            >
              Practice
            </Text>
            {activeTab === "practice" && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        </View>

        {/* ── Content ── */}
        {activeTab === "lessons" ? (
          <View className="px-5 pt-4">
            {units.length === 0 ? (
              <View className="items-center py-16">
                <Ionicons name="book-outline" size={48} color="#D1D5DB" />
                <Text className="font-poppins-semibold text-base text-text-secondary mt-4">
                  No lessons yet
                </Text>
                <Text className="font-poppins-regular text-sm text-text-secondary mt-1 text-center">
                  Lessons are coming soon for this language.
                </Text>
              </View>
            ) : (
              units.map((unit) => {
                const unitLessons = getLessonsByUnit(unit.id);
                return (
                  <View key={unit.id}>
                    {units.length > 1 && (
                      <View className="flex-row items-center gap-2 mb-3 mt-2">
                        <Text className="font-poppins-bold text-[13px] text-text-secondary">
                          UNIT {unit.order}
                        </Text>
                        <Text className="font-poppins-medium text-[13px] text-text-secondary">
                          · {unit.title}
                        </Text>
                      </View>
                    )}
                    {unitLessons.map((lesson, idx) => (
                      <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        lessonNumber={idx + 1}
                        status={getLessonStatus(lesson)}
                        onPress={() =>
                          router.push({
                            pathname: "/lesson/[id]",
                            params: { id: lesson.id },
                          })
                        }
                      />
                    ))}
                  </View>
                );
              })
            )}
          </View>
        ) : (
          <View className="items-center justify-center py-20 px-8">
            <View className="w-20 h-20 rounded-full bg-surface items-center justify-center mb-5">
              <Ionicons name="construct-outline" size={32} color="#9CA3AF" />
            </View>
            <Text className="font-poppins-semibold text-[17px] text-text-primary text-center">
              Practice coming soon
            </Text>
            <Text className="font-poppins-regular text-[13px] text-text-secondary mt-2 text-center">
              Interactive quizzes and drills will be available in a future update.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#6C4EF5",
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
    minHeight: 190,
    overflow: "hidden",
    position: "relative",
  },
  circle1: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  circle2: {
    position: "absolute",
    bottom: -30,
    left: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  flagImage: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  mascot: {
    position: "absolute",
    right: -8,
    bottom: 0,
    width: 140,
    height: 165,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingHorizontal: 20,
  },
  tab: {
    marginRight: 28,
    paddingVertical: 14,
    position: "relative",
  },
  tabText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#6B7280",
  },
  tabTextActive: {
    color: "#6C4EF5",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#6C4EF5",
    borderRadius: 1,
  },
});
