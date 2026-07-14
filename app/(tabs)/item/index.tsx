import AddProductModal, { NewProduct } from "@/components/AddProductModal";
import EmptyState from "@/components/Emptystate";
import FAB from "@/components/FAB";
import ProductCard, { Product } from "@/components/Productcard";
import Screen from "@/components/Screen";
import ScreenHeader from "@/components/ScreenHeader";
import SearchBar from "@/components/Searchbar";
import { icons } from "@/constants/icon";
import { images } from "@/constants/image";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import { FlatList, View } from "react-native";

const Add = icons.add;
const Tshirt = icons.tshirt;
const Filter = icons.filter;

const INITIAL_ITEMS: Product[] = [
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
  const { iconColor, mutedIconColor } = useThemeColors();
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(INITIAL_ITEMS);

  const filteredItems = items.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      (item.garment ?? "").toLowerCase().includes(query)
    );
  });

  const handleAddProduct = (product: NewProduct) => {
    setItems((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
        name: product.name,
        img: images.tshirt_01, // placeholder until real image upload is wired up
        price: Number(product.price) || 0,
        garment: product.garment,
      },
    ]);
  };

  return (
    <Screen>
      <ScreenHeader
        title="Products"
        subtitle={`${filteredItems.length} item${filteredItems.length === 1 ? "" : "s"}`}
        actions={[{ icon: <Filter width={17} height={17} fill={iconColor} /> }]}
      />

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search products..."
        mutedIconColor={mutedIconColor}
      />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerClassName="pb-24"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="w-[48%] mb-4">
            <ProductCard product={item} variant="grid" />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            icon={<Tshirt width={28} height={28} fill={iconColor} />}
            title="No products found"
            subtitle="Try a different search term"
          />
        }
      />

      <FAB onPress={() => setModalVisible(true)}>
        <Add width={24} height={24} fill="#fff" />
      </FAB>

      <AddProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddProduct}
      />
    </Screen>
  );
}
