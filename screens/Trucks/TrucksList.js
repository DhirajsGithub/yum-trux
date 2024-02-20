import { Alert, BackHandler, StyleSheet, Text, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp from "../../components/HeaderComp";
import ListComp from "../../components/ListComp";
import colors from "../../constants/colors";
import EmptyData from "../../components/EmptyData";
import { useSelector } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { truckListDetailHttp } from "../../utils/user-http-requests";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TrucksList = () => {
  const userDetails = useSelector((state) => state.userSlice.userDetails);
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [trucksData, setTrucksData] = useState([]);
  const [trucksDataUnFilter, setTrucksDataUnFilter] = useState([]);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     try {
  //       fetchTrucksList();
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error);
  //     }
  //   }, [])
  // );

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
      setLoading(false);
      console.log(error);
    }
  }, []);
  const handleSearchInput = (text) => {
    const filterTrucks = trucksDataUnFilter.filter((truck) => {
      return (truck?.name + truck?.category)
        ?.toLowerCase()
        .includes(text?.toLowerCase());
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

  const handleRefreshFunc = async () => {
    try {
      fetchTrucksList();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
        {trucksData.length === 0 && !loading && (
          <EmptyData msg="No truck found 😞" />
        )}
        <ListComp
          handleRefreshFunc={handleRefreshFunc}
          screen="truckList"
          trucksList={trucksData}
        />
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
