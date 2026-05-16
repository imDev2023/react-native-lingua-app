import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["top"]}>
      <View className="flex-1 items-center justify-center">
        <Text className="font-poppins-bold text-2xl text-lingua-purple">Profile</Text>
        <Text className="font-poppins-regular text-sm text-text-secondary mt-2">
          Profile screen coming soon
        </Text>
      </View>
    </SafeAreaView>
  );
}
