import { RealmProvider } from "@realm/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import {
  SplashScreen,
  Stack,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import { useEffect, useState } from "react";
import { TamaguiProvider, Theme, ThemeName } from "tamagui";

import { UserProfile } from "@/src/db/UserSchema";
import {
  AppliedExam,
  Exam,
  ExamAnswer,
  ExamResult,
  Patient,
} from "@/src/db/schemas";
import { useAuthStore } from "@/src/store/authStore";
import config from "@/tamagui.config";

const defaultTheme: ThemeName = "dark";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  const navigationState = useRootNavigationState();

  const { isAuthenticated } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || !navigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/login");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/patients/index");
    }
  }, [isAuthenticated, segments, isReady, navigationState?.key]);

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) return null;

  return (
    <TamaguiProvider config={config} defaultTheme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <RealmProvider
          schema={[
            UserProfile,
            Patient,
            Exam,
            ExamResult,
            AppliedExam,
            ExamAnswer,
          ]}
        >
          <Theme name={defaultTheme}>
            <Stack
              initialRouteName="(tabs)"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(auth)" />
            </Stack>
          </Theme>
        </RealmProvider>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
