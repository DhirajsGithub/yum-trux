import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import EmptyData from "../../components/EmptyData";
import ListComp from "../../components/ListComp";
import { truckListDetailHttp } from "../../utils/user-http-requests";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const FavouriteTrucks = () => {
  const userDetails = useSelector((state) => state.userSlice.userDetails);
  const userId = userDetails._id;
  const navigation = useNavigation();
  const [trucksData, setTrucksData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterFavTrucks, setFilterFavTrucks] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const fetchTrucksList = async () => {
    setLoading(true);
    let res = await truckListDetailHttp();
    if (res.status === "success") {
      let temp = [];
      for (let truck of res.truckList) {
        for (let item of userDetails.favouriteTrucks) {
          if (item.truckId === truck._id) {
            temp.push(truck);
          }
        }
      }
      setFilterFavTrucks(temp);
    } else {
      setTrucksData([]);
    }
    setLoading(false);
  };
  useEffect(() => {
    try {
      fetchTrucksList();
    } catch (error) {
      console.log(error);
    }
  }, [userDetails]);
  const handleBackBtnPress = () => {
    navigation.navigate("profileMain");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <View
          style={{
            paddingHorizontal: 25,
            flexDirection: "row",
            alignItems: "center",
            height: "8%",
          }}
        >
          <View style={{ flexDirection: "row", marginRight: 20 }}>
            <TouchableOpacity onPress={handleBackBtnPress}>
              <Ionicons
                name="chevron-back-circle"
                size={35}
                color={colors.textColor}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",

              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: 500, marginRight: 10 }}>
              Favourite Trucks{" "}
            </Text>
            <AntDesign name="star" size={28} color={colors.action} />
          </View>
        </View>

        {filterFavTrucks.length === 0 && <EmptyData msg="No truck found 😞" />}
        <ListComp screen="favTruck" trucksList={filterFavTrucks} />
      </SafeAreaView>
    </View>
  );
};

export default FavouriteTrucks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // paddingHorizontal: 30,
  },
});
