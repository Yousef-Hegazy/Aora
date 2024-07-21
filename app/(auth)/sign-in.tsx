import authService from "@/api/services/authService";
import AppButton from "@/components/AppButton";
import FormField from "@/components/FormField";
import { images } from "@/constants";
import useAuthStore from "@/state/authStore";
import { AxiosError } from "axios";
import { Link, router } from "expo-router";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Image, ScrollView, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface FormFields {
  email: string;
  password: string;
}

const SignIn = () => {
  const { setAuth } = useAuthStore();
  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
  } = useForm<FormFields>();

  const passwordRef = useRef<TextInput>(null);

  const submit = async (data: FormFields) => {
    try {
      const res = await authService.login(data);
      // console.log(res.data);

      setAuth(res.data);

      router.replace("/home");
    } catch (error) {
      if (error instanceof AxiosError) {
        // console.log(error.config);
        Toast.show({
          type: "error",
          text1: error.response?.data || error.code || "Oops! Something went wrong",
          text1Style: { fontFamily: "Poppins-Regular", fontSize: 16 },
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Oops! Something went wrong",
          text1Style: { fontFamily: "Poppins-Regular", fontSize: 16 },
        });
      }
      setAuth(null);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="w-full justify-center items-start min-h-[90vh] px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">Log in to Aora</Text>

          <FormField
            name="email"
            title="Email"
            otherStyles="mt-7"
            keyboardType="email-address"
            nextElement={passwordRef}
            control={control}
            rules={{ required: "Email is required" }}
          />

          <FormField
            title="Password"
            control={control}
            name="password"
            type="password"
            ref={passwordRef}
            otherStyles="mt-7"
            rules={{ required: "Password is required" }}
            onSubmitEditing={handleSubmit(submit)}
          />

          <AppButton
            text="Sign In"
            handlePress={handleSubmit(submit)}
            containerStyle="mt-7 w-full"
            isLoading={isSubmitting}
          />

          <View className="w-full justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
