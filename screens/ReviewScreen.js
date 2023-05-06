import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const ReviewScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <Text>Review Screen</Text>
      </SafeAreaView>
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({});
