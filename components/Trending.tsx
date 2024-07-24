import { icons } from "@/constants";
import { Video } from "@/models/videoModels";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ImageStyle,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  ViewToken,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Video as ExpoVideo, ResizeMode, AVPlaybackStatusSuccess } from "expo-av";

const zoomIn: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
  from: {
    transform: [{ scale: 0.9 }],
  },
  to: {
    transform: [{ scale: 1 }],
  },
};

const zoomOut: Animatable.CustomAnimation<TextStyle & ViewStyle & ImageStyle> = {
  from: {
    transform: [{ scale: 1 }],
  },
  to: {
    transform: [{ scale: 0.9 }],
  },
};

const TrendingItem = ({ item, isActive, isFirst }: { item: Video; isActive: boolean; isFirst: boolean }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View className={`mr-5 ${isFirst ? "ml-5" : ""}`} animation={isActive ? zoomIn : zoomOut} duration={500}>
      {play ? (
        <ExpoVideo
          useNativeControls
          shouldPlay
          source={{ uri: item.url }}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
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
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image source={icons.play} className="absolute w-12 h-12" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: { posts: Video[] }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChange = (info: { viewableItems: ViewToken<Video>[]; changed: ViewToken<Video>[] }) => {
    setActiveItem(info.viewableItems[0]?.item || activeItem);
  };

  return (
    <FlatList
      horizontal={true}
      data={posts}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={(info) => viewableItemsChange(info)}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <TrendingItem isFirst={index === 0} item={item} isActive={activeItem.id === item.id} />
      )}
    />
  );
};

export default Trending;
