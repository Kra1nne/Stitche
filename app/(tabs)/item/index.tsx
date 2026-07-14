import { icons } from "@/constants/icon";
import { images } from "@/constants/image";
import { useTheme } from "@/context/ThemeContext";
import { Image } from "expo-image";
import { styled } from "nativewind";
import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);
const Search = icons.search;
const Add = icons.add;
const Tshirt = icons.tshirt;
const Filter = icons.filter;

const item = [
  {
    id: 1,
    name: "Blue Plain Tshirt",
    img: images.tshirt_01,
    price: 1000,
    garment: "T-shirts",
  },
  {
    id: 2,
    name: "Purple Plain Tshirt",
    img: images.tshirt_02,
    price: 1000,
    garment: "T-shirts",
  },
  {
    id: 3,
    name: "Black Short",
    img: images.short_01,
    price: 1000,
    garment: "Shorts",
  },
];

export default function Index() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const iconColor = isDarkMode ? "#f9fafb" : "#1f2937";
  const mutedIconColor = "#9CA3AF";
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  const filteredItems = item.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.garment.toLowerCase().includes(query)
    );
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-5 pt-2">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-5">
          <View>
            <Text className="text-3xl font-manrope-extrabold text-foreground">
              Products
            </Text>
            <Text className="text-sm font-manrope-medium text-gray-400 mt-0.5">
              {filteredItems.length} item{filteredItems.length === 1 ? "" : "s"}
            </Text>
          </View>
          <Pressable className="w-10 h-10 rounded-full bg-foreground/5 items-center justify-center">
            <Filter width={17} height={17} fill={iconColor} />
          </Pressable>
        </View>

        {/* Search */}
        <View className="flex-row items-center bg-foreground/5 rounded-2xl px-4 h-12 mb-5">
          <Search width={18} height={18} fill={mutedIconColor} />
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-3 h-full text-base text-foreground"
            textAlignVertical="center"
            style={{
              paddingVertical: 0,
              includeFontPadding: false,
            }}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")} hitSlop={8}>
              <Text className="text-gray-400 text-lg leading-none">×</Text>
            </Pressable>
          )}
        </View>

        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          contentContainerClassName="pb-24"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="w-[48%] mb-4">
              <View className="bg-foreground/[0.03] rounded-3xl border border-foreground/5 p-3">
                <View className="relative">
                  <Image
                    source={item.img}
                    style={{ width: "100%", aspectRatio: 1, borderRadius: 16 }}
                  />
                </View>

                <Text
                  numberOfLines={2}
                  className="mt-3 text-xs font-manrope-bold text-foreground"
                >
                  {item.name}
                </Text>
                <Text className="mt-0.5 text-[11px] font-manrope-medium text-gray-400">
                  {item.garment}
                </Text>

                <View className="mt-2 self-start bg-primary/10 px-2.5 py-1 rounded-full">
                  <Text className="text-xs font-manrope-extrabold text-primary">
                    ₱{item.price.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View className="mt-16 items-center gap-3">
              <View className="w-16 h-16 rounded-full bg-foreground/5 items-center justify-center">
                <Tshirt width={28} height={28} fill={iconColor} />
              </View>
              <Text className="text-gray-400 font-manrope-bold text-base">
                No products found
              </Text>
              <Text className="text-gray-400 font-manrope-medium text-xs">
                Try a different search term
              </Text>
            </View>
          }
        />
      </View>

      {/* FAB */}
      <Pressable
        onPress={() => setModalVisible(true)}
        className="absolute bottom-40 right-6 w-14 h-14 rounded-full bg-primary items-center justify-center"
        style={{
          elevation: 6,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
        }}
      >
        <Add width={24} height={24} fill={"#fff"} />
      </Pressable>
    </SafeAreaView>
  );
}
