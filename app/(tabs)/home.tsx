import videosService from "@/api/services/videosService";
import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import VideoCard from "@/components/VideoCard";
import { images } from "@/constants";
import useRequest from "@/hooks/useRequest";
import useAuthStore from "@/stores/authStore";
import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Image, RefreshControl, SafeAreaView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

const Home = () => {
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);
  const { control } = useForm();

  const { result, isLoading, error, refetch } = useRequest({
    reqFn: videosService.getAll,
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: err.message,
      });
    },
  });

  const {
    result: latestRes,
    isLoading: loadingLatest,
    error: latestErr,
  } = useRequest({
    reqFn: videosService.getLatest,
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: err.message,
      });
    },
  });

  // Fetch latest posts here

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlashList
        data={result?.data || []}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={() => (
          <EmptyState
            link
            title="No videos found"
            subtitle="Be the first one to upload a video"
            linkText="Create a video"
            href="/create"
          />
        )}
        estimatedItemSize={60}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 py-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6 px-4">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome back,</Text>
                <Text className="test-2xl font-psemibold text-white">{user?.username}.</Text>
              </View>

              <View className="mt-1.5">
                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
              </View>
            </View>

            <SearchInput control={control} name="query" />

            <View className="w-full pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>

              <Trending posts={latestRes?.data || []} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
