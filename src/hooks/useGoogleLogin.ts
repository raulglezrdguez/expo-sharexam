import { useRealm } from "@realm/react";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";
import Realm from "realm";
import { BASE_API_URL } from "../constants/consts";
import { useAuthStore } from "../store/authStore";

export const useGoogleLogin = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const realm = useRealm();

  return useMutation({
    mutationFn: async (token: string) => {
      const response = await fetch(`${BASE_API_URL}/auth/mobile/google/login`, {
        method: "POST",
        body: JSON.stringify({ idToken: token }),
      });

      if (!response.ok)
        throw new Error("Error en la autenticación con el servidor");
      return response.json();
    },
    onSuccess: (data) => {
      setSession(data.token);

      realm.write(() => {
        realm.create(
          "UserProfile",
          {
            _id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            image: data.user.image,
          },
          Realm.UpdateMode.Modified,
        );
      });

      router.replace("/");
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });
};
