import { Canvas, Group } from "@shopify/react-native-skia";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { DiagramEdge } from "./DiagramEdge";
import { DiagramNode } from "./DiagramNode";

import { useFont } from "@shopify/react-native-skia";
import { Spinner } from "tamagui";
import { Edge } from "../types/edge";
import { Node } from "../types/node";

interface Props {
  nodes: Node[];
  edges: Edge[];
}

export default function ExamDiagram({ nodes, edges }: Props) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const fontLabel = useFont(require("@/src/assets/fonts/Inter-Bold.ttf"), 12);
  const fontText = useFont(require("@/src/assets/fonts/Inter-Regular.ttf"), 14);

  // Gesto de Pan (Mover el mapa)
  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((e) => {
      translateX.value = startX.value + e.translationX;
      translateY.value = startY.value + e.translationY;
    });

  // Gesto de Zoom
  const pinchGesture = Gesture.Pinch().onUpdate((e) => {
    scale.value = e.scale;
  });

  const composed = Gesture.Simultaneous(panGesture, pinchGesture);

  const transform = useDerivedValue(() => [
    { translateX: translateX.value },
    { translateY: translateY.value },
    { scale: scale.value },
  ]);

  if (!fontLabel || !fontText) {
    return <Spinner />;
  }

  return (
    <GestureDetector gesture={composed}>
      <Canvas style={{ flex: 1 /*backgroundColor: "#262626" */ }}>
        <Group transform={transform}>
          {edges.map((edge) => {
            const src = nodes.find((n) => n.id === edge.source);
            const tgt = nodes.find((n) => n.id === edge.target);

            if (src && tgt) {
              return (
                <DiagramEdge
                  key={edge.id}
                  source={src}
                  target={tgt}
                  label={edge?.data?.condition || ""}
                  font={fontLabel}
                />
              );
            } else return null;
          })}

          {nodes.map((node) => (
            <DiagramNode
              key={node.id}
              node={node}
              fontTitle={fontLabel}
              fontBody={fontText}
            />
          ))}
        </Group>
      </Canvas>
    </GestureDetector>
  );
}
