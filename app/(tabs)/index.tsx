import { View, Text } from "react-native";
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguageStore } from "@/store/languageStore";

export default function HomeScreen() {
  const { selectedLanguageId, _hasHydrated } = useLanguageStore();

  if (!_hasHydrated) return null;
  if (!selectedLanguageId) return <Redirect href="/language-selection" />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["top"]}>
      <View className="flex-1 items-center justify-center">
        <Text className="font-poppins-bold text-2xl text-lingua-purple">Home</Text>
        <Text className="font-poppins-regular text-sm text-text-secondary mt-2">
          Home screen coming soon
        </Text>
      </View>
    </SafeAreaView>
  );
}
