import { Canvas, Group } from "@shopify/react-native-skia";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import { DiagramEdge } from "./DiagramEdge";
import { DiagramNode } from "./DiagramNode";

import { useFont } from "@shopify/react-native-skia";
import { Edge } from "../types/edge";
import { Node } from "../types/node";

const fontLabel = useFont(require("@/src/assets/fonts/Inter-Bold.ttf"), 12);
const fontText = useFont(require("@/src/assets/fonts/Inter-Regular.ttf"), 14);

interface Props {
  nodes: Node[];
  edges: Edge[];
}

export default function ExamDiagram({ nodes, edges }: Props) {
  const offset = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const start = useSharedValue({ x: 0, y: 0 });

  // Gesto de Pan (Mover el mapa)
  const panGesture = Gesture.Pan()
    .onStart(() => {
      start.value = { x: offset.value.x, y: offset.value.y };
    })
    .onUpdate((e) => {
      offset.value = {
        x: start.value.x + e.translationX,
        y: start.value.y + e.translationY,
      };
    });

  // Gesto de Zoom
  const pinchGesture = Gesture.Pinch().onUpdate((e) => {
    scale.value = e.scale;
  });

  const composed = Gesture.Simultaneous(panGesture, pinchGesture);

  return (
    <GestureDetector gesture={composed}>
      <Canvas style={{ flex: 1, backgroundColor: "#f7fafc" }}>
        <Group
          transform={[
            { translateX: offset.value.x },
            { translateY: offset.value.y },
            { scale: scale.value },
          ]}
        >
          {/* 1. Dibujar Edges primero para que queden debajo */}
          {edges.map((edge) => {
            const src = nodes.find((n) => n.id === edge.source);
            const tgt = nodes.find((n) => n.id === edge.target);

            if (src && tgt) {
              return (
                <DiagramEdge
                  key={edge.id}
                  source={src}
                  target={tgt}
                  label={
                    edge && edge.data ? (edge.data.condition as string) : ""
                  }
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
