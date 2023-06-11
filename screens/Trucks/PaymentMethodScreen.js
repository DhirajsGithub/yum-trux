import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../constants/colors";
import { Entypo } from "@expo/vector-icons";
import ButtonComp from "../../components/ButtonComp";
import { createPaymentIntent } from "../../utils/user-http-requests";
import { useStripe } from "@stripe/stripe-react-native";
import { baseUrl } from "../../constants/baseUrl";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";

const PaymentMethodScreen = () => {
  const userDetails = useSelector((state) => state.userSlice.userDetails);
  const params = useRoute().params;
  const paymentId = params.paymentId;
  const truckName = params.truckName;
  const amount = params.totalWithTaxAndTip
    ? Number(params.totalWithTaxAndTip).toFixed(2) * 100
    : 0;
  console.log(amount);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const handleBtnPress = () => {
    navigation.goBack();
  };
  const handlePaypalPress = () => {
    alert(
      "Paypal payment not available at this moment \n Sorry for inconvenience"
    );
  };
  const handleSuceesPaymentPress = () => {
    navigation.navigate("successOrder", {
      ...params,
    });
  };

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(baseUrl + "payments/createPaymentSheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, paymentId }),
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };
  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: truckName,
      customerId: customer,

      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: userDetails.fullName,
      },
    });
    if (!error) {
      setLoading(false);
    }
    if (error) {
      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!", [
        {
          text: "OK",
          onPress: handleSuceesPaymentPress,
        },
      ]);
    }
  };
  const handleCardsPress = async () => {
    try {
      setLoading(true);
      let res = await initializePaymentSheet();
      let sheet = await openPaymentSheet();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Choose payment method</Text>
          {loading && (
            <Text style={{ marginTop: 10, color: colors.action, fontSize: 20 }}>
              Loading...
            </Text>
          )}
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
              BACK
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
