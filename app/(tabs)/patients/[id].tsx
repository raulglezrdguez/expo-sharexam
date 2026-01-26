import { AppliedExam, Patient } from "@/src/db/schemas";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useObject, useQuery, useRealm } from "@realm/react";
import dayjs from "dayjs";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BSON } from "realm";
import {
  Button,
  Card,
  H3,
  Input,
  Label,
  ScrollView,
  Separator,
  Text,
  XStack,
  YStack,
} from "tamagui";

export default function EditPatientScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const realm = useRealm();

  console.log(id);

  const patient = useObject(Patient, new BSON.ObjectId(id as string));

  const appliedExams = useQuery(AppliedExam)
    .filtered("patientId == $0", new BSON.ObjectId(id as string))
    .sorted("date", true);

  const [showPicker, setShowPicker] = useState(false);

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: patient?.name || "",
      identifier: patient?.identifier || "",
      birthdate: patient?.birthdate || new Date(),
      sex: patient?.sex || "M",
    },
  });

  const selectedDate = watch("birthdate");

  const onUpdate = (data: any) => {
    realm.write(() => {
      if (patient) {
        patient.name = data.name;
        patient.identifier = data.identifier;
        patient.birthdate = data.birthdate;
        patient.sex = data.sex;
      }
    });
    router.back();
  };

  if (!patient) return <Text>Paciente no encontrado</Text>;

  return (
    <ScrollView bg="$background">
      <YStack p="$4" gap="$4">
        <H3>Editar Perfil</H3>

        <YStack
          gap="$3"
          bg="$blue1"
          p="$4"
          br="$4"
          borderWidth={1}
          borderColor="$blue4"
        >
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <YStack>
                <Label>Nombre</Label>
                <Input value={value} onChangeText={onChange} bg="$background" />
              </YStack>
            )}
          />

          <XStack gap="$4">
            <YStack f={1}>
              <Label>ID / CI</Label>
              <Controller
                control={control}
                name="identifier"
                render={({ field: { onChange, value } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    bg="$background"
                  />
                )}
              />
            </YStack>
            <YStack f={1}>
              <Label>Sexo</Label>
              <XStack
                h={45}
                ai="center"
                jc="center"
                bg="$background"
                br="$2"
                borderWidth={1}
                borderColor="$borderColor"
              >
                <Button
                  f={1}
                  chromeless
                  bg={watch("sex") === "M" ? "$blue5" : "transparent"}
                  onPress={() => setValue("sex", "M")}
                >
                  M
                </Button>
                <Button
                  f={1}
                  chromeless
                  bg={watch("sex") === "F" ? "$blue5" : "transparent"}
                  onPress={() => setValue("sex", "F")}
                >
                  F
                </Button>
              </XStack>
            </YStack>
          </XStack>

          <Label>Fecha de Nacimiento</Label>
          <Button theme="alt1" onPress={() => setShowPicker(true)}>
            {dayjs(selectedDate).format("DD MMMM YYYY")}
          </Button>

          {showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              onChange={(e, date) => {
                setShowPicker(false);
                if (date) setValue("birthdate", date);
              }}
            />
          )}

          <Button
            icon={<FontAwesome name="save" size={24} />}
            theme="blue"
            mt="$2"
            onPress={handleSubmit(onUpdate)}
          >
            Actualizar Datos
          </Button>
        </YStack>

        <Separator />

        <XStack ai="center" gap="$2" mt="$2">
          <FontAwesome name="history" size={20} color="$blue10" />
          <H3 fontSize="$6">Historial de Exámenes</H3>
        </XStack>

        {appliedExams.length === 0 ? (
          <Text color="$gray10">Sin historial de aplicaciones.</Text>
        ) : (
          appliedExams.map((applied) => {
            return (
              <Card key={applied._id.toHexString()} p="$4" mb="$2" bordered>
                <XStack jc="space-between" ai="center">
                  <YStack>
                    <Text fontWeight="bold">Examen Realizado</Text>
                    <Text fontSize="$2" color="$gray10">
                      {dayjs(applied.date).format("DD/MM/YYYY HH:mm")}
                    </Text>
                  </YStack>
                  <Button size="$2">Resultados</Button>
                </XStack>
              </Card>
            );
          })
        )}
      </YStack>
    </ScrollView>
  );
}
