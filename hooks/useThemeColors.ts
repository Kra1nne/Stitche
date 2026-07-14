import { useTheme } from "@/context/ThemeContext";

/**
 * Replaces this boilerplate that was copy-pasted in every screen:
 *
 *   const { theme } = useTheme();
 *   const isDarkMode = theme === "dark";
 *   const iconColor = isDarkMode ? "#f9fafb" : "#1f2937";
 *   const mutedIconColor = "#9CA3AF";
 */
export function useThemeColors() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return {
    theme,
    toggleTheme,
    isDarkMode,
    iconColor: isDarkMode ? "#f9fafb" : "#1f2937",
    mutedIconColor: "#9CA3AF",
  };
}
