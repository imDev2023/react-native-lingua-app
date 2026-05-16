import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TASK_META: Record<
  string,
  { title: string; description: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  "setup-mfa": {
    title: "Enable Two-Factor Authentication",
    description:
      "Your account requires two-factor authentication. Please complete the setup to continue.",
    icon: "shield-checkmark-outline",
  },
  "choose-organization": {
    title: "Choose an Organization",
    description:
      "You need to select or create an organization before continuing.",
    icon: "people-outline",
  },
  "reset-password": {
    title: "Reset Your Password",
    description:
      "A password reset is required before you can continue using the app.",
    icon: "key-outline",
  },
};

const FALLBACK_META = {
  title: "Action Required",
  description: "Please complete the required step to access your account.",
  icon: "alert-circle-outline" as keyof typeof Ionicons.glyphMap,
};

export default function TaskScreen() {
  const { key } = useLocalSearchParams<{ key: string }>();
  const meta = TASK_META[String(key)] ?? FALLBACK_META;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="flex-1 px-6 justify-center items-center gap-6">
        <View className="w-20 h-20 rounded-full bg-surface items-center justify-center">
          <Ionicons name={meta.icon} size={40} color="#6C4EF5" />
        </View>

        <Text className="h2 text-center">{meta.title}</Text>
        <Text className="body-md text-text-secondary text-center">
          {meta.description}
        </Text>

        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.85}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.btnText}>Continue to App</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  btn: {
    backgroundColor: "#6C4EF5",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: "center",
    marginTop: 8,
  },
  btnText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#ffffff",
  },
});
