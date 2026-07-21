import ProductCard, { Product } from "@/components/ProductCard";
import Screen from "@/components/Screen";
import ScreenHeader from "@/components/ScreenHeader";
import StatCard, { Stat } from "@/components/StatCard";
import { icons } from "@/constants/icon";
import { images } from "@/constants/image";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

const BellIcon = icons.bell;
const TrendUp = icons.trend;
const Orders = icons.briefcase;
const Clock = icons.clock;
const Package = icons.packageIcon;
const ChevronRight = icons.chevronRight;

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Blue Plain Tshirt",
    img: images.Black_Basketball_Shorts,
    price: 1000,
  },
  {
    id: 2,
    name: "Purple Plain Tshirt",
    img: images.Black_Padded_Contour_Bra,
    price: 1000,
  },
  { id: 3, name: "Black Short", img: images.Black_Satin_Necktie, price: 1000 },
];

export default function Index() {
  const { iconColor } = useThemeColors();

  const stats: Stat[] = [
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
      iconColor,
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
    <Screen>
      <ScreenHeader
        title="Dashboard"
        subtitle="Welcome back!"
        actions={[
          {
            icon: <BellIcon width={17} height={17} fill={iconColor} />,
            showDot: true,
          },
        ]}
      />

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
            <StatCard key={s.label} {...s} />
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
              {PRODUCTS.map((product, idx) => (
                <View key={product.id} className={idx > 0 ? "ml-3" : ""}>
                  <ProductCard product={product} variant="carousel" />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
