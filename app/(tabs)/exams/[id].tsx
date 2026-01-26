import { useExams } from "@/src/hooks/useExams";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Button,
  H3,
  ScrollView,
  Separator,
  Text,
  XStack,
  YStack,
} from "tamagui";

export default function ExamDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: exams } = useExams();
  const router = useRouter();

  // Buscamos el examen específico en el caché de React Query
  const exam = exams?.find((e: any) => e._id === id);

  if (!exam) return <Text>Examen no encontrado</Text>;

  console.log(exam.nodes);

  return (
    <ScrollView bg="$background">
      <YStack p="$4" gap="$4">
        <H3>{exam.title}</H3>

        <XStack ai="center" gap="$2" bg="$blue2" p="$3" br="$4">
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

        <YStack gap="$2">
          <Text fontWeight="bold">Estructura:</Text>
          <Text color="$gray10">
            • Nodos de decisión: JSON.parse(exam.nodes).length
            {"\n"}• Conexiones: JSON.parse(exam.edges).length
          </Text>
        </YStack>

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
          Aplicar a un Paciente
        </Button>
      </YStack>
    </ScrollView>
  );
}
