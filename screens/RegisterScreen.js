import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import InputComp from "../components/InputComp";
import colors from "../constants/colors";
import ButtonComp from "../components/ButtonComp";

const RegisterScreen = () => {
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
  const handleRegisterBtnPress = () => {
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
    navigation.navigate("login");
    // send http request
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <Text style={styles.heading}>Create profile</Text>
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
          />
          <InputComp
            inputValue={handleConfirmPasswordValue}
            keyType="default"
            placeholder="Confirm password"
          />
        </View>

        <View style={styles.contentProfile}>
          <Text style={styles.content}>Already have an account? &nbsp; </Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={[styles.content, styles.createProfile]}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btn}>
          <ButtonComp handleBtnPress={handleRegisterBtnPress}>
            Register
          </ButtonComp>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  heading: {
    color: colors.textColor,
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    // marginVertical: "23%",
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
});
