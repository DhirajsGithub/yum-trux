import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReviewMainScreen from "./ReviewMainScreen";
const Stack = createNativeStackNavigator();

const ReviewScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="reviewMain" component={ReviewMainScreen} />
      {/* <Stack.Screen name="profileEdit" component={ProfileEditScreen} /> */}
    </Stack.Navigator>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({});
