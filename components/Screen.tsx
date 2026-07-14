import { styled } from "nativewind";
import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function Screen({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className={`flex-1 px-5 pt-2 ${className}`}>{children}</View>
    </SafeAreaView>
  );
}
