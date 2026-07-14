import { Text, View } from "react-native";

const STATUS_STYLES: Record<
  string,
  { badge: string; dot: string; text: string }
> = {
  Completed: {
    badge: "bg-success/10",
    dot: "bg-success",
    text: "text-success",
  },
  Pending: { badge: "bg-accent/10", dot: "bg-accent", text: "text-accent" },
};

const DEFAULT_STATUS_STYLE = {
  badge: "bg-primary/10",
  dot: "bg-primary",
  text: "text-primary",
};

export default function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLES[status] ?? DEFAULT_STATUS_STYLE;

  return (
    <View
      className={`flex-row items-center gap-1.5 py-1 px-2.5 rounded-full ${s.badge}`}
    >
      <View className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      <Text className={`text-xs font-manrope-semibold ${s.text}`}>
        {status}
      </Text>
    </View>
  );
}
