import { Pressable, Text, View } from "react-native";

type HeaderAction = {
  icon: React.ReactNode;
  onPress?: () => void;
  showDot?: boolean;
};

export default function ScreenHeader({
  title,
  subtitle,
  actions = [],
}: {
  title: string;
  subtitle?: string;
  actions?: HeaderAction[];
}) {
  return (
    <View className="flex-row items-center justify-between mb-5">
      <View>
        <Text className="text-3xl font-manrope-extrabold text-foreground">
          {title}
        </Text>
        {subtitle ? (
          <Text className="text-sm font-manrope-medium text-gray-400 mt-0.5">
            {subtitle}
          </Text>
        ) : null}
      </View>

      {actions.length > 0 && (
        <View className="flex-row items-center gap-2">
          {actions.map((action, i) => (
            <Pressable
              key={i}
              onPress={action.onPress}
              className="w-10 h-10 rounded-full bg-foreground/5 items-center justify-center"
            >
              {action.icon}
              {action.showDot && (
                <View className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent" />
              )}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
