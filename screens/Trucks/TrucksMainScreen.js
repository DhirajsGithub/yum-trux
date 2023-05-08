import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import TrucksList from "./TrucksList";
import TruckDetailScreen from "./TruckDetailScreen";

const HomeScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="trucksList" component={TrucksList} />
      <Stack.Screen name="truckDetail" component={TruckDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
