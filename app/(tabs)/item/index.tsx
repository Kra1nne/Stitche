import EmptyState from "@/components/EmptyState";
import FAB from "@/components/FAB";
import ProductCard, { Product } from "@/components/ProductCard";
import ProductModal, { ProductFormValues } from "@/components/ProductModal";
import Screen from "@/components/Screen";
import ScreenHeader from "@/components/ScreenHeader";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icon";
import { images } from "@/constants/image";
import { useGarments } from "@/hooks/useGarments";
import { useItems } from "@/hooks/useItem";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Item } from "@/models";
import { useMemo, useState } from "react";
import { FlatList, Pressable } from "react-native";

const Add = icons.add;
const Tshirt = icons.tshirt;
const Filter = icons.filter;

const getProductImage = (imageKey?: string) => {
  if (!imageKey) {
    return images.White_Crew_Neck_T_Shirt;
  }

  return images[imageKey as keyof typeof images];
};

const getImageKey = (image: any) => {
  return Object.entries(images).find(([, value]) => value === image)?.[0];
};

const mapItemToProduct = (
  item: Item,
  garments: Array<{ id?: number; name?: string }>,
): Product => {
  const garmentName =
    garments.find((garment) => garment.id === item.garment_id)?.name ??
    "Unknown";

  return {
    id: item.id ?? 0,
    name: item.remarks?.trim() || "Untitled Product",
    img: getProductImage(item.url ?? undefined),
    price: Number(item.unit_price) || 0,
    garment: garmentName,
  };
};

export default function Index() {
  const { iconColor, mutedIconColor } = useThemeColors();
  const { Items: dbItems, addItem, updateItem, deleteItem } = useItems();
  const { garments } = useGarments();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");

  const products = useMemo(() => {
    return dbItems.map((item) => mapItemToProduct(item, garments));
  }, [dbItems, garments]);

  const filteredItems = products.filter((item) => {
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

  const handleDelete = async (product: Product) => {
    if (!product.id) return;
    await deleteItem(product.id);
    setModalVisible(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (values: ProductFormValues) => {
    const garmentMatch = garments.find(
      (garment) =>
        garment.name?.trim().toLowerCase() ===
        values.garment.trim().toLowerCase(),
    );

    if (editingProduct) {
      if (editingProduct.id) {
        await updateItem(editingProduct.id, {
          garment_id: garmentMatch?.id ?? undefined,
          unit_price: Number(values.price) || 0,
          remarks: values.name.trim(),
          url: values.imageKey ?? undefined,
        });
      }
    } else {
      await addItem({
        item_id: 0,
        garment_id: garmentMatch?.id ?? 1,
        unit_price: Number(values.price) || 0,
        remarks: values.name.trim(),
        url: values.imageKey ?? undefined,
        created_at: new Date().toISOString(),
      });
    }

    setModalVisible(false);
    setEditingProduct(null);
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
                imageKey: getImageKey(editingProduct.img),
              }
            : undefined
        }
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        onDelete={
          editingProduct ? () => handleDelete(editingProduct) : undefined
        }
      />
    </Screen>
  );
}
