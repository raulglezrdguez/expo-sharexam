import { Patient } from "@/src/db/schemas";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRealm } from "@realm/react";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Platform } from "react-native";
import { Realm } from "realm";
import { Button, H3, Input, Label, Text, XStack, YStack } from "tamagui";
import * as z from "zod";

const schema = z.object({
  identifier: z.string().min(1, "El identificador es requerido"),
  name: z.string().min(3, "Nombre demasiado corto"),
  birthdate: z.date({ error: "Fecha requerida" }),
  sex: z.enum(["M", "F"]),
});

type FormData = z.infer<typeof schema>;

export default function NewPatientScreen() {
  const realm = useRealm();
  const router = useRouter();
  const [showPicker, setShowPicker] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      sex: "M",
      birthdate: dayjs().subtract(20, "year").toDate(),
    },
  });

  const selectedDate = watch("birthdate");

  const onSubmit = (data: FormData) => {
    realm.write(() => {
      realm.create(Patient, {
        _id: new Realm.BSON.ObjectId(),
        identifier: data.identifier,
        name: data.name,
        birthdate: data.birthdate,
        sex: data.sex,
      });
    });
    router.back();
  };

  return (
    <YStack f={1} p="$4" gap="$4" bg="$background">
      <H3>Nuevo Paciente</H3>

      <YStack gap="$2">
        <Label>Nombre Completo</Label>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Ej. Juan Pérez"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name && <Text color="$red10">{errors.name.message}</Text>}

        <Label>Identificador (DNI/CI)</Label>
        <Controller
          control={control}
          name="identifier"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="12345678912"
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <YStack>
          <Label>Fecha de Nacimiento</Label>
          <XStack gap="$2" ai="center">
            <Button
              f={1}
              iconAfter={<FontAwesome name="calendar" size={24} />}
              onPress={() => setShowPicker(true)}
              justifyContent="flex-start"
              variant="outlined"
            >
              {dayjs(selectedDate).format("DD/MM/YYYY")}
            </Button>
          </XStack>
          {showPicker && (
            <DateTimePicker
              value={selectedDate || dayjs().subtract(20, "year").toDate()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              maximumDate={new Date()}
              onChange={(event, date) => {
                setShowPicker(Platform.OS === "ios");
                if (date) setValue("birthdate", date);
              }}
            />
          )}
        </YStack>

        <YStack>
          <Label>Sexo</Label>
          <Controller
            control={control}
            name="sex"
            render={({ field: { onChange, value } }) => (
              <XStack gap="$4">
                <Button
                  f={1}
                  theme={value === "M" ? "blue" : "alt1"}
                  onPress={() => onChange("M")}
                >
                  Masculino
                </Button>
                <Button
                  f={1}
                  theme={value === "F" ? "blue" : "alt1"}
                  onPress={() => onChange("F")}
                >
                  Femenino
                </Button>
              </XStack>
            )}
          />
        </YStack>
      </YStack>

      <Button mt="$6" theme="blue" onPress={handleSubmit(onSubmit)}>
        Guardar Paciente
      </Button>
    </YStack>
  );
}
