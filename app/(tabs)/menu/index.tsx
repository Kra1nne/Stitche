import { icons } from "@/constants/icon";
import { useTheme } from "@/context/ThemeContext";
import { styled } from "nativewind";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const User = icons.user;
const Cloud = icons.cloud;
const FileText = icons.document;
const Ruler = icons.ruler;
const Settings = icons.settings;
const Bell = icons.bell;
const Info = icons.info;
const CircleHelp = icons.question;
const Logout = icons.logout;
const Dark = icons.moon;

const SafeAreaView = styled(RNSafeAreaView);

function MenuItem({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <Pressable className="flex-row items-center justify-between px-4 py-4 border-b border-background active:bg-background">
      <View className="flex-row items-center">
        {icon}
        <Text className="ml-3 text-base font-manrope-medium text-foreground">
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

export default function Index() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const iconColor = isDarkMode ? "#f9fafb" : "#1f2937";

  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      {/* Title pulled out to the top level, matching the Dashboard/Orders/Products pattern */}
      <Text className="text-3xl mb-2 font-manrope-extrabold text-foreground">
        Menu
      </Text>
      <ScrollView className="mb-16" showsVerticalScrollIndicator={false}>
        <View className="bg-card rounded-xl mb-5 overflow-hidden">
          <MenuItem
            title="Shop Profile"
            icon={<User height={22} width={22} fill={iconColor} />}
          />
          <MenuItem
            title="Backup & Sync"
            icon={<Cloud height={22} width={22} fill={iconColor} />}
          />
          <MenuItem
            title="Export PDF"
            icon={<FileText height={22} width={22} fill={iconColor} />}
          />
          <MenuItem
            title="Measurement Guide"
            icon={<Ruler height={22} width={22} fill={iconColor} />}
          />
        </View>

        {/* Settings */}
        <View className="bg-card rounded-xl mb-5 overflow-hidden">
          <MenuItem
            title="Preferences"
            icon={<Settings height={22} width={22} fill={iconColor} />}
          />
          <MenuItem
            title="Notifications"
            icon={<Bell height={22} width={22} fill={iconColor} />}
          />

          <View className="flex-row justify-between items-center px-4 py-1">
            <View className="flex-row items-center">
              <Dark height={22} width={22} fill={iconColor} />
              <Text className="ml-3 text-base font-manrope-medium text-foreground">
                Dark Mode
              </Text>
            </View>

            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              thumbColor="#ffffff"
              trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
            />
          </View>
        </View>

        {/* Others */}
        <View className="bg-card rounded-xl overflow-hidden">
          <MenuItem
            title="Help & Support"
            icon={<CircleHelp height={22} width={22} fill={iconColor} />}
          />
          <MenuItem
            title="About"
            icon={<Info height={22} width={22} fill={iconColor} />}
          />
          <MenuItem
            title="Logout"
            icon={<Logout height={22} width={22} fill={iconColor} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
