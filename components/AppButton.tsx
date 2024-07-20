import React from "react";
import { Pressable, Text, TouchableOpacity } from "react-native";

const AppButton = ({
  text,
  handlePress,
  containerStyle,
  textStyle,
  isLoading,
}: {
  text: string;
  handlePress: () => void;
  containerStyle?: string;
  isLoading?: boolean;
  textStyle?: string;
}) => {
  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
