import { Patient } from "@/src/db/schemas";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useQuery } from "@realm/react";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Card, H2, Separator, Text, XStack, YStack } from "tamagui";

export default function PatientsScreen() {
  const router = useRouter();
  const patients = useQuery(Patient).sorted("name");
  const insets = useSafeAreaInsets();

  return (
    <YStack
      f={1}
      jc={"center"}
      ai={"center"}
      bg="$background"
      p="$4"
      gap="$4"
      pt={insets.top}
    >
      <XStack jc="space-between" ai="center" m="$4" gap="$4">
        <H2>Pacientes</H2>
        <Button
          icon={<FontAwesome name="plus" size={24} />}
          circular
          theme="blue"
          onPress={() => router.push("/patients/new-patient")}
        />
      </XStack>

      <Separator />

      <FlatList
        data={patients}
        keyExtractor={(item) => item._id.toHexString()}
        renderItem={({ item }) => (
          <Card
            elevate
            p="$4"
            mb="$3"
            onPress={() =>
              router.push({
                pathname: "/(tabs)/patients/[id]",
                params: { id: item._id.toHexString() },
              })
            }
          >
            <XStack jc="space-between" ai="center">
              <XStack gap="$3" ai="center">
                <YStack bg="$blue5" p="$2" br="$true">
                  <FontAwesome name="user" size={20} color="$blue10" />
                </YStack>
                <YStack>
                  <Text fontWeight="bold" fontSize="$5">
                    {item.name}
                  </Text>
                  <Text color="$gray10" fontSize="$3">
                    {item.sex} • ID: {item.identifier}
                  </Text>
                </YStack>
              </XStack>
              <FontAwesome name="chevron-right" size={20} color="$gray8" />
            </XStack>
          </Card>
        )}
        ListEmptyComponent={
          <YStack ai="center" p="$10">
            <Text color="$gray10">No hay pacientes registrados.</Text>
          </YStack>
        }
      />
    </YStack>
  );
}
