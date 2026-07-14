import { icons } from "@/constants/icon";
import { images } from "@/constants/image";
import { useTheme } from "@/context/ThemeContext";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const BellIcon = icons.bell;
const SafeAreaView = styled(RNSafeAreaView);

export default function Index() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const iconColor = isDarkMode ? "#f9fafb" : "#1f2937";
  const item = [
    { id: 1, name: "Blue Plain Tshirt", img: images.tshirt_01, price: 1000 },
    { id: 2, name: "Purple Plain Tshirt", img: images.tshirt_02, price: 1000 },
    { id: 3, name: "Black Short", img: images.short_01, price: 1000 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      {/* Header */}
      <View className="mb-2 flex-row items-center justify-between ">
        <Text className="font-manrope-extrabold text-3xl text-foreground">
          Dashboard
        </Text>
        <View className="px-2">
          <BellIcon width={15} height={15} fill={iconColor} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between">
          {/* Profit */}
          <View className="card w-full mb-4 bg-primary rounded-3xl p-6">
            <Text className="text-primary text-base font-manrope-medium">
              Total Earnings
            </Text>

            <Text className="mt-2 text-4xl font-manrope-extrabold text-primary">
              ₱25,480
            </Text>

            <View className="mt-4 flex-row items-center justify-between">
              <View>
                <Text className="text-primary text-xs font-manrope-medium">
                  This Month
                </Text>
                <Text className="text-primary font-manrope-bold">
                  July 2026
                </Text>
              </View>

              <View className="rounded-full px-3 py-1">
                <Text className="text-success font-manrope-bold">↑ 18.5%</Text>
              </View>
            </View>
          </View>
          <View className="card mb-4 w-[48%]">
            <Text className="text-sm font-manrope-medium text-muted-foreground">
              Profit
            </Text>

            <Text className="mt-2 text-xl font-manrope-extrabold text-success">
              ₱25,480
            </Text>

            <Text className="mt-1 text-xs text-muted-foreground">
              This month
            </Text>
          </View>

          {/* Total Orders */}
          <View className="card mb-4 w-[48%]">
            <Text className="text-sm font-manrope-medium text-muted-foreground">
              Total Orders
            </Text>

            <Text className="mt-2 text-xl font-manrope-extrabold text-foreground">
              154
            </Text>

            <Text className="mt-1 text-xs text-muted-foreground">
              Completed orders
            </Text>
          </View>

          {/* Pending */}
          <View className="card w-[48%]">
            <Text className="text-sm font-manrope-medium text-muted-foreground">
              Pending
            </Text>

            <Text className="mt-2 text-xl font-manrope-extrabold text-accent">
              12
            </Text>

            <Text className="mt-1 text-xs text-muted-foreground">
              Order on process
            </Text>
          </View>

          {/* For Pick Up */}
          <View className="card w-[48%]">
            <Text className="text-sm font-manrope-medium text-muted-foreground">
              For Pick Up
            </Text>

            <Text className="mt-2 text-xl font-manrope-extrabold text-primary">
              8
            </Text>

            <Text className="mt-1 text-xs text-muted-foreground">
              Ready for collection
            </Text>
          </View>
        </View>
        <View className="mt-4">
          <View className="flex-row justify-between items-center">
            <Text className="font-manrope-bold text-xl text-foreground">
              Products
            </Text>
            <View className="px-3 py-1 border border-foreground rounded-full">
              <Link href="../item/">
                <Text className="font-manrope-medium text-sm text-foreground">
                  View all
                </Text>
              </Link>
            </View>
          </View>

          <View className="mb-16">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 0 }}
            >
              {item.map((card) => (
                <View key={card.id} className="card m-2">
                  <View className="card-content">
                    <Image
                      source={card.img}
                      style={{ width: 180, height: 180, borderRadius: 15 }}
                    />
                  </View>
                  <View className="mt-3 flex-row items-center justify-between">
                    <View className="flex-1 pr-3">
                      <Text
                        numberOfLines={2}
                        className="text-xs font-manrope-bold text-foreground"
                      >
                        {card.name}
                      </Text>
                    </View>

                    <View className="bg-primary/10 px-3 py-1 rounded-full">
                      <Text className="text-xs font-manrope-extrabold text-primary">
                        ₱{card.price.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
