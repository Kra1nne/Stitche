import { icons } from "@/constants/icon";
import { images } from "@/constants/image";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const BellIcon = icons.bell;
const SafeAreaView = styled(RNSafeAreaView);

export default function Index() {
  const item = [
    { id: 1, name: "Blue Plain Tshirt", img: images.tshirt_01, price: 1000 },
    { id: 2, name: "Purple Plain Tshirt", img: images.tshirt_02, price: 1000 },
    { id: 3, name: "Black Short", img: images.short_01, price: 1000 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      {/* Header */}
      <View className="mb-6 flex-row items-center justify-between ">
        <Text className="font-manrope-extrabold text-3xl text-foreground">
          Dashboard
        </Text>
        <View>
          <BellIcon width={15} height={15} />
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
                <Text className="text-primary text-xs">This Month</Text>
                <Text className="text-primary font-manrope-bold">
                  July 2026
                </Text>
              </View>

              <View className="rounded-full bg-white/20 px-3 py-1">
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
            <Text className="monrope-bold text-xl">Products</Text>
            <Link href="../item/">
              <Text className="manrope text-sm">See more</Text>
            </Link>
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
                        className="text-xs font-bold text-foreground"
                      >
                        {card.name}
                      </Text>
                    </View>

                    <View className="bg-primary/10 px-3 py-1 rounded-full">
                      <Text className="text-xs font-extrabold text-primary">
                        ₱{card.price.toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
            {/* <View className="card m-2">
            <Text>No Item</Text>
          </View> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
