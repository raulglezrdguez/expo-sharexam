import { Group, Rect, Shadow, SkFont, Text } from "@shopify/react-native-skia";
import { Node } from "../types/node";

interface Props {
  node: Node;
  fontTitle: SkFont | null;
  fontBody: SkFont | null;
}

export const DiagramNode = ({ node, fontTitle, fontBody }: Props) => {
  const { type, position, data, measured } = node;
  const width = measured.width;
  const height = 80;
  const bgColor = "#898989";
  const headerColor = "#f0f0f0";

  if (node.type === "input") {
    return (
      <Group
        transform={[{ translateX: position.x }, { translateY: position.y }]}
      >
        <Rect x={0} y={0} width={width} height={60} color={bgColor}>
          <Shadow dx={0} dy={2} blur={4} color="#00000020" />
        </Rect>

        <Rect x={0} y={0} width={width} height={25} color="#059669" />
        <Text
          x={10}
          y={17}
          text={"INPUT"}
          font={fontTitle}
          color={headerColor}
        />

        <Text
          x={10}
          y={50}
          text={data?.label ? data.label.substring(0, 25) + "..." : ""}
          font={fontBody}
          color="#333"
        />
      </Group>
    );
  }

  if (node.type === "question") {
    return (
      <Group
        transform={[{ translateX: position.x }, { translateY: position.y }]}
      >
        <Rect x={0} y={0} width={width} height={60} color={bgColor}>
          <Shadow dx={0} dy={2} blur={4} color="#00000020" />
        </Rect>

        <Rect x={0} y={0} width={width} height={25} color="#ea580c" />
        <Text
          x={10}
          y={17}
          text={`Question: ${node.id}`}
          font={fontTitle}
          color={headerColor}
        />

        <Text
          x={10}
          y={50}
          text={data?.question ? data.question.substring(0, 25) + "..." : ""}
          font={fontBody}
          color="#333"
        />
      </Group>
    );
  }

  if (node.type === "http-request") {
    return (
      <Group
        transform={[{ translateX: position.x }, { translateY: position.y }]}
      >
        <Rect x={0} y={0} width={width} height={60} color={bgColor}>
          <Shadow dx={0} dy={2} blur={4} color="#00000020" />
        </Rect>

        <Rect x={0} y={0} width={width} height={25} color="#8b5cf6" />
        <Text
          x={10}
          y={17}
          text={`HTTP request: ${node.id}`}
          font={fontTitle}
          color={headerColor}
        />

        <Text
          x={10}
          y={50}
          text={data?.endpoint ? data.endpoint.substring(0, 25) + "..." : ""}
          font={fontBody}
          color="#333"
        />
      </Group>
    );
  }

  if (node.type === "gemini-info") {
    return (
      <Group
        transform={[{ translateX: position.x }, { translateY: position.y }]}
      >
        <Rect x={0} y={0} width={width} height={60} color={bgColor}>
          <Shadow dx={0} dy={2} blur={4} color="#00000020" />
        </Rect>

        <Rect x={0} y={0} width={width} height={25} color="#3b82f6" />
        <Text
          x={10}
          y={17}
          text={`Gemini info`}
          font={fontTitle}
          color={headerColor}
        />

        <Text
          x={10}
          y={50}
          text={"Access token"}
          font={fontBody}
          color="#333"
        />
      </Group>
    );
  }

  if (node.type === "gemini") {
    return (
      <Group
        transform={[{ translateX: position.x }, { translateY: position.y }]}
      >
        <Rect x={0} y={0} width={width} height={60} color={bgColor}>
          <Shadow dx={0} dy={2} blur={4} color="#00000020" />
        </Rect>

        <Rect x={0} y={0} width={width} height={25} color="#ef4444" />
        <Text
          x={10}
          y={17}
          text={`Gemini: ${node.id}`}
          font={fontTitle}
          color={headerColor}
        />

        <Text
          x={10}
          y={50}
          text={data?.prompt ? data?.prompt.substring(0, 25) + "..." : ""}
          font={fontBody}
          color="#333"
        />
      </Group>
    );
  }

  if (node.type === "output") {
    return (
      <Group
        transform={[{ translateX: position.x }, { translateY: position.y }]}
      >
        <Rect x={0} y={0} width={width} height={60} color={bgColor}>
          <Shadow dx={0} dy={2} blur={4} color="#00000020" />
        </Rect>

        <Rect x={0} y={0} width={width} height={25} color="#52525b" />
        <Text
          x={10}
          y={17}
          text={"OUTPUT"}
          font={fontTitle}
          color={headerColor}
        />

        <Text
          x={10}
          y={50}
          text={data?.label ? data.label.substring(0, 25) + "..." : ""}
          font={fontBody}
          color="#333"
        />
      </Group>
    );
  }

  return (
    <Group transform={[{ translateX: position.x }, { translateY: position.y }]}>
      <Rect x={0} y={0} width={width} height={height} color={bgColor}>
        <Shadow dx={0} dy={2} blur={4} color="#00000020" />
      </Rect>

      {/* Tipo de Nodo (Header) */}
      <Rect x={0} y={0} width={width} height={25} color="$blue5" />
      <Text
        x={10}
        y={17}
        text={type.toUpperCase()}
        font={fontTitle}
        color={headerColor}
      />

      {/* Texto de la Pregunta */}
      <Text
        x={10}
        y={50}
        text={data?.label ? data.label.substring(0, 25) + "..." : ""}
        font={fontBody}
        color="#333"
      />
    </Group>
  );
};
