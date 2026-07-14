import { Text, View } from "react-native";

type IconComponent = React.ComponentType<{
  width?: number;
  height?: number;
  fill?: string;
}>;

export type Stat = {
  label: string;
  value: string;
  sub: string;
  valueClass?: string;
  icon: IconComponent;
  iconBg?: string;
  iconColor: string;
};

export default function StatCard({
  label,
  value,
  sub,
  valueClass = "text-foreground",
  icon: Icon,
  iconBg = "bg-foreground/10",
  iconColor,
}: Stat) {
  return (
    <View className="w-[48%] mb-4 bg-foreground/[0.03] rounded-2xl p-4 border border-foreground/5">
      <View
        className={`w-9 h-9 rounded-full items-center justify-center mb-3 ${iconBg}`}
      >
        <Icon width={16} height={16} fill={iconColor} />
      </View>
      <Text className="text-xs font-manrope-medium text-gray-400">{label}</Text>
      <Text className={`mt-1 text-xl font-manrope-extrabold ${valueClass}`}>
        {value}
      </Text>
      <Text className="mt-0.5 text-[11px] text-gray-400">{sub}</Text>
    </View>
  );
}
