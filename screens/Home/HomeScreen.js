import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import TrucksList from "./TrucksList";

const HomeScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="trucksList" component={TrucksList} />
      {/* <Stack.Screen name="profileEdit" component={ProfileEditScreen} /> */}
    </Stack.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
