import { icons } from "@/constants/icon";
import { Pressable, Text, View } from "react-native";

const ChevronRight = icons.chevronRight;

export default function MenuItem({
  icon,
  title,
  tint = "bg-foreground/5",
  danger = false,
  showChevron = true,
  isLast = false,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  tint?: string;
  danger?: boolean;
  showChevron?: boolean;
  isLast?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-between px-4 py-3.5 active:bg-foreground/5 ${
        isLast ? "" : "border-b border-foreground/5"
      }`}
    >
      <View className="flex-row items-center gap-3">
        <View
          className={`w-9 h-9 rounded-full items-center justify-center ${tint}`}
        >
          {icon}
        </View>
        <Text
          className={`text-[15px] font-manrope-medium ${
            danger ? "text-red-500" : "text-foreground"
          }`}
        >
          {title}
        </Text>
      </View>
      {showChevron && <ChevronRight width={16} height={16} fill="#9CA3AF" />}
    </Pressable>
  );
}
