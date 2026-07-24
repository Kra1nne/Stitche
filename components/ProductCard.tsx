import { Image } from "expo-image";
import { Text, View } from "react-native";

export type Product = {
  id: number;
  name: string;
  img: any;
  price: number;
  garment?: string;
};

export default function ProductCard({
  product,
  variant = "grid",
}: {
  product: Product;
  variant?: "grid" | "carousel";
}) {
  const isCarousel = variant === "carousel";

  return (
    <View
      className={`bg-foreground/[0.03] rounded-3xl border border-foreground/5 p-3 ${
        isCarousel ? "w-[160px]" : "w-full"
      }`}
    >
      <Image
        source={product.img}
        style={
          isCarousel
            ? { width: "100%", height: 140, borderRadius: 16 }
            : { width: "100%", aspectRatio: 1, borderRadius: 16 }
        }
      />
      <View className="flex-1 justify-between">
        <Text
          numberOfLines={2}
          className="mt-2.5 text-xs font-manrope-bold text-foreground"
        >
          {product.name}
        </Text>
        <View className="mt-2 self-start bg-primary/10 px-2.5 py-1 rounded-full">
          <Text className="text-xs font-manrope-extrabold text-primary">
            ₱{product.price.toLocaleString()}
          </Text>
        </View>
      </View>
      <View className="hidden">
        {product.garment ? (
          <Text className="mt-0.5 text-[11px] font-manrope-medium text-gray-400">
            {product.garment}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
