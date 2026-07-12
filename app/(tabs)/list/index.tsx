import { icons } from "@/constants/icon";
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

export default function Index() {
  const [search, setSearch] = useState("");
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
      <View className="mb-6 flex-row justify-between items-center">
        <Text className="text-3xl font-manrope-extrabold text-foreground">
          Orders
        </Text>
      </View>
      <View className="mb-4">
        <TextInput
          placeholder="Search orders..."
          value={search}
          onChangeText={setSearch}
          className="bg-white border border-gray-300 rounded-xl px-4 py-3"
          placeholderTextColor="#9ca3af"
        />
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
                  <Briefcase width={30} height={30} fill={"#1f2937"} />
                </View>
                <View>
                  <Text className="card-title text-sm manrope-bold">
                    {item.name}
                  </Text>
                  <Text className="text-xs text-success">{item.type}</Text>
                </View>
              </View>

              <View className={`p-1 ${getStatusColor(item.status)}`}>
                <Text className="text-white text-sm manrope-light">
                  {item.status}
                </Text>
              </View>
            </View>
            <View>
              <View className="line"></View>
              <View className="mt-1">
                <View className="flex-row items-center gap-2">
                  <Tshirt width={10} height={10} />
                  <Text className="text-xs manrope-medium">{item.item}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Marker width={10} height={10} />
                  <Text className="text-xs manrope-medium">{item.address}</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Calendar width={10} height={10} />
                  <Text className="text-xs manrope-medium">{item.due}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="card items-center gap-4">
            <Briefcase width={45} height={45} fill={"#1f2937"} />
            <Text className="text-gray-500 manrope-bolder text-xl">
              No orders found.
            </Text>
          </View>
        }
      />
      <Pressable
        onPress={() => {
          /* navigate to create order */
        }}
        className="absolute bottom-40 bg-primary p-1 rounded-full right-6 items-center justify-center"
        style={{ elevation: 6 }} // for Android shadow
      >
        <Add width={26} height={26} fill={"#fff"} />
      </Pressable>
    </SafeAreaView>
  );
}
