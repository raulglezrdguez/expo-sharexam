import FontAwesome from "@expo/vector-icons/FontAwesome";
import { H4, ScrollView, Text, XStack, YStack } from "tamagui";
import { Node } from "../types/node";

interface Props {
  node: Node;
}

const NodeDetails = ({ node }: Props) => {
  const type = node.type;
  const data = node.data;

  console.log(type);

  const getIcon = () => {
    switch (type) {
      case "question":
        return <FontAwesome name="question" size={20} color="#ababab" />;
      case "http-request":
        return <FontAwesome name="database" size={20} color="#ababab" />;
      case "gemini":
        return <FontAwesome name="gift" size={20} color="#ababab" />;
      default:
        return <FontAwesome name="info" size={20} color="#ababab" />;
    }
  };

  return (
    <ScrollView p="$4" gap="$4">
      <YStack gap="$2" bg="$gray2" p="$3" br="$4">
        <Text fontSize="$3" color="$gray10">
          {node.id}
        </Text>
      </YStack>

      {type === "question" && (
        <YStack gap="$3" mb="$8">
          <XStack ai="center" gap="$2">
            <FontAwesome name="question" size={30} color="#ababab" />
            <H4>Pregunta</H4>
          </XStack>

          <YStack mt="$2">
            <Text fontSize="$5">{data?.question || "Sin texto"}</Text>
          </YStack>

          <XStack gap="$2">
            <Text fontWeight="bold">Tipo de respuesta:</Text>
            <Text theme="blue" fontWeight="bold">
              {data?.questionType === "number"
                ? "Número"
                : data?.questionType === "text"
                  ? "Cadena"
                  : "Lista"}
            </Text>
          </XStack>

          {data?.questionType === "select" && data.options && (
            <YStack gap="$2">
              <Text fontWeight="bold">Opciones:</Text>
              {data.options.map((opt: any, i: number) => (
                <XStack
                  key={i}
                  ai="center"
                  gap="$2"
                  p="$2"
                  bw={1}
                  bc="$borderColor"
                  br="$2"
                >
                  <FontAwesome name="arrow-right" size={16} color="$blue10" />
                  <Text>{opt.label || opt.value}</Text>
                </XStack>
              ))}
            </YStack>
          )}
        </YStack>
      )}

      {type === "gemini" && (
        <YStack gap="$3" mb="$8">
          <XStack ai="center" gap="$2">
            <FontAwesome name="gift" size={30} color="#ababab" />
            <H4>Gemini</H4>
          </XStack>

          <YStack>
            <Text fontWeight="bold">Prompt:</Text>
            <Text fontSize="$5">{data?.prompt || "Sin prompt"}</Text>
          </YStack>

          <YStack>
            <Text fontWeight="bold">Modelo:</Text>
            <Text fontSize="$5">{data?.model || "Sin modelos"}</Text>
          </YStack>

          <YStack>
            <Text fontWeight="bold">Temperatura:</Text>
            <Text fontSize="$5">{data?.temperature || "Sin temperatura"}</Text>
          </YStack>
        </YStack>
      )}

      {type === "gemini-info" && (
        <YStack gap="$3" mb="$8">
          <XStack ai="center" gap="$2">
            <FontAwesome name="info" size={30} color="#ababab" />
            <H4>Info de Gemini</H4>
          </XStack>

          <YStack>
            <Text fontWeight="bold">Información de Gemini:</Text>
            <Text fontSize="$5">
              Token para acceder a los modelos de Gemini.
            </Text>
          </YStack>
        </YStack>
      )}

      {type === "http-request" && (
        <YStack gap="$3" mb="$8">
          <XStack ai="center" gap="$2">
            <FontAwesome name="database" size={30} color="#ababab" />
            <H4>HTTP</H4>
          </XStack>

          <YStack>
            <Text fontWeight="bold">Endpoint:</Text>
            <Text fontSize="$5">{data?.endpoint || ""}</Text>
          </YStack>

          <YStack>
            <Text fontWeight="bold">Método:</Text>
            <Text fontSize="$5">{data?.method || ""}</Text>
          </YStack>

          <YStack>
            <Text fontWeight="bold">Tipo de respuesta:</Text>
            <Text fontSize="$5">{data?.responseType || ""}</Text>
          </YStack>
        </YStack>
      )}

      {["input", "output"].includes(type) && (
        <YStack gap="$3" mb="$8">
          <YStack>
            <Text fontWeight="bold">{type}</Text>
          </YStack>
        </YStack>
      )}
    </ScrollView>
  );
};

export default NodeDetails;
