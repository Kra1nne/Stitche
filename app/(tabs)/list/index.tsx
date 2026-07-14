import { icons } from "@/constants/icon";
import { useTheme } from "@/context/ThemeContext";
import { styled } from "nativewind";
import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Briefcase = icons.briefcase;
const Marker = icons.marker;
const Calendar = icons.calendar;
const Tshirt = icons.tshirt;
const Add = icons.add;
const Search = icons.search;
const QR_Scan = icons.qr_scan;
const Filter = icons.filter;

export default function Index() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const iconColor = isDarkMode ? "#f9fafb" : "#1f2937";
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const order = [
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

  const filteredOrders = order.filter((item) => {
    const query = search.toLowerCase();

    return (
      item.name.toLowerCase().includes(query) ||
      item.item.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query) ||
      item.address.toLowerCase().includes(query)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success";
      case "Pending":
        return "bg-accent";
      default:
        return "bg-primary";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-3xl mb-2 font-manrope-extrabold text-foreground">
          Orders
        </Text>
        <View className="gap-4 px-2 flex-row">
          <QR_Scan width={15} height={15} fill={iconColor} />
          <Filter width={15} height={15} fill={iconColor} />
        </View>
      </View>
      <View className="mb-2">
        <View className="flex-row items-center  border border-gray-200 rounded-2xl px-4 h-10 shadow-sm">
          <Search width={18} height={18} fill="#9CA3AF" />
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-3 text-base text-gray-900"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-16 gap-2"
        renderItem={({ item }) => (
          <View className="card">
            <View className="card-header">
              <View className="flex-row items-center gap-2">
                <View>
                  <Briefcase width={30} height={30} fill={iconColor} />
                </View>
                <View>
                  <Text className="card-title text-sm font-manrope-bold">
                    {item.name.split(" ").slice(0, 2).join(" ") +
                      (item.name.split(" ").length > 2 ? "..." : "")}
                  </Text>
                  <Text className="text-xs text-success font-manrope-medium">
                    {item.type}
                  </Text>
                </View>
              </View>

              <View
                className={`py-1 px-3 rounded-full ${getStatusColor(item.status)}`}
              >
                <Text className="text-white text-sm font-manrope-medium">
                  {item.status}
                </Text>
              </View>
            </View>
            <View>
              <View className="line"></View>
              <View className="mt-1">
                <View className="flex-row items-center gap-2">
                  <Tshirt width={10} height={10} fill={iconColor} />
                  <Text className="text-xs font-manrope-medium text-foreground">
                    {item.item}
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Marker width={10} height={10} fill={iconColor} />
                  <Text className="text-xs font-manrope-medium text-foreground">
                    {item.address}
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Calendar width={10} height={10} fill={iconColor} />
                  <Text className="text-xs font-manrope-medium text-foreground">
                    {item.due}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className=" mt-10 items-center gap-4">
            <Briefcase width={45} height={45} fill={iconColor} />
            <Text className="text-gray-500 font-manrope-extrabold text-xl">
              No orders found.
            </Text>
          </View>
        }
      />
      <Pressable
        onPress={() => setModalVisible(true)}
        className="absolute bottom-40 bg-primary p-1 rounded-full right-6 items-center justify-center"
        style={{ elevation: 6 }}
      >
        <Add width={26} height={26} fill={"#fff"} />
      </Pressable>
    </SafeAreaView>
  );
}
