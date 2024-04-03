import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -5 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
        tabBarActiveTintColor: "lightgreen",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my_food"
        options={{
          title: "Inventory",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="fridge"
              size={24}
              color={color}
              style={{ marginBottom: -5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Donate",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="food-bank"
              size={28}
              color={color}
              style={{ marginBottom: -5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scanner",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="barcode" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
