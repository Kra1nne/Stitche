import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "manrope-bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "manrope-extrabold": require("../assets/fonts/Manrope-ExtraBold.ttf"),
    "manrope-extralight": require("../assets/fonts/Manrope-ExtraLight.ttf"),
    "manrope-light": require("../assets/fonts/Manrope-Light.ttf"),
    "manrope-meduim": require("../assets/fonts/Manrope-Bold.ttf"),
    "manrope-regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "manrope-simebold": require("../assets/fonts/Manrope-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
