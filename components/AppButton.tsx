import { rippleColor } from "@/constants/Colors";
import React from "react";
import { Pressable, Text, View } from "react-native";

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
    <View
      className={`bg-secondary rounded-xl overflow-hidden ${containerStyle} ${isLoading ? "opacity-50" : ""}`}
      // activeOpacity={0.7}
      // background={TouchableNativeFeedback.Ripple("#fff", false)}
    >
      <Pressable
        className="w-full min-h-[62px] justify-center items-center"
        onPress={handlePress}
        disabled={isLoading}
        android_ripple={{ color: rippleColor, borderless: false, foreground: true }}
      >
        <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default AppButton;
