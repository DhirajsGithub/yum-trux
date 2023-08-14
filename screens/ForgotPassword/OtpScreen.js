import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import { passwordReset } from "../../utils/user-http-requests";
import Spinner from "react-native-loading-spinner-overlay/lib";
const statusBarHeight = Constants.statusBarHeight;
const OtpScreen = () => {
  const [otp, setOtp] = useState("");
  const route = useRoute();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const onChangeOtp = (text) => {
    setOtp(text);
  };
  const handlePassChange = (text) => {
    setError(null);
    setPassword(text);
  };
  const handleConfirmPassChange = (text) => {
    setError(null);
    setConfirmPassword(text);
  };
  const handleSavePress = async () => {
    if (password !== confirmPassword) {
      setError("Password and Confirm password doesn't match");
      return;
    }
    try {
      setLoading(true);
      let res = await passwordReset(otp, route.params.email, password);
      console.log(res);
      setLoading(false);
      if (res.status === "error") {
        setError(res.message);
        return;
      }
      if (res.status === "success" && res.email) {
        navigation.navigate("login");
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
        <Text style={styles.headText}>OTP</Text>
        <Text style={styles.para}>
          Enter OTP send to your email{" "}
          <Text style={{ fontWeight: "700", color: colors.textColor }}>
            {route.params.email}
          </Text>
        </Text>
        <View style={styles.inputView}>
          <TextInput
            onChangeText={onChangeOtp}
            placeholder="xxxxx"
            style={[styles.input, { width: "50%", textAlign: "center" }]}
            keyboardType="number-pad"
            maxLength={5}
          />
        </View>

        {/* // ---- */}
        <Text style={[styles.headText, { marginTop: 40 }]}>Password</Text>
        <Text style={styles.para}>Enter a new password to set</Text>
        <View>
          <TextInput
            onChangeText={handlePassChange}
            placeholder="New Password"
            style={[styles.input, { marginVertical: 25 }]}
            keyboardType="default"
            secureTextEntry={true}
            onFocus={() => setError(null)}
          />
          <TextInput
            onChangeText={handleConfirmPassChange}
            placeholder="Confirm Password"
            style={styles.input}
            keyboardType="default"
            secureTextEntry={true}
            onFocus={() => setError(null)}
          />
        </View>
        <View style={{ marginTop: 40 }}>
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

          <TouchableOpacity onPress={handleSavePress} style={styles.btnView}>
            <Text style={styles.btnText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default OtpScreen;

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
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
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
