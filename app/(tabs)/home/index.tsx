import { icons } from "@/constants/icon";
import { images } from "@/constants/image";
import { useTheme } from "@/context/ThemeContext";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const BellIcon = icons.bell;
const TrendUp = icons.trend; // fallback if trending icon isn't defined
const Orders = icons.briefcase;
const Clock = icons.clock;
const Package = icons.packageIcon;
const ChevronRight = icons.chevronRight;

const SafeAreaView = styled(RNSafeAreaView);

export default function Index() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const iconColor = isDarkMode ? "#f9fafb" : "#1f2937";
  const mutedIconColor = "#9CA3AF";

  const item = [
    { id: 1, name: "Blue Plain Tshirt", img: images.tshirt_01, price: 1000 },
    { id: 2, name: "Purple Plain Tshirt", img: images.tshirt_02, price: 1000 },
    { id: 3, name: "Black Short", img: images.short_01, price: 1000 },
  ];

  const stats = [
    {
      label: "Profit",
      value: "₱25,480",
      sub: "This month",
      valueClass: "text-success",
      icon: TrendUp,
      iconBg: "bg-success/10",
      iconColor: "#16A34A",
    },
    {
      label: "Total Orders",
      value: "154",
      sub: "Completed orders",
      valueClass: "text-foreground",
      icon: Orders,
      iconBg: "bg-foreground/10",
      iconColor: iconColor,
    },
    {
      label: "Pending",
      value: "12",
      sub: "Order on process",
      valueClass: "text-accent",
      icon: Clock,
      iconBg: "bg-accent/10",
      iconColor: "#D97706",
    },
    {
      label: "For Pick Up",
      value: "8",
      sub: "Ready for collection",
      valueClass: "text-primary",
      icon: Package,
      iconBg: "bg-primary/10",
      iconColor: "#2563EB",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-5 pt-2">
        {/* Header */}
        <View className="mb-5 flex-row items-center justify-between">
          <View>
            <Text className="font-manrope-extrabold text-3xl text-foreground">
              Dashboard
            </Text>
            <Text className="text-sm font-manrope-medium text-gray-400 mt-0.5">
              Welcome back!
            </Text>
          </View>
          <Pressable className="w-10 h-10 rounded-full bg-foreground/5 items-center justify-center">
            <BellIcon width={17} height={17} fill={iconColor} />
            <View className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent" />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Earnings hero card */}
          <View className="bg-primary rounded-3xl p-6 mb-4">
            <Text className="text-white/70 text-sm font-manrope-medium">
              Total Earnings
            </Text>
            <Text className="mt-2 text-4xl font-manrope-extrabold text-white">
              ₱25,480
            </Text>

            <View className="mt-5 flex-row items-center justify-between">
              <View>
                <Text className="text-white/60 text-xs font-manrope-medium">
                  This Month
                </Text>
                <Text className="text-white font-manrope-bold mt-0.5">
                  July 2026
                </Text>
              </View>

              <View className="rounded-full px-3 py-1.5 bg-white/15">
                <Text className="text-white font-manrope-bold text-xs">
                  ↑ 18.5%
                </Text>
              </View>
            </View>
          </View>

          {/* Stat grid */}
          <View className="flex-row flex-wrap justify-between">
            {stats.map((s) => (
              <View
                key={s.label}
                className="w-[48%] mb-4 bg-foreground/[0.03] rounded-2xl p-4 border border-foreground/5"
              >
                <View
                  className={`w-9 h-9 rounded-full items-center justify-center mb-3 ${s.iconBg}`}
                >
                  <s.icon width={16} height={16} fill={s.iconColor} />
                </View>
                <Text className="text-xs font-manrope-medium text-gray-400">
                  {s.label}
                </Text>
                <Text
                  className={`mt-1 text-xl font-manrope-extrabold ${s.valueClass}`}
                >
                  {s.value}
                </Text>
                <Text className="mt-0.5 text-[11px] text-gray-400">
                  {s.sub}
                </Text>
              </View>
            ))}
          </View>

          {/* Products */}
          <View className="mt-2">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="font-manrope-bold text-xl text-foreground">
                Products
              </Text>
              <Link href="../item/" asChild>
                <Pressable className="flex-row items-center gap-1 py-1">
                  <Text className="font-manrope-semibold text-sm text-primary">
                    View all
                  </Text>
                  <ChevronRight width={14} height={14} fill="#2563EB" />
                </Pressable>
              </Link>
            </View>

            <View className="mb-16">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 12 }}
              >
                {item.map((card, idx) => (
                  <View
                    key={card.id}
                    className={`bg-foreground/[0.03] rounded-3xl border border-foreground/5 p-3 w-[160px] ${
                      idx > 0 ? "ml-3" : ""
                    }`}
                  >
                    <Image
                      source={card.img}
                      style={{
                        width: "100%",
                        height: 140,
                        borderRadius: 16,
                      }}
                    />
                    <Text
                      numberOfLines={2}
                      className="mt-2.5 text-xs font-manrope-bold text-foreground"
                    >
                      {card.name}
                    </Text>
                    <View className="mt-2 self-start bg-primary/10 px-2.5 py-1 rounded-full">
                      <Text className="text-xs font-manrope-extrabold text-primary">
                        ₱{card.price.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
