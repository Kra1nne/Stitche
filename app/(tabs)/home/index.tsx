import { icons } from "@/constants/icon";
import { styled } from "nativewind";
import { Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const BellIcon = icons.bell;
const SafeAreaView = styled(RNSafeAreaView);

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      {/* Header */}
      <View className="mb-6 flex-row items-center justify-between">
        <Text className="font-manrope-extrabold text-3xl text-foreground">
          Dashboard
        </Text>
        <View>
          <BellIcon width={20} height={20} />
        </View>
      </View>

      <View className="flex-row flex-wrap justify-between">
        {/* Profit */}
        <View className="card mb-4 w-[48%]">
          <Text className="text-sm font-manrope-medium text-muted-foreground">
            Profit
          </Text>

          <Text className="mt-2 text-xl font-manrope-extrabold text-success">
            ₱25,480
          </Text>

          <Text className="mt-1 text-xs text-muted-foreground">This month</Text>
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
    </SafeAreaView>
  );
}
