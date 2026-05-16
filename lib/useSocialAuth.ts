import { useSSO } from "@clerk/expo";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect, useState } from "react";

// Required so the auth session can complete when the user returns to the app.
WebBrowser.maybeCompleteAuthSession();

export type SocialStrategy =
  | "oauth_google"
  | "oauth_facebook"
  | "oauth_apple";

/**
 * Browser-based OAuth sign-in. Works in Expo Go (no dev build needed).
 * A provider only succeeds if it is enabled in the Clerk Dashboard.
 */
export function useSocialAuth() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();
  const [pending, setPending] = useState<SocialStrategy | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Warming up the browser makes the OAuth screen open faster on Android.
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);

  const onSocialPress = useCallback(
    async (strategy: SocialStrategy) => {
      if (pending) return;
      setPending(strategy);
      setError(null);
      try {
        const { createdSessionId, setActive, signIn, signUp, authSessionResult } =
          await startSSOFlow({
            strategy,
            redirectUrl: AuthSession.makeRedirectUri(),
          });

        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
          router.replace("/");
        } else if (
          authSessionResult?.type === "cancel" ||
          authSessionResult?.type === "dismiss"
        ) {
          // User closed the browser without completing — no error needed.
        } else if (signIn?.status === "needs_second_factor") {
          setError(
            "Two-factor authentication is required. Please sign in with email and password.",
          );
        } else if (signUp?.status === "missing_requirements") {
          setError(
            "Additional information is required to complete sign-up. Please use email and password.",
          );
        } else if (signIn || signUp) {
          setError("Sign-in could not be completed. Please try again.");
        }
      } catch (err) {
        console.error(
          "Social auth error:",
          err instanceof Error ? err.message : "Unknown error",
        );
        setError("Could not sign in with that provider. Please try again.");
      } finally {
        setPending(null);
      }
    },
    [pending, startSSOFlow, router],
  );

  return { onSocialPress, pending, error };
}
