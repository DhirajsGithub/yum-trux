import { Alert, BackHandler, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp from "../../components/HeaderComp";
import ListComp from "../../components/ListComp";
import colors from "../../constants/colors";
import { trucksList } from "../../data/trucks";
import EmptyData from "../../components/EmptyData";

const TrucksList = () => {
  const navigation = useNavigation();
  const route = useRoute();
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
  const handleBackPress = () => {
    if (route.name === "trucksList" && navigation.isFocused()) {
      Alert.alert(
        "Exit App",
        "Are you sure you want to leave YumTrux",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Leave",
            onPress: () => BackHandler.exitApp(),
            style: "destructive",
          },
        ],
        {
          cancelable: false,
        }
      );
      return true;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
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
