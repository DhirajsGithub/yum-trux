import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp from "../../components/HeaderComp";
import ListComp from "../../components/ListComp";
import colors from "../../constants/colors";

const TrucksList = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <View style={{ marginHorizontal: 8 }}>
          <HeaderComp />
        </View>

        <ListComp />
      </SafeAreaView>
    </View>
  );
};

export default TrucksList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
