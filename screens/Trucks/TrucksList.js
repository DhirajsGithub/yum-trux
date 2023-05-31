import { Alert, BackHandler, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp from "../../components/HeaderComp";
import ListComp from "../../components/ListComp";
import colors from "../../constants/colors";
import EmptyData from "../../components/EmptyData";
import { useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { truckListDetailHttp } from "../../utils/user-http-requests";

const TrucksList = () => {
  const userDetails = useSelector((state) => state.userSlice.userDetails);
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [trucksData, setTrucksData] = useState([]);
  const [trucksDataUnFilter, setTrucksDataUnFilter] = useState([]);

  const fetchTrucksList = async () => {
    setLoading(true);
    let res = await truckListDetailHttp();
    if (res.status === "success") {
      setTrucksData(res.truckList);
      setTrucksDataUnFilter(res.truckList);
    } else {
      setTrucksData([]);
    }
    setLoading(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const handleFilterPress = () => {
    navigation.navigate("trucksFilter");
  };
  useEffect(() => {
    try {
      fetchTrucksList();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInput = (text) => {
    const filterTrucks = trucksDataUnFilter.filter((truck) => {
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
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        // textContent={'Loading...'}
        color={colors.action}
        // textStyle={styles.spinnerTextStyle}
      />
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
        <ListComp screen="truckList" trucksList={trucksData} />
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
