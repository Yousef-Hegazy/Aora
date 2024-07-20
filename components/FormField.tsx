import { icons } from "@/constants";
import React, { forwardRef, RefObject, useState } from "react";
import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";
import { Image, NativeSyntheticEvent, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> extends TextInputProps {
  title: string;
  otherStyles?: string;
  type?: "text" | "password";
  nextElement?: RefObject<TextInput>;
  control: Control<TFieldValues | any>;
  name: string;
  rules?: Omit<RegisterOptions<TFieldValues>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined;
}

const FormField = forwardRef<TextInput, FormFieldProps>(
  ({ title, otherStyles, type = "text", nextElement, name, control, rules, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleNextElement = (e: NativeSyntheticEvent<any>) => {
      if (nextElement) {
        nextElement.current?.focus();
      }
    };

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
            <View
              className={`w-full h-16 px-4 bg-black-100 rounded-2xl  items-center border-2 border-black-200 flex-row focus:border-secondary ${
                fieldState.error ? "border-red-600" : ""
              }`}
            >
              <TextInput
                ref={ref}
                {...props}
                value={field.value}
                onChangeText={(e) => field.onChange(e)}
                onBlur={field.onBlur}
                className="flex-1 text-white font-psemibold text-base py-2"
                placeholder={props.placeholder || title}
                placeholderTextColor="#7b7b8b"
                secureTextEntry={type === "password" && !showPassword}
                returnKeyType={nextElement ? "next" : props.returnKeyType || "done"}
                onSubmitEditing={(e) => {
                  handleNextElement(e);
                  props.onSubmitEditing?.(e);
                }}
              />

              {type === "password" && (
                <TouchableOpacity activeOpacity={1} onPress={(e) => setShowPassword((prev) => !prev)} className="p-2">
                  <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain" />
                </TouchableOpacity>
              )}
            </View>

            {fieldState.error?.message && (
              <Text className="text-red-600 text-sm font-pmedium">{fieldState.error.message}</Text>
            )}
          </View>
        )}
      />
    );
  }
);

export default FormField;
