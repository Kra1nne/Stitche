import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Appearance, useColorScheme, View } from "react-native";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

const STORAGE_KEY = "theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemTheme = useColorScheme();

  const [theme, setTheme] = useState<Theme>(
    systemTheme === "dark" ? "dark" : "light",
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);

        if (saved === "light" || saved === "dark") {
          setTheme(saved);
          Appearance.setColorScheme(saved);
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setReady(true);
      }
    }

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    setTheme(next);
    Appearance.setColorScheme(next);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      console.warn(e);
    }
  };

  if (!ready) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <View className={theme === "dark" ? "dark flex-1" : "flex-1"}>
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
