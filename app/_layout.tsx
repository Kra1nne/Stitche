import { ThemeProvider } from "@/context/ThemeContext";
import { migrateDbIfNeeded } from "@/database";
import "@/global.css";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "manrope-bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "manrope-extrabold": require("../assets/fonts/Manrope-ExtraBold.ttf"),
    "manrope-extralight": require("../assets/fonts/Manrope-ExtraLight.ttf"),
    "manrope-light": require("../assets/fonts/Manrope-Light.ttf"),
    "manrope-medium": require("../assets/fonts/Manrope-Bold.ttf"),
    "manrope-regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "manrope-semibold": require("../assets/fonts/Manrope-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SQLiteProvider databaseName="stitche.db" onInit={migrateDbIfNeeded}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SQLiteProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
