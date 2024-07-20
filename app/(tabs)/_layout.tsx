import ToastComponent from "@/components/ToastComponent";
import { icons } from "@/constants";
import { initializeSystemUiBg } from "@/helpers/SystemBgInitializer";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

const TabIcon = ({
  icon,
  color,
  name,
  focused,
  size,
}: {
  icon: ImageSourcePropType;
  color: string;
  focused: boolean;
  name: string;
  size: number;
}) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
      <Text style={{ color: color }} className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  useEffect(() => {
    initializeSystemUiBg();
  }, []);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: "#ffa001",
          tabBarInactiveTintColor: "#cdcde0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused, size }) => (
              <TabIcon icon={icons.home} color={color} focused={focused} size={size} name="Home" />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: "Bookmark",
            tabBarIcon: ({ color, focused, size }) => (
              <TabIcon icon={icons.bookmark} color={color} focused={focused} size={size} name="Bookmark" />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon: ({ color, focused, size }) => (
              <TabIcon icon={icons.plus} color={color} focused={focused} size={size} name="Create" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused, size }) => (
              <TabIcon icon={icons.profile} color={color} focused={focused} size={size} name="Profile" />
            ),
          }}
        />
      </Tabs>
      <ToastComponent />
    </>
  );
};

export default TabsLayout;
