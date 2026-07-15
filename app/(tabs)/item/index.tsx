import EmptyState from "@/components/EmptyState";
import FAB from "@/components/FAB";
import ProductCard, { Product } from "@/components/ProductCard";
import ProductModal, { ProductFormValues } from "@/components/ProductModal";
import Screen from "@/components/Screen";
import ScreenHeader from "@/components/ScreenHeader";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icon";
import { images } from "@/constants/image";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import { FlatList, Pressable } from "react-native";

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
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(INITIAL_ITEMS);

  const filteredItems = items.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      (item.garment ?? "").toLowerCase().includes(query)
    );
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setModalVisible(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setModalVisible(true);
  };

  const handleSubmit = (values: ProductFormValues) => {
    if (editingProduct) {
      // Edit mode: merge form values back into the existing product
      setItems((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: values.name,
                garment: values.garment,
                price: Number(values.price) || 0,
              }
            : p,
        ),
      );
    } else {
      // Add mode: append a new product
      setItems((prev) => [
        ...prev,
        {
          id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
          name: values.name,
          img: images.tshirt_01, // placeholder until real image upload is wired up
          price: Number(values.price) || 0,
          garment: values.garment,
        },
      ]);
    }
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
          <Pressable
            className="w-[48%] mb-4"
            onPress={() => openEditModal(item)}
          >
            <ProductCard product={item} variant="grid" />
          </Pressable>
        )}
        ListEmptyComponent={
          <EmptyState
            icon={<Tshirt width={28} height={28} fill={iconColor} />}
            title="No products found"
            subtitle="Try a different search term"
          />
        }
      />

      <FAB onPress={openAddModal}>
        <Add width={24} height={24} fill="#fff" />
      </FAB>

      <ProductModal
        visible={modalVisible}
        mode={editingProduct ? "edit" : "add"}
        initialValues={
          editingProduct
            ? {
                name: editingProduct.name,
                garment: editingProduct.garment ?? "",
                price: String(editingProduct.price),
              }
            : undefined
        }
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </Screen>
  );
}
