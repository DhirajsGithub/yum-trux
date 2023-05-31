import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/store-slice";
import { baseUrl } from "../constants/baseUrl";
import { getUserDetailsHttp } from "../utils/user-http-requests";

const BlankScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const getUserData = async (userId) => {
    let res = await getUserDetailsHttp(userId);
    if (res.status === "success") {
      dispatch(setUserDetails(res.user));
    } else {
      alert("Internal server error");
    }
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@yumtrux_user");
      const val = JSON.parse(jsonValue);
      if (val?.token) {
        await getUserData(val.userId);
        navigation.navigate("main");
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
