import { Group, Rect, Shadow, SkFont, Text } from "@shopify/react-native-skia";
import { Node } from "../types/node";

interface Props {
  node: Node;
  fontTitle: SkFont | null;
  fontBody: SkFont | null;
}

export const DiagramNode = ({ node, fontTitle, fontBody }: Props) => {
  const { type, position, data } = node;
  const width = 180;
  const height = 100;

  return (
    <Group transform={[{ translateX: position.x }, { translateY: position.y }]}>
      <Rect x={0} y={0} width={width} height={height} color="white">
        <Shadow dx={0} dy={2} blur={4} color="#00000020" />
      </Rect>

      {/* Tipo de Pregunta (Header) */}
      <Rect x={0} y={0} width={width} height={25} color="$blue5" />
      <Text
        x={10}
        y={17}
        text={type.toUpperCase()}
        font={fontTitle}
        color="#2b6cb0"
      />

      {/* Texto de la Pregunta */}
      <Text
        x={10}
        y={50}
        text={
          data && data.label
            ? (data.label as string).substring(0, 25) + "..."
            : ""
        }
        font={fontBody}
        color="#333"
      />
    </Group>
  );
};
