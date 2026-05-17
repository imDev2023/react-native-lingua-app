import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, type Href } from "expo-router";
import { useSignIn } from "@clerk/expo";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { usePostHog } from "posthog-react-native";
import { images } from "@/constants/images";
import { useSocialAuth } from "@/lib/useSocialAuth";

export default function SignInScreen() {
  const { signIn, fetchStatus } = useSignIn();
  const { onSocialPress, pending: socialPending } = useSocialAuth();
  const posthog = usePostHog();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const submitting = fetchStatus === "fetching";

  const handleSignIn = async () => {
    if (!email || !password || submitting) return;
    setFormError(null);

    posthog.capture('sign_in_submitted', { method: 'email' });

    const { error } = await signIn.password({
      emailAddress: email,
      password,
    });

    if (error) {
      setFormError(error.message ?? "Could not sign you in.");
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session }) => {
          posthog.capture('sign_in_completed', { method: 'email' });
          posthog.identify(email, {
            $set: { email },
          });
          if (session?.currentTask) return;
          router.replace("/" as Href);
        },
      });
      return;
    }

    setFormError("Additional verification is required for this account.");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 pt-2 pb-8">
          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={26} color="#001132" />
          </TouchableOpacity>

          {/* Heading */}
          <Text className="h1 mt-5">Welcome back! 👋</Text>
          <Text className="body-md text-text-secondary mt-1">
            Sign in to continue your journey
          </Text>

          {/* Mascot */}
          <View className="items-center mt-6 mb-2">
            <Image
              source={images.mascotAuth}
              style={styles.mascot}
              resizeMode="contain"
            />
          </View>

          {/* Email field */}
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.inputText}
              value={email}
              onChangeText={setEmail}
              placeholder="your@email.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password field */}
          <View style={[styles.inputBox, styles.inputBoxRow, { marginTop: 12 }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.inputText}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
              />
            </View>
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              activeOpacity={0.7}
              style={{ paddingLeft: 8 }}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {formError && <Text style={styles.formError}>{formError}</Text>}

          {/* Sign In button */}
          <TouchableOpacity
            style={[styles.primaryBtn, submitting && styles.btnDisabled]}
            activeOpacity={0.85}
            onPress={handleSignIn}
            disabled={submitting}
          >
            <Text style={styles.primaryBtnText}>
              {submitting ? "Please wait…" : "Sign In"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social buttons */}
          <View className="gap-3">
            <TouchableOpacity
              style={[styles.socialBtn, !!socialPending && styles.btnDisabled]}
              activeOpacity={0.8}
              onPress={() => onSocialPress("oauth_google")}
              disabled={!!socialPending}
            >
              <AntDesign name="google" size={20} color="#EA4335" />
              <Text style={styles.socialBtnText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialBtn, !!socialPending && styles.btnDisabled]}
              activeOpacity={0.8}
              onPress={() => onSocialPress("oauth_facebook")}
              disabled={!!socialPending}
            >
              <FontAwesome name="facebook" size={20} color="#1877F2" />
              <Text style={styles.socialBtnText}>Continue with Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialBtn, !!socialPending && styles.btnDisabled]}
              activeOpacity={0.8}
              onPress={() => onSocialPress("oauth_apple")}
              disabled={!!socialPending}
            >
              <AntDesign name="apple" size={20} color="#000000" />
              <Text style={styles.socialBtnText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Sign up link */}
          <View className="flex-row justify-center mt-8">
            <Text className="body-md text-text-secondary">
              Don&apos;t have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/sign-up")}
              activeOpacity={0.7}
            >
              <Text className="body-md text-lingua-purple font-poppins-semibold">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  mascot: {
    width: 160,
    height: 160,
  },
  inputBox: {
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
  },
  inputBoxRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
    marginBottom: 2,
  },
  inputText: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "#001132",
    padding: 0,
  },
  formError: {
    fontSize: 13,
    fontFamily: "Poppins-Medium",
    color: "#FF4D4F",
    marginTop: 10,
  },
  primaryBtn: {
    backgroundColor: "#6C4EF5",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#6C4EF5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  primaryBtnText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#ffffff",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 22,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#6B7280",
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  socialBtnText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#001132",
  },
});
