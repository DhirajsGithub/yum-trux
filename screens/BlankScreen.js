import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/store-slice";
import { baseUrl } from "../constants/baseUrl";
import { getUserDetailsHttp, getUserStatus } from "../utils/user-http-requests";

const BlankScreen = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const getUserData = async (userId) => {
    setLoading(true);
    let res = await getUserDetailsHttp(userId);
    setLoading(false);
    console.log(res);
    if (res.status === "success" && res.user) {
      dispatch(setUserDetails(res.user));
    } else {
      navigation.navigate("login");
    }
    return res;
  };
  const fetchUserStatus = async (userId) => {
    setLoading(true);
    const res = await getUserStatus(userId);
    setLoading(false);
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
          setLoading(true);
          let res = await getUserData(val.userId);
          setLoading(false);
          if (res.status === "success" && res.user) {
            navigation.navigate("main");
          } else {
            navigation.navigate("login");
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      } else {
        navigation.navigate("login");
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  useEffect(() => {
    try {
      getData();
    } catch (error) {
      setLoading(false);
    }
  }, []);
  return (
    <View style={styles.container}>
      {loading && <Text style={{ color: "white" }}>Loading...</Text>}
      {!loading && <Text style={{ color: "white" }}>Blank Screen</Text>}
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
