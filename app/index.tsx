import "@/global.css";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);
export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-manrope-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
      <Link
        href="/(tabs)/home/"
        className="p-4 bg-primary text-white font-manrope mt-6 rounded-4xl"
      >
        Get Started
      </Link>
    </SafeAreaView>
  );
}
