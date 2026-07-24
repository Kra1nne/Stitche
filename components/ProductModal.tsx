import { icons } from "@/constants/icon";
import { images } from "@/constants/image";
import { useTheme } from "@/context/ThemeContext";
import { useGarments } from "@/hooks/useGarments";
import { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Close = icons.close;

export type ProductFormValues = {
  name: string;
  garment: string;
  price: string;
  quantity: number;
  imageKey?: string;
};

const EMPTY_VALUES: ProductFormValues = {
  name: "",
  garment: "",
  price: "",
  quantity: 1,
  imageKey: undefined,
};

const IMAGE_OPTIONS = Object.entries(images).map(([key, value]) => ({
  key,
  label: key.replace(/_/g, " "),
  image: value,
}));

export default function ProductModal({
  visible,
  mode = "add",
  initialValues,
  onClose,
  onSubmit,
  onDelete,
}: {
  visible: boolean;
  mode?: "add" | "edit";
  initialValues?: Partial<ProductFormValues>;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => void;
  onDelete?: () => void;
}) {
  const { theme } = useTheme();
  const { garments } = useGarments();
  const isDarkMode = theme === "dark";
  const iconColor = isDarkMode ? "#f9fafb" : "#1f2937";

  const [name, setName] = useState(EMPTY_VALUES.name);
  const [garment, setGarment] = useState<string>("");
  const [price, setPrice] = useState(EMPTY_VALUES.price);
  const [quantity, setQuantity] = useState(EMPTY_VALUES.quantity);
  const [selectedImageKey, setSelectedImageKey] = useState<string | null>(null);

  // Populate the form whenever the modal opens, using initialValues in edit mode
  useEffect(() => {
    if (!visible) return;

    if (mode === "edit" && initialValues) {
      setName(initialValues.name ?? "");
      setGarment(initialValues.garment ?? "");
      setPrice(initialValues.price ?? "");
      setQuantity(initialValues.quantity ?? 1);
      setSelectedImageKey(initialValues.imageKey ?? null);
    } else {
      setName(EMPTY_VALUES.name);
      setGarment("");
      setPrice(EMPTY_VALUES.price);
      setQuantity(EMPTY_VALUES.quantity);
      setSelectedImageKey(null);
    }
  }, [visible, mode, initialValues]);

  const isValid =
    name.trim().length > 0 &&
    garment.length > 0 &&
    price.trim().length > 0 &&
    !!selectedImageKey;

  const reset = () => {
    setName(EMPTY_VALUES.name);
    setGarment("");
    setPrice(EMPTY_VALUES.price);
    setQuantity(EMPTY_VALUES.quantity);
    setSelectedImageKey(null);
  };

  const handleClose = () => {
    if (mode === "add") reset();
    onClose();
  };

  const handleSubmit = () => {
    if (!isValid || !garment) return;
    onSubmit({
      name: name.trim(),
      garment,
      price: price.trim(),
      quantity,
      imageKey: selectedImageKey ?? undefined,
    });
    if (mode === "add") reset();
    onClose();
  };

  const title = mode === "edit" ? "Edit Product" : "Add Product";
  const submitLabel = mode === "edit" ? "Save Changes" : "Add Product";

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      presentationStyle="overFullScreen"
      onRequestClose={handleClose}
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={handleClose}>
        <View className="flex-1 bg-black/40 justify-end">
          {/* Prevent backdrop press from firing when tapping the sheet itself */}
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View
              className="bg-background rounded-t-4xl px-5 pt-4"
              style={{
                maxHeight: "88%",
                paddingBottom: Platform.OS === "ios" ? 32 : 20,
              }}
            >
              {/* Drag handle */}
              <View className="items-center mb-3">
                <View className="w-10 h-1.5 rounded-full bg-foreground/10" />
              </View>

              {/* Header */}
              <View className="flex-row items-center justify-between mb-5">
                <Text className="text-xl font-manrope-extrabold text-foreground">
                  {title}
                </Text>
                <Pressable
                  onPress={handleClose}
                  hitSlop={8}
                  className="w-9 h-9 rounded-full bg-foreground/5 items-center justify-center"
                >
                  <Close width={16} height={16} fill={iconColor} />
                </Pressable>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {/* Product name */}
                <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2">
                  Product Name
                </Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="e.g. Blue Plain Tshirt"
                  placeholderTextColor="#9CA3AF"
                  className="bg-foreground/5 rounded-2xl px-4 h-12 text-base text-foreground font-manrope-medium mb-5"
                />

                {/* Image carousel */}
                <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2">
                  Choose Image
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="gap-3 pb-1"
                >
                  {IMAGE_OPTIONS.map((option) => {
                    const selected = selectedImageKey === option.key;

                    return (
                      <Pressable
                        key={option.key}
                        onPress={() => setSelectedImageKey(option.key)}
                        className={`w-24 rounded-[18px] border p-2 ${
                          selected
                            ? "bg-primary/10 border-primary"
                            : "bg-foreground/5 border-foreground/10"
                        }`}
                      >
                        <Image
                          source={option.image}
                          className="w-full h-20 rounded-2xl"
                          resizeMode="cover"
                        />
                      </Pressable>
                    );
                  })}
                </ScrollView>

                {/* Garment type */}
                <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2 mt-5">
                  Garment Type
                </Text>
                <View className="flex-row flex-wrap gap-2 mb-5">
                  {garments.map((item) => {
                    const type = item.name ?? "";
                    const selected = garment === type;

                    if (!type) return null;

                    return (
                      <Pressable
                        key={item.id ?? type}
                        onPress={() => setGarment(type)}
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
                {/* Price */}
                <View className="flex-row gap-3 mb-6">
                  <View className="flex-1">
                    <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2">
                      Price
                    </Text>
                    <View className="flex-row items-center bg-foreground/5 rounded-2xl px-4 h-12">
                      <Text className="text-base font-manrope-bold text-gray-400 mr-1">
                        ₱
                      </Text>
                      <TextInput
                        value={price}
                        onChangeText={(t) => setPrice(t.replace(/[^0-9]/g, ""))}
                        placeholder="0"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="number-pad"
                        className="flex-1 h-full text-base text-foreground font-manrope-medium"
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>

              <View className="flex-row gap-3">
                {mode === "edit" && onDelete ? (
                  <Pressable
                    onPress={onDelete}
                    className="h-14 flex-1 rounded-2xl items-center justify-center bg-red-500/10"
                  >
                    <Text className="font-manrope-extrabold text-base text-red-500">
                      Delete
                    </Text>
                  </Pressable>
                ) : null}

                <Pressable
                  onPress={handleSubmit}
                  disabled={!isValid}
                  className={`h-14 ${mode === "edit" && onDelete ? "flex-1" : "w-full"} rounded-2xl items-center justify-center ${
                    isValid ? "bg-primary" : "bg-foreground/10"
                  }`}
                >
                  <Text
                    className={`font-manrope-extrabold text-base ${
                      isValid ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {submitLabel}
                  </Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
