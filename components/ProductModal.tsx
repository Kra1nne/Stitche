import { icons } from "@/constants/icon";
import { useTheme } from "@/context/ThemeContext";
import { useGarments } from "@/hooks/useGarments";
import { useEffect, useState } from "react";
import {
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
const Camera = icons.camera;

export type ProductFormValues = {
  name: string;
  garment: string;
  price: string;
  quantity: number;
};

const EMPTY_VALUES: ProductFormValues = {
  name: "",
  garment: "",
  price: "",
  quantity: 1,
};

export default function ProductModal({
  visible,
  mode = "add",
  initialValues,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  /** "add" shows an empty form; "edit" pre-fills from initialValues */
  mode?: "add" | "edit";
  /** Pass the product's current values when mode="edit" */
  initialValues?: Partial<ProductFormValues>;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => void;
}) {
  const { garments } = useGarments();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const iconColor = isDarkMode ? "#f9fafb" : "#1f2937";

  const [name, setName] = useState(EMPTY_VALUES.name);
  const [garment, setGarment] = useState<string | null>(null);
  const [price, setPrice] = useState(EMPTY_VALUES.price);
  const [quantity, setQuantity] = useState(EMPTY_VALUES.quantity);

  // Populate the form whenever the modal opens, using initialValues in edit mode
  useEffect(() => {
    if (!visible) return;

    if (mode === "edit" && initialValues) {
      setName(initialValues.name ?? "");
      setGarment(initialValues.garment ?? null);
      setPrice(initialValues.price ?? "");
      setQuantity(initialValues.quantity ?? 1);
    } else {
      setName(EMPTY_VALUES.name);
      setGarment(null);
      setPrice(EMPTY_VALUES.price);
      setQuantity(EMPTY_VALUES.quantity);
    }
  }, [visible, mode, initialValues]);

  const isValid = name.trim().length > 0 && garment && price.trim().length > 0;

  const reset = () => {
    setName(EMPTY_VALUES.name);
    setGarment(null);
    setPrice(EMPTY_VALUES.price);
    setQuantity(EMPTY_VALUES.quantity);
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
              className="bg-background rounded-t-[32px] px-5 pt-4"
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
                {/* Image picker */}
                <Pressable className="w-28 h-28 rounded-2xl bg-foreground/5 border border-dashed border-foreground/15 items-center justify-center self-start mb-5">
                  <Camera width={22} height={22} fill="#9CA3AF" />
                  <Text className="text-[11px] font-manrope-medium text-gray-400 mt-1.5">
                    Add photo
                  </Text>
                </Pressable>

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

                {/* Garment type */}
                <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2">
                  Garment Type
                </Text>
                <View className="flex-row flex-wrap gap-2 mb-5">
                  {garments.map((g) => {
                    const selected = garment === g.name;

                    return (
                      <Pressable
                        key={g.id}
                        onPress={() => setGarment(g.name ?? "")}
                        className={`px-4 py-2 rounded-full border ${
                          selected
                            ? "bg-primary border-primary"
                            : "bg-foreground/5 border-foreground/5"
                        }`}
                      >
                        <Text
                          className={`text-xs font-manrope-semibold ${
                            selected ? "text-white" : "text-foreground"
                          }`}
                        >
                          {g.name}
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

              {/* Submit */}
              <Pressable
                onPress={handleSubmit}
                disabled={!isValid}
                className={`h-14 rounded-2xl items-center justify-center ${
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
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
