import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import TrucksNearMe from "./TrucksNearMe";

const LocationMainScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="truckNearMe" component={TrucksNearMe} />
    </Stack.Navigator>
  );
};

export default LocationMainScreen;

const styles = StyleSheet.create({});
