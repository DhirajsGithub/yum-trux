import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { sendOtp } from "../../utils/user-http-requests";
const statusBarHeight = Constants.statusBarHeight;
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const onChangeEmail = (text) => {
    setError(null);
    setEmail(text);
  };
  const handleSendOtpPress = async () => {
    if (email.length === 0) {
      return;
    }
    try {
      setLoading(true);
      let res = await sendOtp(email);
      setLoading(false);
      console.log(res);
      if (res.status === "error") {
        setError(res.message);
        return;
      }
      if (res.status === "success" && res.email === email) {
        navigation.navigate("otpScreen", { email: email });
        return;
      }
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
      <View style={styles.header}>
        <View style={styles.backChevron}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="leftcircle" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.safeArea}>
        <Text style={styles.headText}>ForgotPassword</Text>
        <Text style={styles.para}>
          Enter your email and we will send you a reset code
        </Text>
        <View style={styles.inputView}>
          <TextInput
            onChangeText={onChangeEmail}
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            onFocus={() => setError(null)}
          />
        </View>
        <View>
          {error && (
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: 500,
                color: "#ff0033",
              }}
            >
              {error}
            </Text>
          )}
          <TouchableOpacity onPress={handleSendOtpPress} style={styles.btnView}>
            <Text style={styles.btnText}>SEND OTP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  safeArea: {
    paddingHorizontal: 30,
  },
  header: {
    backgroundColor: colors.inputBg,
    // height: 100,
    paddingTop: statusBarHeight,
    paddingBottom: 20,
    paddingHorizontal: 30,
  },
  backChevron: {
    display: "flex",
    flexDirection: "row",
  },
  headText: {
    fontSize: 25,
    fontWeight: "700",
    color: colors.textColor,
    marginVertical: 10,
    marginTop: 20,
  },
  para: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray,
  },
  inputView: {
    marginVertical: 20,
    marginTop: 50,
  },
  input: {
    borderBottomColor: colors.inputBg,
    borderBottomWidth: 1,
    fontSize: 22,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  btnView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.action,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});
