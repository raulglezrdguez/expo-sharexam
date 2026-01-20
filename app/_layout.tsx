import { RealmProvider } from "@realm/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { TamaguiProvider, Theme, ThemeName } from "tamagui";

import config from "@/tamagui.config";
// import { MySchema } from './src/db/schemas';

const defaultTheme: ThemeName = "dark";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) return null;

  return (
    <TamaguiProvider config={config} defaultTheme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <RealmProvider>
          <Theme name={defaultTheme}>
            <Stack>
              <Stack.Screen name="index" options={{ title: "Inicio" }} />
            </Stack>
          </Theme>
        </RealmProvider>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
