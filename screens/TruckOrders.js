import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const TruckOrders = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <Text>Truck Orders</Text>
      </SafeAreaView>
    </View>
  );
};

export default TruckOrders;

const styles = StyleSheet.create({});
