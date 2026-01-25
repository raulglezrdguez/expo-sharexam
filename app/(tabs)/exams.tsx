import { H2, Text, YStack } from "tamagui";

export default function ExamsScreen() {
  return (
    <YStack f={1} jc="center" ai="center" bg="$background" p="$4">
      <H2>Aplicar Examen</H2>
      <Text color="$gray10" textAlign="center" mb="$4">
        Selecciona un examen. Ver detalles.
      </Text>
      <Text color="$gray10" textAlign="center" mb="$4">
        Selecciona un paciente para comenzar la evaluación.
      </Text>
    </YStack>
  );
}
