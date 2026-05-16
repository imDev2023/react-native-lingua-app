import "../global.css";

import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import { useLanguageStore } from "@/store/languageStore";

SplashScreen.preventAutoHideAsync().catch(() => {});

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env.local file");
}

function RootNavigator({ fontsLoaded }: { fontsLoaded: boolean }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { _hasHydrated } = useLanguageStore();
  const splashHidden = useRef(false);

  // Keep splash visible until fonts, Clerk session, and store hydration are all ready.
  // Guard with a ref so hideAsync is only ever called once.
  useEffect(() => {
    if (fontsLoaded && isLoaded && _hasHydrated && !splashHidden.current) {
      splashHidden.current = true;
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, isLoaded, _hasHydrated]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!isSignedIn}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="language-selection" />
        <Stack.Screen name="tasks/[key]" />
      </Stack.Protected>

      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <RootNavigator fontsLoaded={fontsLoaded} />
    </ClerkProvider>
  );
}
