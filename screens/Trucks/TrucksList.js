import { Alert, BackHandler, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp from "../../components/HeaderComp";
import ListComp from "../../components/ListComp";
import colors from "../../constants/colors";
import { trucksList } from "../../data/trucks";
import EmptyData from "../../components/EmptyData";

const TrucksList = () => {
  const navigation = useNavigation();
  const [trucksData, setTrucksData] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const handleFilterPress = () => {
    navigation.navigate("trucksFilter");
  };
  useEffect(() => {
    setTrucksData(trucksList);
  }, []);
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInput = (text) => {
    const filterTrucks = trucksList.filter((truck) => {
      return truck.name?.toLowerCase().includes(text?.toLowerCase());
    });
    setTrucksData(filterTrucks);
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit", "Are you sure you want to exit", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Exit", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <View style={{ marginHorizontal: 16 }}>
          <HeaderComp
            // handleSearchPress={handleSearchPress}
            handleFilterPress={handleFilterPress}
            handleSearchInput={handleSearchInput}
            isTrucksList={true}
          />
        </View>
        {trucksData.length === 0 && <EmptyData msg="No truck found 😞" />}
        <ListComp trucksList={trucksData} />
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
