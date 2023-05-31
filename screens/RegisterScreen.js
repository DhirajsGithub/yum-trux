import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import InputComp from "../components/InputComp";
import colors from "../constants/colors";
import ButtonComp from "../components/ButtonComp";
import { baseUrl } from "../constants/baseUrl";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { signupUserHttp } from "../utils/user-http-requests";

const RegisterScreen = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [wantMargin, setWantMargin] = useState(false);
  const [registerStatus, setRegisterStatus] = useState(null);
  const [registerMsg, setRegisterMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setCofirmPass] = useState("");
  const [username, setUsername] = useState("");
  const handleEmailValue = (value) => {
    setEmail(value);
  };
  const handlePasswordValue = (value) => {
    setPassword(value);
  };
  const handleConfirmPasswordValue = (value) => {
    setCofirmPass(value);
  };
  const handleUsernameValue = (value) => {
    setUsername(value);
  };
  const handleLoginPress = () => {
    navigation.navigate("login");
  };
  const signUpUserFunc = async () => {
    setLoading(true);
    let res = await signupUserHttp({ email, password, username });
    setLoading(false);
    setRegisterMsg(res.message);
    setRegisterStatus(res.status);
    if (res.status === "success") {
      navigation.navigate("login");
    }
  };
  const handleRegisterBtnPress = async () => {
    if (
      !email.includes("@") ||
      !email.includes(".") ||
      password.length < 3 ||
      confirmPass.length < 3 ||
      username.length < 3
    ) {
      alert("Fill all the fields with valid values");
      return;
    }
    if (confirmPass !== password) {
      setRegisterStatus("error");
      setRegisterMsg("Password and confirm password not matching");
      return;
    }
    try {
      await signUpUserFunc();
    } catch (error) {
      console.log(error);
    }
    // send http request
  };

  const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardVisible(true);
  });
  const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardVisible(false);
  });
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: keyboardVisible && wantMargin ? -100 : 0,
          }}
        >
          <Text style={styles.heading}>Create profile</Text>
          {registerStatus === "error" && (
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: 500,
                color: "#ff0033",
              }}
            >
              {registerMsg}
            </Text>
          )}
          <View style={styles.inputFields}>
            <InputComp
              inputValue={handleEmailValue}
              keyType="email-address"
              placeholder="Email"
            />
            <InputComp
              inputValue={handleUsernameValue}
              keyType="default"
              placeholder="Username"
            />
            <InputComp
              inputValue={handlePasswordValue}
              keyType="default"
              placeholder="Password"
              handleOnBlur={() => setWantMargin(false)}
              handleOnFocus={() => setWantMargin(true)}
            />
            <InputComp
              inputValue={handleConfirmPasswordValue}
              keyType="default"
              placeholder="Confirm password"
              handleOnBlur={() => setWantMargin(false)}
              handleOnFocus={() => setWantMargin(true)}
            />
          </View>

          <View style={styles.contentProfile}>
            <Text style={styles.content}>Already have an account? &nbsp; </Text>
            <TouchableOpacity onPress={handleLoginPress}>
              <Text style={[styles.content, styles.createProfile]}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.btn}>
            <ButtonComp height={60} handleBtnPress={handleRegisterBtnPress}>
              Register
            </ButtonComp>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default RegisterScreen;

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

    marginTop: "23%",
    marginBottom: "18%",
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
    marginBottom: "20%",
  },
  btn: {
    marginBottom: "15%",
  },
});
