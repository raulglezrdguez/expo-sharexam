import { RealmProvider } from "@realm/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { TamaguiProvider, Theme, ThemeName } from "tamagui";

import { UserProfile } from "@/src/db/UserSchema";
import config from "@/tamagui.config";
import { useAuthStore } from "../src/store/authStore";

const defaultTheme: ThemeName = "dark";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const { isAuthenticated } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/login");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/");
    }
  }, [isAuthenticated, segments, isReady]);

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) return null;

  return (
    <TamaguiProvider config={config} defaultTheme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <RealmProvider schema={[UserProfile]}>
          <Theme name={defaultTheme}>
            <Stack>
              <Stack.Screen name="index" options={{ title: "Inicio" }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            </Stack>
          </Theme>
        </RealmProvider>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
