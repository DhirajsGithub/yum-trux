import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import TrucksList from "./TrucksList";
import TruckDetailScreen from "./TruckDetailScreen";
import TrucksFilterScreen from "./TrucksFilterScreen";
import OrderScreen from "./OrderScreen";

const HomeScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="trucksList" component={TrucksList} />
      <Stack.Screen name="truckDetail" component={TruckDetailScreen} />
      <Stack.Screen name="trucksFilter" component={TrucksFilterScreen} />
      <Stack.Screen name="order" component={OrderScreen} />
    </Stack.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
