<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the muolingo Expo app.

## Summary of changes

- **`app.config.js`** (new) — Extends `app.json` and injects `POSTHOG_PROJECT_TOKEN` / `POSTHOG_HOST` from `.env.local` as Expo `extra` config, making them available to the app via `expo-constants`.
- **`lib/posthog.ts`** (new) — Creates and exports the configured `PostHog` client instance with batching, lifecycle event capture, and debug mode in dev.
- **`app/_layout.tsx`** — Wraps the app in `PostHogProvider` (outside `ClerkProvider`); adds manual screen tracking via `posthog.screen()` in a `useEffect` that watches the current pathname.
- **`app/onboarding.tsx`** — Captures `onboarding_get_started_tapped` when the Get Started button is pressed.
- **`app/(auth)/sign-up.tsx`** — Captures `sign_up_submitted` on form submit; `sign_up_completed` + `posthog.identify(email)` on successful account creation.
- **`app/(auth)/sign-in.tsx`** — Captures `sign_in_submitted` on form submit; `sign_in_completed` + `posthog.identify(email)` on successful sign-in.
- **`lib/useSocialAuth.ts`** — Captures `social_auth_started` (with `provider`) when a social button is tapped; `social_auth_completed` on success.
- **`app/language-selection.tsx`** — Captures `language_selected` when a language card is tapped; `language_confirmed` when the Continue button is pressed.
- **`app/(tabs)/index.tsx`** — Captures `continue_learning_tapped` on the Continue Learning card button.
- **`store/progressStore.ts`** — Captures `lesson_completed` (with `lesson_id`) and `xp_earned` (with `xp_amount`, `total_xp`) directly from the Zustand store actions.
- **`.env.local`** — `POSTHOG_PROJECT_TOKEN` and `POSTHOG_HOST` added.

## Events

| Event | Description | File |
|---|---|---|
| `onboarding_get_started_tapped` | User tapped "Get Started" on onboarding — top of acquisition funnel | `app/onboarding.tsx` |
| `sign_up_submitted` | User submitted the email+password sign-up form | `app/(auth)/sign-up.tsx` |
| `sign_up_completed` | User verified email and completed account creation | `app/(auth)/sign-up.tsx` |
| `sign_in_submitted` | User submitted the email+password sign-in form | `app/(auth)/sign-in.tsx` |
| `sign_in_completed` | User successfully signed in with email+password | `app/(auth)/sign-in.tsx` |
| `social_auth_started` | User tapped a social OAuth button (provider: google/facebook/apple) | `lib/useSocialAuth.ts` |
| `social_auth_completed` | User successfully authenticated via social OAuth | `lib/useSocialAuth.ts` |
| `language_selected` | User tapped a language card | `app/language-selection.tsx` |
| `language_confirmed` | User confirmed language selection with Continue | `app/language-selection.tsx` |
| `lesson_completed` | Lesson marked as complete (lesson_id included) | `store/progressStore.ts` |
| `xp_earned` | XP added (xp_amount, total_xp included) | `store/progressStore.ts` |
| `continue_learning_tapped` | User tapped Continue on the home screen learning card | `app/(tabs)/index.tsx` |

## Next steps

We've built a dashboard and five insights to keep an eye on user behavior:

- [Analytics basics dashboard](/dashboard/1593939)
- [Sign-up Acquisition Funnel](/insights/s0jWaSd3) — Conversion from onboarding → form submit → account created
- [Daily Active Learners (Sign-ins)](/insights/5Avhr47t) — Unique daily sign-ins via email and social
- [Language Adoption](/insights/u0oZhJaD) — Which languages users are picking, broken down by name
- [Lesson Completions Over Time](/insights/khW5VJ8A) — Daily lesson completion count
- [Auth Method Mix](/insights/3Xu7djh1) — Email sign-ups vs social auth completions per week

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-expo/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
