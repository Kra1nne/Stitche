import { images } from "@/constants/image";
import "@/global.css";
import { Image } from "expo-image";
import { router } from "expo-router";
import { styled } from "nativewind";
import { Pressable } from "react-native";

const Screen = styled(Pressable);
const loadingImage = images.Loading;
export default function App() {
  return (
    <Screen
      className="flex-1 items-center justify-center bg-primary"
      onPress={() => router.push("/(tabs)/home")}
    >
      <Image
        source={loadingImage}
        style={{ width: "100%", height: 200 }}
        contentFit="cover"
      />
    </Screen>
  );
}
