import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";
import { Entypo } from "@expo/vector-icons";
import ButtonComp from "../../components/ButtonComp";

const PaymentMethodScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const handleBtnPress = () => {};
  const handlePaypalPress = () => {};
  const handleCardsPress = () => {};
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Choose payment method</Text>
          <View style={styles.paymentAndBtn}>
            <View style={styles.paymentMethod}>
              <TouchableOpacity
                onPress={handlePaypalPress}
                style={styles.commonDiv}
              >
                <View style={styles.nameIcon}>
                  <Image
                    style={styles.paymentIcons}
                    source={require("../../assets/Images/paypal.png")}
                  />
                  <Text style={styles.paymentText}>Paypal</Text>
                </View>
                <Entypo name="chevron-small-right" size={32} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCardsPress}
                style={styles.commonDiv}
              >
                <View style={styles.nameIcon}>
                  <Image
                    style={styles.paymentIcons}
                    source={require("../../assets/Images/bank-cards.png")}
                  />
                  <Text style={styles.paymentText}>Debit/credit card</Text>
                </View>
                <Entypo name="chevron-small-right" size={32} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.btn}>
            <ButtonComp height={60} handleBtnPress={handleBtnPress}>
              Next
            </ButtonComp>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: colors.white,
  },
  heading: {
    color: colors.textColor,
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: "23%",
  },
  paymentIcons: {
    width: 35,
    height: 35,
  },
  paymentText: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "500",
  },
  nameIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  commonDiv: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10%",
  },
  paymentMethod: {
    marginBottom: "65%",
  },
  btn: {
    flex: 1,
    marginBottom: "20%",
  },
  paymentAndBtn: {
    flex: 1,
    marginTop: "20%",
  },
});
