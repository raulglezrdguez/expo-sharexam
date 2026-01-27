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
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
      router.replace("/patients");
    }
  }, [isAuthenticated, segments, isReady, navigationState?.key]);

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
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
                <StatusBar style="light" />
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
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
