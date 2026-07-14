import MenuItem from "@/components/MenuItem";
import Screen from "@/components/Screen";
import { icons } from "@/constants/icon";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ScrollView, Switch, Text, View } from "react-native";

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
const ChevronRight = icons.chevronRight;

export default function Index() {
  const { isDarkMode, iconColor, toggleTheme } = useThemeColors();

  return (
    <Screen>
      <Text className="text-3xl mb-5 font-manrope-extrabold text-foreground">
        Menu
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* Profile summary card */}
        <View className="bg-foreground/[0.03] rounded-3xl border border-foreground/5 p-4 mb-6 flex-row items-center gap-3">
          <View className="w-14 h-14 rounded-full bg-primary/10 items-center justify-center">
            <User width={24} height={24} fill="#2563EB" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-manrope-bold text-foreground">
              Your Shop
            </Text>
            <Text className="text-xs font-manrope-medium text-gray-400 mt-0.5">
              Tap to view shop profile
            </Text>
          </View>
          <ChevronRight width={16} height={16} fill="#9CA3AF" />
        </View>

        <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2 ml-1">
          Shop
        </Text>
        <View className="bg-foreground/[0.03] rounded-2xl border border-foreground/5 mb-6 overflow-hidden">
          <MenuItem
            title="Shop Profile"
            icon={<User height={17} width={17} fill={iconColor} />}
          />
          <MenuItem
            title="Backup & Sync"
            icon={<Cloud height={17} width={17} fill={iconColor} />}
          />
          <MenuItem
            title="Export PDF"
            icon={<FileText height={17} width={17} fill={iconColor} />}
          />
          <MenuItem
            title="Measurement Guide"
            icon={<Ruler height={17} width={17} fill={iconColor} />}
            isLast
          />
        </View>

        <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2 ml-1">
          Settings
        </Text>
        <View className="bg-foreground/[0.03] rounded-2xl border border-foreground/5 mb-6 overflow-hidden">
          <MenuItem
            title="Preferences"
            icon={<Settings height={17} width={17} fill={iconColor} />}
          />
          <MenuItem
            title="Notifications"
            icon={<Bell height={17} width={17} fill={iconColor} />}
          />

          <View className="flex-row justify-between items-center px-4 py-3.5">
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-full items-center justify-center bg-foreground/5">
                <Dark height={17} width={17} fill={iconColor} />
              </View>
              <Text className="text-[15px] font-manrope-medium text-foreground">
                Dark Mode
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              value={isDarkMode}
              onValueChange={toggleTheme}
            />
          </View>
        </View>

        <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2 ml-1">
          Support
        </Text>
        <View className="bg-foreground/[0.03] rounded-2xl border border-foreground/5 overflow-hidden">
          <MenuItem
            title="Help & Support"
            icon={<CircleHelp height={17} width={17} fill={iconColor} />}
          />
          <MenuItem
            title="About"
            icon={<Info height={17} width={17} fill={iconColor} />}
          />
          <MenuItem
            title="Logout"
            icon={<Logout height={17} width={17} fill="#EF4444" />}
            tint="bg-red-500/10"
            danger
            showChevron={false}
            isLast
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
