import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const InitialScreen = () => {
  // ----
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <ScrollView>
          <Text>Register Screen</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );

  // ----
};

export default InitialScreen;

const styles = StyleSheet.create({});
