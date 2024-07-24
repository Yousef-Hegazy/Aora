import { icons } from "@/constants";
import React from "react";
import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";
import { Image, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> extends TextInputProps {
  otherStyles?: string;
  control: Control<TFieldValues | any>;
  name: string;
  rules?: Omit<RegisterOptions<TFieldValues>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined;
}

const SearchInput = ({ otherStyles, name, control, ...props }: FormFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <View className="max-w-full min-h-14 px-4 bg-black-100 rounded-2xl py-0 items-center border-2 border-black-200 flex-row focus:border-secondary mx-4">
          <TextInput
            {...props}
            value={field.value}
            onChangeText={(e) => field.onChange(e)}
            onBlur={field.onBlur}
            textAlignVertical="center"
            className="flex-1 text-white font-pregular text-base py-3 mt-0"
            style={{ marginTop: 0 }}
            placeholder="Search for a video topic"
            placeholderTextColor="#7b7b8b"
            returnKeyType="search"
            onSubmitEditing={(e) => {
              e.preventDefault();
              props.onSubmitEditing?.(e);
            }}
          />

          <TouchableOpacity activeOpacity={0.7}>
            <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default SearchInput;
