import { icons } from "@/constants/icon";
import { Pressable, Text, TextInput, View } from "react-native";

const Search = icons.search;

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
  mutedIconColor = "#9CA3AF",
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  mutedIconColor?: string;
}) {
  return (
    <View className="flex-row items-center bg-foreground/5 rounded-2xl px-4 h-12 mb-5">
      <Search width={18} height={18} fill={mutedIconColor} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        className="flex-1 ml-3 h-full text-base text-foreground"
        textAlignVertical="center"
        style={{ paddingVertical: 0, includeFontPadding: false }}
        value={value}
        onChangeText={onChangeText}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText("")} hitSlop={8}>
          <Text className="text-gray-400 text-lg leading-none">×</Text>
        </Pressable>
      )}
    </View>
  );
}
