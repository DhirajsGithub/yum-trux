import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileMainScreen from "./ProfileMainScreen";
import ProfileEditScreen from "./ProfileEditScreen";
const Stack = createNativeStackNavigator();

const ProfileScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="profileMain" component={ProfileMainScreen} />
      <Stack.Screen name="profileEdit" component={ProfileEditScreen} />
    </Stack.Navigator>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
