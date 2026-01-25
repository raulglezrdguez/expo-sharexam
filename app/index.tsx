// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/patients/" />;
}

// import { useRouter } from "expo-router";
// import { Button, H1, Text, XStack, YStack } from "tamagui";

// export default function Home() {
//   const router = useRouter();

//   return (
//     <YStack f={1} jc="center" ai="center" p="$4" gap="$4" bg="$background">
//       <H1 textAlign="center">Bienvenido a Expo + Tamagui</H1>

//       <Text color="$color" fontSize="$5">
//         Configuración de Realm, TanStack y Zustand lista.
//       </Text>

//       <XStack gap="$2">
//         <Button
//           theme="active"
//           onPress={() => router.navigate("/(tabs)/patients")}
//         >
//           Acción Primaria
//         </Button>
//         <Button variant="outlined">Configuración</Button>
//       </XStack>
//     </YStack>
//   );
// }
