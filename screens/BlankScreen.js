import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/store-slice";
import { baseUrl } from "../constants/baseUrl";
import { getUserDetailsHttp, getUserStatus } from "../utils/user-http-requests";

const BlankScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const getUserData = async (userId) => {
    let res = await getUserDetailsHttp(userId);
    console.log(res);
    if (res.status === "success" && res.user) {
      dispatch(setUserDetails(res.user));
    } else {
      navigation.navigate("login");
    }
    return res;
  };
  const fetchUserStatus = async (userId) => {
    const res = await getUserStatus(userId);
    if ((res.status && res.status === "inactive") || !res.status) {
      navigation.navigate("login");
      return;
    }
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@yumtrux_user");
      const val = JSON.parse(jsonValue);
      fetchUserStatus(val.userId);
      if (val?.token) {
        try {
          let res = await getUserData(val.userId);
          if (res.status === "success" && res.user) {
            navigation.navigate("main");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        navigation.navigate("login");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>Loading...</Text>
    </View>
  );
};

export default BlankScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
