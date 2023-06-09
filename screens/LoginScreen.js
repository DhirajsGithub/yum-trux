import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputComp from "../components/InputComp";
import ButtonComp from "../components/ButtonComp";
import colors from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../constants/baseUrl";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/store-slice";
import { loginUserHttp } from "../utils/user-http-requests";

const LoginScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);
  const [LoginMsg, setLoginMsg] = useState("");
  const handleEmailValue = (value) => {
    setEmail(value);
  };
  const handlePasswordValue = (value) => {
    setPassword(value);
  };

  const storeData = async (data) => {
    try {
      await AsyncStorage.setItem("@yumtrux_user", JSON.stringify(data));
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    if (route.name === "login" && navigation.isFocused()) {
      BackHandler.addEventListener("hardwareBackPress", BackHandler.exitApp());
    }
  });

  const loginUserFunc = async () => {
    setLoading(true);
    let res = await loginUserHttp({ email, password });
    setLoading(false);
    if (res.status === "success") {
      try {
        await storeData({
          token: res.token,
          email: res.user.email,
          userId: res.user._id,
        });
        dispatch(setUserDetails(res.user));
        navigation.navigate("main");
      } catch (error) {
        console.log(error);
      }
    }
    setLoginMsg(res.message);
    setLoginStatus(res.status);
    return;
  };

  const handleLoginBtnPress = () => {
    if (!email.includes("@") || !email.includes(".") || password.length < 3) {
      alert("Enter valid email and password");
      return;
    }
    try {
      loginUserFunc();
    } catch (error) {
      console.log(error);
    }
    // send http request
  };
  const handleCreateProfilePress = () => {
    navigation.navigate("register");
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
      <SafeAreaView style={styles.alignment}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Login</Text>
          {loginStatus === "error" && (
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: 500,
                color: "#ff0033",
              }}
            >
              {LoginMsg}
            </Text>
          )}
          <View>
            <InputComp
              inputValue={handleEmailValue}
              keyType="email-address"
              placeholder="Email"
            />
            <InputComp
              inputValue={handlePasswordValue}
              keyType="default"
              placeholder="Password"
            />
          </View>
          <View style={styles.contentProfile}>
            <Text style={styles.content}>
              Dont have an account yet? &nbsp;{" "}
            </Text>
            <TouchableOpacity onPress={handleCreateProfilePress}>
              <Text style={[styles.content, styles.createProfile]}>
                Create profile
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btn}>
            <ButtonComp height={60} handleBtnPress={handleLoginBtnPress}>
              Login
            </ButtonComp>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  heading: {
    color: colors.textColor,
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: "23%",
  },
  content: {
    color: colors.textColor,
    fontSize: 15,
    fontWeight: "500",
  },
  createProfile: {
    borderBottomColor: colors.textColor,
    textDecorationLine: "underline",
  },
  contentProfile: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "60%",
  },
  btn: {
    // flex: 1,
    marginBottom: "15%",
    // flexDirection: "column",
    // justifyContent: "flex-end",
  },
});
