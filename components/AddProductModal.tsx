import { icons } from "@/constants/icon";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
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
const Minus = icons.minus;
const Plus = icons.add;

const GARMENTS = [
  "T-Shirt",
  "Hoodie",
  "Polo Shirt",
  "Shorts",
  "Jersey",
  "Jacket",
];
const SIZES = ["S", "M", "L", "XL", "XXL", "Customize"];

export type NewProduct = {
  name: string;
  garment: string;
  size: string;
  price: string;
  quantity: number;
};

export default function AddProductModal({
  visible,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (product: NewProduct) => void;
}) {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const iconColor = isDarkMode ? "#f9fafb" : "#1f2937";

  const [name, setName] = useState("");
  const [garment, setGarment] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);

  const isValid =
    name.trim().length > 0 && garment && size && price.trim().length > 0;

  const reset = () => {
    setName("");
    setGarment(null);
    setSize(null);
    setPrice("");
    setQuantity(1);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = () => {
    if (!isValid || !garment || !size) return;
    onSubmit({
      name: name.trim(),
      garment,
      size,
      price: price.trim(),
      quantity,
    });
    reset();
    onClose();
  };

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
                  Add Product
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
                  {GARMENTS.map((g) => {
                    const selected = garment === g;
                    return (
                      <Pressable
                        key={g}
                        onPress={() => setGarment(g)}
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
                          {g}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                {/*                 
                <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2">
                  Size
                </Text>
                <View className="flex-row flex-wrap gap-2 mb-5">
                  {SIZES.map((s) => {
                    const selected = size === s;
                    return (
                      <Pressable
                        key={s}
                        onPress={() => setSize(s)}
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
                          {s}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View> */}

                {/* Price + Quantity */}
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
                  {/* 
                  <View>
                    <Text className="text-xs font-manrope-bold text-gray-400 uppercase mb-2">
                      Quantity
                    </Text>
                    <View className="flex-row items-center bg-foreground/5 rounded-2xl h-12 px-1.5">
                      <Pressable
                        onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-9 h-9 rounded-xl items-center justify-center active:bg-foreground/10"
                      >
                        <Minus width={14} height={14} fill={iconColor} />
                      </Pressable>
                      <Text className="w-8 text-center text-base font-manrope-bold text-foreground">
                        {quantity}
                      </Text>
                      <Pressable
                        onPress={() => setQuantity((q) => q + 1)}
                        className="w-9 h-9 rounded-xl items-center justify-center active:bg-foreground/10"
                      >
                        <Plus width={14} height={14} fill={iconColor} />
                      </Pressable>
                    </View>
                  </View> */}
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
                  Add Product
                </Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
