import Ionicons from "@expo/vector-icons/Ionicons";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { ActivityIndicator } from "react-native";
import { Button, H2, Text, View, YStack } from "tamagui";

import { useEffect } from "react";
import { useGoogleLogin } from "../../../src/hooks/useGoogleLogin";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { mutate: login, isPending } = useGoogleLogin();

  const redirectUri = AuthSession.makeRedirectUri({
    // scheme: "com.raulglezrdguez.exposharexam",
    native: "com.raulglezrdguez.exposharexam://",
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    // iosClientId: 'TU_IOS_CLIENT_ID.apps.googleusercontent.com',
    androidClientId:
      "897107187827-p0k44s9d8f9v7537mv9voe6objmmn7br.apps.googleusercontent.com",
    webClientId:
      "897107187827-r0abkqa0l93refqvl0d628fjtqfo30ff.apps.googleusercontent.com",
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      if (id_token) login(id_token);
    } else if (response?.type === "error") {
      console.error(response.error);
    }
  }, [response]);

  return (
    <YStack f={1} jc="center" ai="center" bg="$background" p="$6" space="$8">
      <YStack ai="center" gap="$2">
        <View
          bg="$primary"
          w={100}
          h={100}
          br={20}
          jc="center"
          ai="center"
          shadowColor="$shadowColor"
          shadowRadius={10}
        >
          <Text fontSize={40}>🚀</Text>
        </View>
        <H2 mt="$4" fontWeight="bold">
          Bienvenido
        </H2>
        <Text color="$gray10" textAlign="center">
          Inicia sesión con tu cuenta de Google para continuar.
        </Text>
      </YStack>

      <YStack w="100%" gap="$4">
        <Button
          size="$5"
          onPress={() => promptAsync()}
          disabled={!request || isPending}
          icon={
            isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <Ionicons name="logo-google" size={20} />
            )
          }
          bg="white"
          color="black"
          br="$5"
          borderWidth={1}
          borderColor="$gray5"
          pressStyle={{ scale: 0.98, bg: "$gray2" }}
        >
          {isPending ? "Conectando..." : "Continuar con Google"}
        </Button>

        <Text fontSize="$2" color="$gray8" textAlign="center">
          Al continuar, aceptas nuestros términos y condiciones.
        </Text>
      </YStack>
    </YStack>
  );
}
