import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { images } from "@/constants/images";

export default function OnboardingScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <View className="flex-1 px-6 pt-4">

          {/* Header: mascot logo + app name */}
          <View className="flex-row items-center gap-2">
            <Image
              source={images.mascotLogo}
              className="w-9 h-9"
              resizeMode="contain"
            />
            <Text className="font-poppins-bold text-xl text-text-primary">muolingo</Text>
          </View>

          {/* Heading */}
          <View className="mt-8">
            <Text className="h1">
              Your AI language{"\n"}
              <Text className="text-lingua-purple">teacher.</Text>
            </Text>
            <Text className="body-md text-text-secondary mt-3">
              Real conversations, personalized{"\n"}lessons, anytime, anywhere.
            </Text>
          </View>

          {/* Mascot illustration with speech bubbles */}
          <View className="flex-1 mt-4">
            <Image
              source={images.mascotWelcome}
              className="flex-1 w-full"
              resizeMode="contain"
            />

            {/* Hello! bubble — left, mid-height */}
            <View
              className="absolute left-0 top-[32%] bg-white rounded-2xl px-4 py-2.5"
              style={styles.shadow}
            >
              <Text className="font-poppins-semibold text-sm text-text-primary">Hello!</Text>
            </View>

            {/* ¡Hola! bubble — upper right */}
            <View
              className="absolute right-0 top-[6%] bg-white rounded-2xl px-4 py-2.5"
              style={styles.shadow}
            >
              <Text className="font-poppins-semibold text-sm text-text-primary">¡Hola!</Text>
            </View>

            {/* 你好! bubble — lower right */}
            <View
              className="absolute right-2 bottom-[28%] bg-white rounded-2xl px-4 py-2.5"
              style={styles.shadow}
            >
              <Text className="font-poppins-semibold text-sm text-error">你好!</Text>
            </View>
          </View>

          {/* Get Started button */}
          <TouchableOpacity
            className="bg-lingua-purple rounded-2xl py-[18px] px-6 flex-row items-center justify-center gap-2"
            activeOpacity={0.85}
            onPress={() => {}}
          >
            <Text className="font-poppins-semibold text-lg text-white">Get Started</Text>
            <Ionicons name="chevron-forward" size={22} color="#ffffff" />
          </TouchableOpacity>

          <View className="h-6" />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
});
