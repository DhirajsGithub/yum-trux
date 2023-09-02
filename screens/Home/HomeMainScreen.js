import { StyleSheet, Text, View, useAnimatedValue } from "react-native";
import React from "react";
import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const HomeMainScreen = () => {
  const navigation = useNavigation();
  const userDetails = useSelector((state) => state.userSlice.userDetails);
  console.log("userDetails, ", userDetails);
  return (
    <Stack.Navigator>
      <Stack.Screen name="homeScreen" component={HomeScreen} />
      <Stack.Screen name="settingScreen" component={SettingScreen} />
    </Stack.Navigator>
  );
};

export default HomeMainScreen;

const styles = StyleSheet.create({});
