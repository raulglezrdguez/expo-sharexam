import { H2, Text, YStack } from "tamagui";

export default function StatsScreen() {
  return (
    <YStack f={1} jc="center" ai="center" bg="$background">
      <H2>Estadísticas</H2>
      <Text color="$gray10">Resultados y analítica</Text>
    </YStack>
  );
}
