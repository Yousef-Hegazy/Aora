import AppButton from "@/components/AppButton";
import { icons } from "@/constants";
import useAuthStore from "@/state/authStore";
import { router, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
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
      <Text style={{ color }} className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { refresh, access, refreshAuth } = useAuthStore();

  useEffect(() => {
    if (refresh) {
      router.replace("/home");
    } else {
      router.replace("/");
    }
  }, [refresh]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshAuth();
    setRefreshing(false);
  };

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

      {!access && (
        <View className="fixed bottom-0 left-0 right-0 px-2 py-4 bg-white flex-col gap-4 justify-between items-center z-50">
          <Text className="text-base font-pregular">Your session has expired please refresh your session</Text>
          <AppButton text="Ok" handlePress={handleRefresh} isLoading={refreshing} containerStyle="w-52" />
        </View>
      )}
    </>
  );
};

export default TabsLayout;
