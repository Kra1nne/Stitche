import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { View } from "react-native";

type Theme = "light" | "dark";

const ThemeContext = createContext({
  theme: "light" as Theme,
  toggleTheme: () => {},
});

const STORAGE_KEY = "theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved === "dark" || saved === "light") {
          setColorScheme(saved);
        }
      })
      .catch((err) => {
        console.warn("Failed to load saved theme:", err);
      })
      .finally(() => {
        setReady(true);
      });
  }, [setColorScheme]);

  const toggleTheme = () => {
    const next: Theme = colorScheme === "dark" ? "light" : "dark";
    setColorScheme(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch((err) => {
      console.warn("Failed to save theme:", err);
    });
  };

  if (!ready) return null;

  const resolvedTheme: Theme = colorScheme === "dark" ? "dark" : "light";

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, toggleTheme }}>
      <View
        className={resolvedTheme === "dark" ? "dark" : ""}
        style={{ flex: 1 }}
      >
        <StatusBar style={resolvedTheme === "dark" ? "light" : "dark"} />
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
