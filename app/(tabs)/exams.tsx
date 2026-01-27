import { useExams } from "@/src/hooks/useExams";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Card, H2, Spinner, Text, XStack, YStack } from "tamagui";

export default function ExamsScreen() {
  const { data: exams, isLoading, error, refetch } = useExams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  console.log(exams);
  if (isLoading) {
    return (
      <YStack f={1} bg="$background" pt={insets.top} jc="center" ai="center">
        <Spinner size="large" color="$blue10" />
        <Text mt="$2" color="$gray10">
          Cargando exámenes...
        </Text>
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack
        f={1}
        bg="$background"
        pt={insets.top}
        jc="center"
        ai="center"
        p="$4"
      >
        <Text color="$red10">Error al conectar con el servidor</Text>
        <Button
          icon={<FontAwesome name="refresh" size={24} />}
          mt="$4"
          onPress={() => refetch()}
        >
          Reintentar
        </Button>
      </YStack>
    );
  }

  return (
    <YStack f={1} bg="$background" pt={insets.top} px="$4">
      <YStack py="$4" gap="$2">
        <H2>Exámenes Disponibles</H2>
        <Text color="$gray10">Selecciona un exámen para ver detalles</Text>
      </YStack>

      <FlatList
        data={exams}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card
            elevate
            bordered
            p="$4"
            mb="$3"
            onPress={() => router.push(`/(tabs)/exams/${item._id}`)}
          >
            <XStack jc="space-between" ai="center">
              <YStack f={1} gap="$1">
                <Text fontWeight="bold" fontSize="$5">
                  {item.title}
                </Text>
                <Text color="$gray10" numberOfLines={2}>
                  {item.description}
                </Text>
                <Text fontSize="$2" color="$blue10" mt="$2">
                  Autor: {item.author.name}
                </Text>
              </YStack>
              <FontAwesome name="chevron-right" size={20} color="$gray8" />
            </XStack>
          </Card>
        )}
        ListEmptyComponent={
          <YStack ai="center" p="$10">
            <FontAwesome name="clipboard" size={48} color="$gray5" />
            <Text color="$gray10" mt="$2">
              No hay exámenes disponibles
            </Text>
          </YStack>
        }
      />
    </YStack>
  );
}
