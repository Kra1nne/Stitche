import Screen from "@/components/Screen";
import { icons } from "@/constants/icon";
import { images } from "@/constants/image";
import { useItems } from "@/hooks/useItem";
import { useSizes } from "@/hooks/useSizes";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

interface OrderFormData {
  customerName: string;
  phoneNumber: string;
  address: string;
  selectedItem: number | null;
  price: string;
  size: string;
  quantity: string;
  completionDate: string;
  notes: string;
}

const INITIAL_FORM_STATE: OrderFormData = {
  customerName: "",
  phoneNumber: "",
  address: "",
  selectedItem: null,
  price: "",
  size: "",
  quantity: "",
  completionDate: "",
  notes: "",
};

export default function AddOrder() {
  const { sizes } = useSizes();
  const { Items } = useItems();
  const params = useLocalSearchParams();
  const Back = icons.back;

  // Determine if we're in edit mode
  const mode = params.mode === "edit" ? "edit" : "add";
  const orderId = params.orderId ? Number(params.orderId) : null;

  const [formData, setFormData] = useState<OrderFormData>(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);

  // Load order data if in edit mode
  useEffect(() => {
    if (mode === "edit" && orderId) {
      loadOrderData(orderId);
    }
  }, [mode, orderId]);

  const loadOrderData = async (id: number) => {
    try {
      console.log("Loading order data for ID:", id);
    } catch (error) {
      Alert.alert("Error", "Failed to load order data");
    }
  };

  // Auto-fill price when item is selected
  const handleSelectItem = (itemId: number, itemPrice: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedItem: itemId,
      price: itemPrice.toString(),
    }));
  };

  const updateFormField = <K extends keyof OrderFormData>(
    field: K,
    value: OrderFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.customerName.trim().length > 0 &&
      formData.phoneNumber.trim().length > 0 &&
      formData.address.trim().length > 0 &&
      formData.selectedItem !== null &&
      formData.price.length > 0 &&
      formData.size.length > 0 &&
      formData.quantity.trim().length > 0
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      Alert.alert("Validation Error", "Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      if (mode === "add") {
        console.log("Adding order:", formData);
        Alert.alert("Success", "Order added successfully");
      } else {
        console.log("Updating order:", orderId, formData);
        Alert.alert("Success", "Order updated successfully");
      }

      // Reset form and navigate back
      setFormData(INITIAL_FORM_STATE);
      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to save order");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
  };
  return (
    <Screen>
      <Pressable onPress={() => router.push("/(tabs)/list")} className="mb-5">
        <Text className="text-foreground">
          <Back width={8} height={8} fill="#fff" /> Back
        </Text>
      </Pressable>
      <View className="mb-5">
        <Text className="text-xl font-manrope-extrabold text-foreground">
          {mode === "edit" ? "Edit Order" : "Add Order"}
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2">
          Customer Name
        </Text>
        <TextInput
          placeholder="e.g. John Doe"
          placeholderTextColor="#9CA3AF"
          value={formData.customerName}
          onChangeText={(text) => updateFormField("customerName", text)}
          className="bg-foreground/5 rounded-2xl px-4 h-12 text-base text-foreground font-manrope-medium mb-5"
        />
        <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2">
          Phone Number
        </Text>
        <TextInput
          placeholder="e.g. 09123456789"
          placeholderTextColor="#9CA3AF"
          value={formData.phoneNumber}
          onChangeText={(text) => updateFormField("phoneNumber", text)}
          className="bg-foreground/5 rounded-2xl px-4 h-12 text-base text-foreground font-manrope-medium mb-5"
        />
        <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2">
          Address
        </Text>
        <TextInput
          placeholder="e.g. Mabuhay Street, Barangay 123, City"
          placeholderTextColor="#9CA3AF"
          value={formData.address}
          onChangeText={(text) => updateFormField("address", text)}
          className="bg-foreground/5 rounded-2xl px-4 h-12 text-base text-foreground font-manrope-medium mb-5"
        />
        <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2">
          Estimated Complete Date
        </Text>
        <TextInput
          placeholder="e.g. 2025-08-15"
          placeholderTextColor="#9CA3AF"
          value={formData.completionDate}
          onChangeText={(text) => updateFormField("completionDate", text)}
          className="bg-foreground/5 rounded-2xl px-4 h-12 text-base text-foreground font-manrope-medium mb-5"
        />
        <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2">
          Product
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-5"
        >
          {Items.length > 0 ? (
            Items.map((item) => {
              const imageSource = item.url
                ? images[item.url as keyof typeof images]
                : undefined;

              return (
                <Pressable
                  key={item.id}
                  onPress={() => handleSelectItem(item.id!, item.unit_price)}
                  className={`mr-3 rounded-2xl p-3 border ${
                    formData.selectedItem === item.id
                      ? "bg-primary/10 border-primary"
                      : "bg-foreground/5 border-foreground/10"
                  }`}
                  style={{ width: 160 }}
                >
                  {imageSource && (
                    <Image
                      source={imageSource}
                      style={{ width: "100%", height: 140, borderRadius: 12 }}
                    />
                  )}
                  <Text
                    numberOfLines={2}
                    className={`mt-2 text-xs font-manrope-bold ${
                      formData.selectedItem === item.id
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {item.name}
                  </Text>
                  <View className="mt-2 bg-primary/10 px-2 py-1 rounded-full self-start">
                    <Text className="text-xs font-manrope-extrabold text-primary">
                      ₱{item.unit_price.toLocaleString()}
                    </Text>
                  </View>
                </Pressable>
              );
            })
          ) : (
            <Text className="text-gray-400 text-sm">No items available</Text>
          )}
        </ScrollView>
        <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2">
          Size
        </Text>
        <View className="flex-row flex-wrap gap-2 mb-5">
          {sizes.map((sizeItem) => {
            const type = sizeItem.name ?? "";
            const selected = formData.size === type;

            if (!type) return null;

            return (
              <Pressable
                key={sizeItem.id ?? type}
                onPress={() => updateFormField("size", type)}
                className={`px-4 py-2 rounded-full border ${
                  selected
                    ? "bg-primary border-primary"
                    : "bg-foreground/5 border-foreground/10"
                }`}
              >
                <Text
                  className={`text-sm font-manrope-semibold ${
                    selected ? "text-white" : "text-foreground"
                  }`}
                >
                  {type}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2">
          Price
        </Text>
        <TextInput
          editable={false}
          placeholder="₱0.00"
          placeholderTextColor="#9CA3AF"
          value={formData.price}
          keyboardType="decimal-pad"
          className="bg-foreground/5 rounded-2xl px-4 h-12 text-base text-foreground font-manrope-medium mb-5"
        />
        <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2">
          Quantity
        </Text>
        <TextInput
          placeholder="e.g. 3"
          placeholderTextColor="#9CA3AF"
          value={formData.quantity}
          onChangeText={(text) => updateFormField("quantity", text)}
          keyboardType="number-pad"
          className="bg-foreground/5 rounded-2xl px-4 h-12 text-base text-foreground font-manrope-medium mb-5"
        />
        <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2">
          Notes
        </Text>
        <TextInput
          placeholder="Additional notes..."
          placeholderTextColor="#9CA3AF"
          value={formData.notes}
          onChangeText={(text) => updateFormField("notes", text)}
          multiline
          numberOfLines={4}
          className="bg-foreground/5 rounded-2xl px-4 py-3 text-base text-foreground font-manrope-medium mb-5"
        />
      </ScrollView>
      <View className="flex-row gap-3 mb-5">
        <Pressable
          onPress={handleSubmit}
          disabled={isLoading || !isFormValid()}
          className={`flex-1 rounded-2xl py-3 ${
            isLoading || !isFormValid() ? "bg-primary/50" : "bg-primary"
          }`}
        >
          <Text className="text-center text-white font-manrope-extrabold">
            {isLoading
              ? "Saving..."
              : mode === "edit"
                ? "Update Order"
                : "Add Order"}
          </Text>
        </Pressable>
        {mode == "edit" ? (
          <Pressable className="flex-1 rounded-2xl py-3 bg-destructive border-destructive">
            <Text className="text-center text-white font-manrope-semibold">
              Delete
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={handleReset}
            className="flex-1 rounded-2xl py-3 bg-foreground/10 border border-foreground/20"
          >
            <Text className="text-center text-foreground font-manrope-semibold">
              Reset
            </Text>
          </Pressable>
        )}
      </View>
    </Screen>
  );
}
