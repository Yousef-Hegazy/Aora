import { icons } from "@/constants";
import { rippleColor } from "@/constants/Colors";
import { Video } from "@/models/videoModels";
import { Video as ExpoVideo, ResizeMode } from "expo-av";
import React, { useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

const VideoCard = ({ video }: { video: Video }) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image source={{ uri: video.user.avatar }} className="w-full h-full rounded-lg" resizeMode="cover" />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text numberOfLines={1} className="text-white font-psemibold text-sm">
              {video.title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>
              {video.user.username}
            </Text>
          </View>
        </View>

        <View className="rounded-full overflow-hidden">
          <Pressable
            className="p-2"
            android_ripple={{ foreground: true, borderless: false, color: rippleColor }}
            onPress={() => {}}
          >
            <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
          </Pressable>
        </View>
      </View>

      {play ? (
        <ExpoVideo
          useNativeControls
          shouldPlay
          source={{ uri: video.url }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image source={{ uri: video.thumbnail }} className="w-full h-full rounded-xl mt-3" resizeMode="cover" />
          <Image source={icons.play} className="absolute w-12 h-12" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
