import { icons } from "@/constants/icon";
import { styled } from "nativewind";
import { useState } from "react";
import { Pressable, Switch, Text, View } from "react-native";
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

const SafeAreaView = styled(RNSafeAreaView);

function MenuItem({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <Pressable className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100 active:bg-gray-100">
      <View className="flex-row items-center">
        {icon}
        <Text className="ml-3 text-base font-medium text-gray-800">
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

export default function Index() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="bg-white rounded-xl mx-4 mb-5 overflow-hidden">
        <Text className="font-manrope-extrabold text-3xl mx-4 my-2 text-foreground">
          Menu
        </Text>
        <MenuItem
          title="Shop Profile"
          icon={<User height={22} width={22} color="#2563EB" />}
        />

        <MenuItem
          title="Backup & Sync"
          icon={<Cloud height={22} width={22} color="#2563EB" />}
        />

        <MenuItem
          title="Export PDF"
          icon={<FileText height={22} width={22} color="#2563EB" />}
        />

        <MenuItem
          title="Measurement Guide"
          icon={<Ruler height={22} width={22} color="#2563EB" />}
        />
      </View>

      {/* Settings */}
      <View className="bg-white rounded-xl mx-4 mb-5 overflow-hidden">
        <MenuItem
          title="Preferences"
          icon={<Settings height={22} width={22} color="#2563EB" />}
        />

        <MenuItem
          title="Notifications"
          icon={<Bell height={22} width={22} color="#2563EB" />}
        />

        <View className="flex-row justify-between items-center px-4 py-2">
          <View className="flex-row items-center">
            <Text className="text-xl mr-3">🌙</Text>
            <Text className="text-base font-medium">Dark Mode</Text>
          </View>

          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>

      {/* Others */}
      <View className="bg-white rounded-xl mx-4 overflow-hidden">
        <MenuItem
          title="Help & Support"
          icon={<CircleHelp height={22} width={22} color="#2563EB" />}
        />

        <MenuItem
          title="About"
          icon={<Info height={22} width={22} color="#2563EB" />}
        />
        <MenuItem
          title="About"
          icon={<Logout height={22} width={22} color="#2563EB" />}
        />
      </View>
    </SafeAreaView>
  );
}
