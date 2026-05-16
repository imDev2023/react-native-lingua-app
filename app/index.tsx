import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center gap-6 px-8">
      <Text className="font-poppins-bold text-center text-lingua-purple text-lg">
        Agentic Development Course is coming soon
      </Text>

      <TouchableOpacity
        className="bg-lingua-purple px-8 py-4 rounded-2xl"
        activeOpacity={0.85}
        onPress={() => router.push("/onboarding")}
      >
        <Text className="font-poppins-semibold text-white text-base">
          Go to Onboarding →
        </Text>
      </TouchableOpacity>
    </View>
  );
}
