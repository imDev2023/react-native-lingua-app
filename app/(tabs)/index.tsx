import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/expo";
import { Redirect } from "expo-router";
import { useLanguageStore } from "@/store/languageStore";
import { useProgressStore } from "@/store/progressStore";
import { getLanguageById } from "@/data/languages";
import { getUnitsByLanguage } from "@/data/units";
import { getLessonsByUnit } from "@/data/lessons";
import { images } from "@/constants/images";
import type { LanguageCode } from "@/types/learning";

const GREETINGS: Record<string, string> = {
  es: "Hola",
  fr: "Bonjour",
  de: "Hallo",
  ja: "こんにちは",
  ko: "안녕하세요",
  zh: "你好",
};

type PlanItem = {
  id: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  completed: boolean;
};

export default function HomeScreen() {
  const { selectedLanguageId, _hasHydrated } = useLanguageStore();
  const { streakCount, dailyXp, dailyXpGoal, completedLessonIds } = useProgressStore();
  const { user } = useUser();

  if (!_hasHydrated) return null;
  if (!selectedLanguageId) return <Redirect href="/language-selection" />;

  const langCode = selectedLanguageId as LanguageCode;
  const language = getLanguageById(langCode);
  const languageUnits = getUnitsByLanguage(langCode);
  const currentUnit = languageUnits[0];
  const currentUnitLessons = currentUnit ? getLessonsByUnit(currentUnit.id) : [];
  const firstLesson = currentUnitLessons[0];
  const isFirstLessonDone = firstLesson ? completedLessonIds.includes(firstLesson.id) : false;

  const progressPercent = dailyXpGoal > 0 ? (dailyXp / dailyXpGoal) * 100 : 0;
  const firstName = user?.firstName ?? "Learner";
  const greeting = GREETINGS[selectedLanguageId] ?? "Hey";

  const todaysPlan: PlanItem[] = [
    {
      id: "lesson",
      icon: "book",
      iconBg: "#EEEEFF",
      iconColor: "#6C4EF5",
      title: "Lesson",
      subtitle: firstLesson?.title ?? "Greetings",
      completed: isFirstLessonDone,
    },
    {
      id: "ai-conversation",
      icon: "headset",
      iconBg: "#E8F0FF",
      iconColor: "#4D88FF",
      title: "AI Conversation",
      subtitle: "Talk about your day",
      completed: false,
    },
    {
      id: "new-words",
      icon: "chatbubble-ellipses",
      iconBg: "#FFF0EE",
      iconColor: "#FF4D4F",
      title: "New words",
      subtitle: "10 words",
      completed: false,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>

        {/* ── Header ── */}
        <View className="flex-row items-center justify-between px-5 py-4">
          <View className="flex-row items-center gap-2">
            {language?.flag ? (
              <Image source={{ uri: language.flag }} className="w-7 h-7 rounded-full" />
            ) : null}
            <Text className="font-poppins-semibold text-base text-text-primary">
              {greeting}, {firstName}! 👋
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <Image source={images.streakFire} className="w-5 h-5 object-contain" />
              <Text className="font-poppins-bold text-[15px] text-text-primary">
                {streakCount}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons name="notifications-outline" size={24} color="#001328" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Cards ── */}
        <View className="px-5 gap-4">

          {/* Daily Goal Card */}
          <View className="bg-[#FFF8EE] rounded-2xl p-5">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="caption mb-1">Daily goal</Text>
                <Text className="font-poppins-bold text-[22px] text-text-primary mb-3">
                  {dailyXp} / {dailyXpGoal} XP
                </Text>
                <View className="h-2 bg-[#FFE8C8] rounded w-full overflow-hidden">
                  <View
                    className="h-2 bg-streak rounded"
                    style={{ width: `${progressPercent}%` }}
                  />
                </View>
              </View>
              <Image source={images.treasure} className="w-20 h-20 object-contain ml-3" />
            </View>
          </View>

          {/* Continue Learning Card */}
          <View className="bg-lingua-purple rounded-2xl p-5 flex-row overflow-hidden min-h-38.75">
            <View className="flex-1 justify-between pr-2">
              <View>
                <Text className="font-poppins-regular text-[12px] mb-1 text-white/70">
                  Continue learning
                </Text>
                <Text className="font-poppins-bold text-[22px] mb-1 text-white">
                  {language?.name ?? "Spanish"}
                </Text>
                <Text className="font-poppins-regular text-[13px] mb-4 text-white/80">
                  A1 · Unit {currentUnit?.order ?? 1}
                </Text>
              </View>
              <TouchableOpacity
                className="bg-white rounded-3xl py-2 px-5 self-start"
                activeOpacity={0.85}
              >
                <Text className="font-poppins-semibold text-[14px] text-lingua-purple">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
            <Image
              source={images.palace}
              className="w-30 h-38.75 object-contain self-end -mb-5 -mr-2"
            />
          </View>

          {/* Today's Plan */}
          <View>
            <View className="flex-row items-center justify-between mb-3">
              <Text className="font-poppins-semibold text-base text-text-primary">
                Today's plan
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="font-poppins-medium text-[14px] text-lingua-purple">
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            <View className="bg-white rounded-2xl border border-border overflow-hidden">
              {todaysPlan.map((item, index) => (
                <View key={item.id}>
                  <View className="flex-row items-center px-4 py-3.5">
                    <View
                      className="w-11 h-11 rounded-xl items-center justify-center"
                      style={{ backgroundColor: item.iconBg }}
                    >
                      <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
                    </View>
                    <View className="flex-1 ml-3">
                      <Text className="font-poppins-semibold text-[14px] text-text-primary">
                        {item.title}
                      </Text>
                      <Text className="font-poppins-regular text-[12px] text-text-secondary mt-0.5">
                        {item.subtitle}
                      </Text>
                    </View>
                    {item.completed ? (
                      <View className="w-6.5 h-6.5 rounded-full bg-lingua-purple items-center justify-center">
                        <Ionicons name="checkmark" size={13} color="#fff" />
                      </View>
                    ) : (
                      <View className="w-6.5 h-6.5 rounded-full border-2 border-[#D1D5DB]" />
                    )}
                  </View>
                  {index < todaysPlan.length - 1 && (
                    <View className="h-px bg-[#F3F4F6] mx-4" />
                  )}
                </View>
              ))}
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
