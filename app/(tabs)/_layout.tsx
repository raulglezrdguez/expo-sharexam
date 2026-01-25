import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useTheme } from "tamagui";

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      initialRouteName="patients/index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.blue10.get(),
        tabBarStyle: {
          backgroundColor: theme.background.get(),
          borderTopWidth: 1,
          borderTopColor: theme.borderColor.get(),
        },
      }}
    >
      <Tabs.Screen
        name="patients/index"
        options={{
          title: "Pacientes",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-md" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="patients/new-patient"
        options={{
          href: null,
          title: "Añadir Paciente",
        }}
      />
      <Tabs.Screen
        name="patients/[id]"
        options={{
          href: null,
          title: "Editar Paciente",
        }}
      />
      <Tabs.Screen
        name="exams"
        options={{
          title: "Exámenes",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="clipboard" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Estadísticas",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bar-chart" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
