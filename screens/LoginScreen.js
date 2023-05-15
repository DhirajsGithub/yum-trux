import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputComp from "../components/InputComp";
import ButtonComp from "../components/ButtonComp";
import colors from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailValue = (value) => {
    setEmail(value);
  };
  const handlePasswordValue = (value) => {
    setPassword(value);
  };
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@yumtrux", email);
    } catch (e) {
      // saving error
    }
  };

  // need to add another splash screen for this
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@yumtrux");
      const val = jsonValue;
      if (val) {
        navigation.navigate("main");
      }
    } catch (e) {
      // error reading value
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleLoginBtnPress = () => {
    if (!email.includes("@") || !email.includes(".") || password.length < 3) {
      alert("Enter valid email and password");
      return;
    }
    storeData();
    navigation.navigate("main");
    // send http request
  };
  const handleCreateProfilePress = () => {
    navigation.navigate("register");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.alignment}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Login</Text>
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
