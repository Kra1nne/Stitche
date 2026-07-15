import EmptyState from "@/components/EmptyState";
import FAB from "@/components/FAB";
import Screen from "@/components/Screen";
import ScreenHeader from "@/components/ScreenHeader";
import SearchBar from "@/components/SearchBar";
import StatusBadge from "@/components/StatusBadge";
import { icons } from "@/constants/icon";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

const Briefcase = icons.briefcase;
const Marker = icons.marker;
const Calendar = icons.calendar;
const Tshirt = icons.tshirt;
const Add = icons.add;
const QR_Scan = icons.qr_scan;
const Filter = icons.filter;

const ORDERS = [
  {
    id: 1,
    name: "John Doe",
    address: "123 Main St, Cebu City, Cebu",
    type: "Replacement",
    item: "T-Shirt",
    count: 10,
    price: 350,
    size: "S",
    total: 3500,
    status: "Pending",
    due: "April 15, 2026",
  },
  {
    id: 2,
    name: "Jane Smith",
    address: "45 Mango Ave, Cebu City, Cebu",
    type: "Resizing",
    item: "Hoodie",
    count: 5,
    price: 850,
    size: "M",
    total: 4250,
    status: "Completed",
    due: "April 18, 2026",
  },
  {
    id: 3,
    name: "Michael Brown",
    address: "78 Banilad Rd, Cebu City, Cebu",
    type: "Custom",
    item: "Polo Shirt",
    count: 8,
    price: 500,
    size: "Customize",
    total: 4000,
    status: "In Progress",
    due: "April 20, 2026",
  },
  {
    id: 4,
    name: "Emily Davis",
    address: "12 Lahug St, Cebu City, Cebu",
    type: "Replacement",
    item: "Jersey",
    count: 12,
    price: 600,
    size: "XL",
    total: 7200,
    status: "Pending",
    due: "April 22, 2026",
  },
  {
    id: 5,
    name: "Chris Wilson",
    address: "89 Colon St, Cebu City, Cebu",
    type: "Custom",
    item: "T-Shirt",
    count: 20,
    price: 350,
    size: "L",
    total: 7000,
    status: "Completed",
    due: "April 25, 2026",
  },
  {
    id: 6,
    name: "Sophia Garcia",
    address: "56 Escario St, Cebu City, Cebu",
    type: "Resizing",
    item: "Hoodie",
    count: 6,
    price: 850,
    size: "Customize",
    total: 5100,
    status: "Pending",
    due: "April 27, 2026",
  },
  {
    id: 7,
    name: "Daniel Martinez",
    address: "101 Gorordo Ave, Cebu City, Cebu",
    type: "Replacement",
    item: "Jacket",
    count: 4,
    price: 1200,
    size: "M",
    total: 4800,
    status: "In Progress",
    due: "April 30, 2026",
  },
  {
    id: 8,
    name: "Olivia Anderson",
    address: "67 IT Park, Cebu City, Cebu",
    type: "Custom",
    item: "Polo Shirt",
    count: 15,
    price: 500,
    size: "Customize",
    total: 7500,
    status: "Completed",
    due: "May 2, 2026",
  },
  {
    id: 9,
    name: "James Taylor",
    address: "22 Talamban Rd, Cebu City, Cebu",
    type: "Resizing",
    item: "T-Shirt",
    count: 18,
    price: 350,
    size: "XXL",
    total: 6300,
    status: "Pending",
    due: "May 5, 2026",
  },
  {
    id: 10,
    name: "Ava Thomas",
    address: "9 Mandaue Highway, Mandaue City, Cebu",
    type: "Replacement",
    item: "Jersey",
    count: 7,
    price: 600,
    size: "Customize",
    total: 4200,
    status: "In Progress",
    due: "May 8, 2026",
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

export default function Index() {
  const { iconColor, mutedIconColor, isDarkMode } = useThemeColors();
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const filteredOrders = ORDERS.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.item.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query) ||
      item.address.toLowerCase().includes(query)
    );
  });

  return (
    <Screen>
      <ScreenHeader
        title="Orders"
        subtitle={`${filteredOrders.length} order${filteredOrders.length === 1 ? "" : "s"}`}
        actions={[
          { icon: <QR_Scan width={17} height={17} fill={iconColor} /> },
          { icon: <Filter width={17} height={17} fill={iconColor} /> },
        ]}
      />

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search orders, items, status..."
        mutedIconColor={mutedIconColor}
      />

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-24 gap-3"
        renderItem={({ item }) => (
          <Pressable
            className="bg-foreground/[0.03] rounded-3xl p-4 border border-foreground/5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: isDarkMode ? 0 : 0.04,
              shadowRadius: 8,
            }}
          >
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-3 flex-1 pr-2">
                <View className="w-11 h-11 rounded-full bg-primary/10 items-center justify-center">
                  <Text className="text-primary font-manrope-bold text-sm">
                    {getInitials(item.name)}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text
                    className="text-[15px] font-manrope-bold text-foreground"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text className="text-xs font-manrope-medium text-gray-400 mt-0.5">
                    {item.type} · {item.item}
                  </Text>
                </View>
              </View>
              <StatusBadge status={item.status} />
            </View>

            <View className="h-px bg-foreground/5 mb-3" />

            <View className="gap-1.5">
              <View className="flex-row items-center gap-2">
                <Marker width={12} height={12} fill={mutedIconColor} />
                <Text
                  className="text-xs font-manrope-medium text-gray-400 flex-1"
                  numberOfLines={1}
                >
                  {item.address}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Calendar width={12} height={12} fill={mutedIconColor} />
                <Text className="text-xs font-manrope-medium text-gray-400">
                  Due {item.due}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-foreground/5">
              <View className="flex-row items-center gap-1.5">
                <Tshirt width={12} height={12} fill={iconColor} />
                <Text className="text-xs font-manrope-medium text-foreground">
                  {item.count}× {item.size}
                </Text>
              </View>
              <Text className="text-sm font-manrope-extrabold text-foreground">
                ₱{item.total.toLocaleString()}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <EmptyState
            icon={<Briefcase width={28} height={28} fill={iconColor} />}
            title="No orders found"
            subtitle="Try a different search term"
          />
        }
      />

      <FAB onPress={() => setModalVisible(true)}>
        <Add width={24} height={24} fill="#fff" />
      </FAB>
    </Screen>
  );
}
