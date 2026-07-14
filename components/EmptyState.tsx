import { Text, View } from "react-native";

export default function EmptyState({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <View className="mt-16 items-center gap-3">
      <View className="w-16 h-16 rounded-full bg-foreground/5 items-center justify-center">
        {icon}
      </View>
      <Text className="text-gray-400 font-manrope-bold text-base">{title}</Text>
      {subtitle ? (
        <Text className="text-gray-400 font-manrope-medium text-xs">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
