// app.config.js extends app.json and injects runtime environment variables as extras.
// PostHog keys are read at build time from .env.local and surfaced to the app via
// expo-constants (Constants.expoConfig?.extra.*).

const appJson = require('./app.json');

export default {
  ...appJson.expo,
  extra: {
    ...appJson.expo.extra,
    posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
    posthogHost: process.env.POSTHOG_HOST,
  },
  ios: {
    ...appJson.expo.ios,
    bundleIdentifier: "com.farren-elli.Duo-Lingo",
  },
  android: {
    ...appJson.expo.android,
    package: "com.farrenelli.DuoLingo",
  },
};
