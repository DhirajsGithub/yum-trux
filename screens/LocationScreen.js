import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const LocationScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <Text>Location Screen</Text>
      </SafeAreaView>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({});
