import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const TrucksScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <Text>Trucks Screen</Text>
      </SafeAreaView>
    </View>
  );
};

export default TrucksScreen;

const styles = StyleSheet.create({});
