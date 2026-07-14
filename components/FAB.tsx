import { Pressable } from "react-native";

export default function FAB({
  onPress,
  children,
  className = "",
}: {
  onPress: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`absolute bottom-40 right-6 w-14 h-14 rounded-full bg-primary items-center justify-center ${className}`}
      style={{
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      }}
    >
      {children}
    </Pressable>
  );
}
