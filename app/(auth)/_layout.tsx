import ToastComponent from "@/components/ToastComponent";
import { initializeSystemUiBg } from "@/helpers/SystemBgInitializer";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";

const AuthLayout = () => {
  useEffect(() => {
    initializeSystemUiBg();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#161622" style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
      </Stack>
      <ToastComponent />
    </>
  );
};

export default AuthLayout;
