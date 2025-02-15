import AppButton from "@/components/AppButton";
import { images } from "@/constants";
import useAuthStore from "@/stores/authStore";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const { access } = useAuthStore();

  if (access) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center items-center min-h-[90vh] px-4">
          <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain" />

          <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode="contain" />

          <View className="relative mt-5">
            <Text className="text-3xl text-center text-white font-bold">
              Discover Endless Possibilities with <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless exploration with Aora
          </Text>

          <AppButton
            text="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyle="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="transparent" style="light" />
    </SafeAreaView>
  );
};

export default Index;
