import { useExams } from "@/src/hooks/useExams";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, ScrollView, Separator, Text, XStack, YStack } from "tamagui";

export default function ExamDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: exams } = useExams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Buscamos el examen específico en el caché de React Query
  const exam = exams?.find((e: any) => e._id === id);

  if (!exam) return <Text>Examen no encontrado</Text>;

  return (
    <ScrollView bg="$background">
      <YStack p="$4" gap="$4" rowGap={"$4"}>
        <XStack
          top={insets.top}
          left={20}
          right={20}
          jc="flex-start"
          ai="center"
        >
          <Button
            icon={<FontAwesome name="arrow-left" />}
            circular
            elevate
            onPress={() => router.replace(`/(tabs)/exams`)}
          />
          <YStack bg="$background" px="$3" py="$1" br="$4">
            <Text fontWeight="bold" fontSize="$3">
              {exam.title}
            </Text>
          </YStack>
        </XStack>

        <XStack ai="center" gap="$2" bg="$blue2" p="$3" br="$4" mt={"$8"}>
          <FontAwesome name="info" size={18} color="$blue10" />
          <Text f={1} color="$blue10" fontSize="$3">
            Esta es una plantilla oficial desarrollada por: {exam.author.name}
          </Text>
        </XStack>

        <YStack gap="$2">
          <Text fontWeight="bold">Descripción:</Text>
          <Text color="$gray11" textAlign="justify">
            {exam.description}
          </Text>
        </YStack>

        <Separator />

        <Button
          mt="$6"
          theme="blue"
          size="$5"
          icon={<FontAwesome name="eye" />}
          onPress={() => {
            router.navigate(`/(tabs)/diagrams/${exam._id}`);
          }}
        >
          Ver diagrama
        </Button>

        <Button
          mt="$6"
          theme="blue"
          size="$5"
          icon={<FontAwesome name="play" />}
          onPress={() => {
            // Aquí navegaremos a la lógica de aplicación
            // pasando el ID del examen
            console.log("Comenzar examen:", exam._id);
          }}
        >
          Aplicar a Paciente
        </Button>
      </YStack>
    </ScrollView>
  );
}
