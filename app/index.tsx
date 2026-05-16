import { View, Text, TouchableOpacity } from "react-native";
import { useClerk, useUser } from "@clerk/expo";
import { router } from "expo-router";

export default function Index() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View className="flex-1 justify-center items-center gap-6 px-8">
      <Text className="font-poppins-bold text-center text-lingua-purple text-lg">
        Agentic Development Course is coming soon
      </Text>

      {user?.primaryEmailAddress?.emailAddress && (
        <Text className="font-poppins-medium text-center text-text-secondary text-sm">
          Signed in as {user.primaryEmailAddress.emailAddress}
        </Text>
      )}

      <TouchableOpacity
        className="bg-lingua-purple px-8 py-4 rounded-2xl"
        activeOpacity={0.85}
        onPress={() => router.push("/language-selection")}
      >
        <Text className="font-poppins-semibold text-white text-base">
          Choose Language
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="px-8 py-4 rounded-2xl"
        activeOpacity={0.85}
        onPress={() => signOut()}
      >
        <Text className="font-poppins-semibold text-text-secondary text-base">
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
