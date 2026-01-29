import { Canvas, Group } from "@shopify/react-native-skia";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { DiagramEdge } from "./DiagramEdge";
import { DiagramNode } from "./DiagramNode";

import { useFont } from "@shopify/react-native-skia";
import { useCallback, useState } from "react";
import { scheduleOnRN } from "react-native-worklets";
import { Sheet, Spinner, YStack } from "tamagui";
import { Edge } from "../types/edge";
import { Node } from "../types/node";
import NodeDetails from "./NodeDetails";

interface Props {
  nodes: Node[];
  edges: Edge[];
}

export default function ExamDiagram({ nodes, edges }: Props) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const fontLabel = useFont(require("@/src/assets/fonts/Inter-Bold.ttf"), 18);
  const fontText = useFont(require("@/src/assets/fonts/Inter-Regular.ttf"), 16);

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

  const handleNodeSelect = useCallback((node: Node) => {
    setSelectedNode(node);
    setPopupVisible(true);
  }, []);

  // Gesto de Zoom
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const tapGesture = Gesture.Tap().onEnd((event) => {
    "worklet";

    const touchX = (event.x - translateX.value) / scale.value;
    const touchY = (event.y - translateY.value) / scale.value;

    const nodeHeight = 80;

    const hit = nodes.find((node) => {
      return (
        touchX >= node.position.x &&
        touchX <= node.position.x + node.measured.width &&
        touchY >= node.position.y &&
        touchY <= node.position.y + node.measured.height
      );
    });

    if (hit) {
      scheduleOnRN(handleNodeSelect, hit);
    } else {
      scheduleOnRN(setPopupVisible, false);
    }
  });

  const composed = Gesture.Exclusive(
    tapGesture,
    Gesture.Simultaneous(panGesture, pinchGesture),
  );

  const transform = useDerivedValue(() => [
    { translateX: translateX.value },
    { translateY: translateY.value },
    { scale: scale.value },
  ]);

  if (!fontLabel || !fontText) {
    return <Spinner />;
  }

  return (
    <YStack f={1}>
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

      {isPopupVisible && (
        <YStack
          pos="absolute"
          t={0}
          l={0}
          r={0}
          b={0}
          bg="rgba(0,0,0,0.3)"
          zi={99999}
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          onPress={() => setPopupVisible(false)}
        />
      )}

      <Sheet
        open={isPopupVisible}
        onOpenChange={setPopupVisible}
        snapPoints={[50]}
        dismissOnSnapToBottom
        animation="medium"
        zIndex={100000}
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Frame ai={"center"} jc={"center"}>
          <Sheet.Handle />
          {selectedNode && <NodeDetails node={selectedNode} />}
        </Sheet.Frame>
      </Sheet>
    </YStack>
  );
}
