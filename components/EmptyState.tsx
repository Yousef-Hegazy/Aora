import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { images } from "@/constants";
import AppButton from "./AppButton";
import { Link, router } from "expo-router";

const EmptyState = ({
  title,
  subtitle,
  link = false,
  linkText = "Add",
  href,
}: {
  title: string;
  subtitle?: string;
  link?: boolean;
  linkText?: string;
  href?: string;
}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="w-[270px] h-[215px]" resizeMode="contain" />
      {subtitle && <Text className="test-xl text-center font-psemibold text-white mt-2">{title}</Text>}
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

      {link && <AppButton text={linkText} handlePress={() => router.push(href || "")} containerStyle="w-full my-5" />}
    </View>
  );
};

export default EmptyState;
