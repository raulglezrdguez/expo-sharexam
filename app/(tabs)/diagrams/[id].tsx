import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Text, XStack, YStack } from "tamagui";
import ExamDiagram from "../../../src/components/ExamDiagram";
import { useExams } from "../../../src/hooks/useExams";

export default function DiagramMapScreen() {
  const { id } = useLocalSearchParams();
  const { data: exams } = useExams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const exam = exams?.find((e: any) => e._id === id);

  if (!exam)
    return (
      <YStack f={1} ai={"center"} jc={"center"} bg="$background">
        <Text>Cargando diagrama...</Text>
      </YStack>
    );

  return (
    <YStack f={1} bg="$background" p="$4" gap="$4">
      <XStack
        pos="absolute"
        zi={100}
        top={insets.top + 20}
        left={20}
        jc="flex-start"
        ai="center"
      >
        <Button
          icon={<FontAwesome name="arrow-left" />}
          circular
          elevate
          onPress={() => router.replace(`/(tabs)/exams/${exam._id}`)}
        />
        <YStack bg="$background" px="$3" py="$1" br="$4">
          <Text fontWeight="bold" fontSize="$3">
            {exam.title}
          </Text>
        </YStack>
      </XStack>

      {/* El diagrama ocupa todo el espacio sin interferencias */}
      <ExamDiagram nodes={exam.nodes} edges={exam.edges} />
    </YStack>
  );
}
