import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PreviousOrders from "./PreviousOrders";
const Stack = createNativeStackNavigator();

const OrderHistoryMain = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="previousOrders" component={PreviousOrders} />
      {/* <Stack.Screen name="truckDetail" component={TruckDetailScreen} />
      <Stack.Screen name="trucksFilter" component={TrucksFilterScreen} /> */}
    </Stack.Navigator>
  );
};

export default OrderHistoryMain;

const styles = StyleSheet.create({});
