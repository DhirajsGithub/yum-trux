import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../constants/colors";

const TrucksNearMe = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <ScrollView>
          <Text>Location screen new Screen</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TrucksNearMe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
