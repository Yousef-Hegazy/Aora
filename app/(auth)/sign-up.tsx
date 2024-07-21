import authService from "@/api/services/authService";
import AppButton from "@/components/AppButton";
import FormField from "@/components/FormField";
import { images } from "@/constants";
import useAuthStore from "@/state/auth";
import { AxiosError } from "axios";
import { Link, router } from "expo-router";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Image, ScrollView, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface FormFields {
  username: string;
  email: string;
  password: string;
  passConfirm: string;
}

const SignUp = () => {
  const { setAuth } = useAuthStore();
  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
  } = useForm<FormFields>();

  const passwordRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const submit = async (data: FormFields) => {
    try {
      const res = await authService.register({
        email: data.email,
        password: data.password,
        username: data.username,
      });

      setAuth(res.data);

      router.replace("/home");
    } catch (error) {
      if (error instanceof AxiosError) {
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
          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">Sign Up to Aora</Text>
          <FormField
            title="Username"
            otherStyles="mt-4"
            keyboardType="default"
            nextElement={emailRef}
            control={control}
            name="username"
            rules={{ required: "Username is required" }}
          />

          <FormField
            ref={emailRef}
            title="Email"
            otherStyles="mt-4"
            keyboardType="email-address"
            nextElement={passwordRef}
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
          />

          <FormField
            ref={passwordRef}
            title="Password"
            type="password"
            otherStyles="mt-4"
            nextElement={confirmPasswordRef}
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
          />

          <FormField
            ref={confirmPasswordRef}
            title="Confirm Password"
            type="password"
            otherStyles="mt-4"
            control={control}
            name="passConfirm"
            rules={{
              required: "Password confirmation is required",
              validate: (value, formValues) => value === formValues.password || "Passwords do not match",
            }}
            onSubmitEditing={handleSubmit(submit)}
          />

          <AppButton
            text="Sign Up"
            handlePress={handleSubmit(submit)}
            containerStyle="mt-4 w-full"
            isLoading={isSubmitting}
          />

          <View className="w-full justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Already have an account?</Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
