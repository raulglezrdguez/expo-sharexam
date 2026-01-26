import { Group, Path, SkFont, Text } from "@shopify/react-native-skia";
import { Node } from "../types/node";

interface Props {
  source: Node;
  target: Node;
  label: string | "";
  font: SkFont | null;
}
export const DiagramEdge = ({ source, target, label, font }: Props) => {
  // Calculamos el camino (Path) entre los dos puntos
  const path = `M ${source.position.x + 180} ${source.position.y + 50} 
                C ${source.position.x + 230} ${source.position.y + 50}, 
                  ${target.position.x - 50} ${target.position.y + 50}, 
                  ${target.position.x} ${target.position.y + 50}`;

  return (
    <Group>
      <Path path={path} color="#cbd5e0" style="stroke" strokeWidth={2} />
      {/* Texto de la condición en el centro del edge */}
      <Text
        x={(source.position.x + target.position.x) / 2 + 80}
        y={(source.position.y + target.position.y) / 2 + 45}
        text={label}
        font={font}
        color="#718096"
      />
    </Group>
  );
};
