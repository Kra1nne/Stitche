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
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  const filteredItems = item.filter((item) => {
    const query = search.toLowerCase();
    return item.name.toLowerCase().includes(query);
  });

  return (
    <SafeAreaView className="flex-1 p-4 bg-background ">
      <View className="flex-row items-center justify-between">
        <Text className="text-3xl mb-2 font-manrope-extrabold text-foreground">
          Products
        </Text>
        <View className="px-2">
          <Filter width={15} height={15} fill={iconColor} />
        </View>
      </View>

      {/* Wrapped in mb-2 to match the spacing rhythm used on the Orders screen */}
      <View className="mb-2">
        <View className="flex-row items-center border border-gray-200 rounded-2xl px-4 h-10 shadow-sm">
          <Search width={18} height={18} fill={iconColor} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search products..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-3 text-base text-gray-900"
          />
        </View>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName="pb-14"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View key={item.id} className="card m-2">
            <View className="card-content relative">
              <Image
                source={item.img}
                style={{ width: 270, height: 270, borderRadius: 15 }}
              />
              <View className="absolute top-1 right-2 bg-primary px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-manrope-bold">
                  {item.garment}
                </Text>
              </View>
            </View>
            <View className="mt-3 flex-row items-center justify-between">
              <View className="flex-1 pr-3">
                <Text
                  numberOfLines={2}
                  className="text-base font-manrope-bold text-foreground"
                >
                  {item.name}
                </Text>
              </View>

              <View className="bg-primary/10 px-3 py-1 rounded-full">
                <Text className="text-base font-manrope-extrabold text-primary">
                  ₱{item.price.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="mt-10 items-center gap-4">
            <Tshirt width={45} height={45} fill={iconColor} />
            <Text className="text-gray-500 font-manrope-bold text-xl">
              No product found.
            </Text>
          </View>
        }
      />

      <Pressable
        onPress={() => setModalVisible(true)}
        className="absolute bottom-40 bg-primary p-1 rounded-full right-6 items-center justify-center"
        style={{ elevation: 6 }}
      >
        <Add width={26} height={26} fill={"#fff"} />
      </Pressable>
    </SafeAreaView>
  );
}
