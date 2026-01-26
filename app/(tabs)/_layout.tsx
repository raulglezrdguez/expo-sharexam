import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "tamagui";

export default function TabsLayout() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      initialRouteName="patients"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.blue10.get(),
        tabBarStyle: {
          backgroundColor: theme.background.get(),
          borderTopWidth: 1,
          borderTopColor: theme.borderColor.get(),
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        },
      }}
    >
      <Tabs.Screen
        name="patients"
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
