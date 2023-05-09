import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const HomeMainScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="homeScreen" component={HomeScreen} />
      <Stack.Screen name="settingScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
};

export default HomeMainScreen;

const styles = StyleSheet.create({});
