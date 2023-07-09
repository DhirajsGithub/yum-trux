import {
  Alert,
  Image,
  Modal,
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
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import date from "date-and-time";

import {
  addToAllOrdersHttp,
  capturePaypalPayment,
  createPaymentIntent,
  createPaypalOrder,
  generatePaypalAccessToken,
  generatePaypalToken,
} from "../../utils/user-http-requests";
import { useStripe } from "@stripe/stripe-react-native";
import { baseUrl } from "../../constants/baseUrl";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import { removeCurrentOrder } from "../../store/store-slice";

const PaymentMethodScreen = () => {
  const dispatch = useDispatch();
  const statusBarHeight = Constants.statusBarHeight;
  const userDetails = useSelector((state) => state.userSlice.userDetails);
  const userSlice = useSelector((state) => state.userSlice);
  const userId = userSlice.userDetails._id;
  const currentOrders = userSlice.currentOrders;
  const params = useRoute().params;
  const paymentId = params.paymentId;
  const paypalEmail = params.paypalEmail;
  console.log("orders param data ", params);
  console.log("paypla email", paypalEmail);
  console.log("stripe id ", paymentId);
  const truckName = params.truckName;
  const amount = params.totalWithTaxAndTip
    ? Number(params.totalWithTaxAndTip).toFixed(2) * 100
    : 0;
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paypalAccessToken, setPaypalAccessToken] = useState(null);
  const [paypaylApprovedUrl, setPaypalApprovedUrl] = useState(null);
  const [paypalPaymentSuccess, setPaypalPaymentSuccess] = useState(false);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const handleBtnPress = () => {
    navigation.goBack();
  };

  // -------------------- success payment function -------------------

  const orderSummaryToStore = () => {
    let totalPrice = 0;
    let tempMenuIds = [];
    for (let item of currentOrders) {
      tempMenuIds.push({
        itemId: item.itemId,
      });
      totalPrice = totalPrice + item.itemPrice;
    }
    const tempDate = new Date();
    let tim = date.format(tempDate, "hh:mm A");
    let dat = date.format(tempDate, "MMM D");
    const reqDate = tim + ", " + dat;
    let reqData = {
      items: tempMenuIds,
      orderOn: reqDate,
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      truckId: params.truckId,
    };
    return reqData;
  };

  const addToAllOrdersFunc = async () => {
    const data = orderSummaryToStore();
    if (currentOrders.length > 0) {
      if (params?.newOrder === true) {
        let res = await addToAllOrdersHttp(userId, data);
        // dispatch(addToAllOrders());
        dispatch(removeCurrentOrder());
      }
      if (params?.newOrder === false) {
        dispatch(removeCurrentOrder());
      }
    }
  };

  const handleSuceesPaymentPress = async (method) => {
    if (method === "paypal") {
      if (paypalAccessToken && paypaylApprovedUrl) {
        await addToAllOrdersFunc();
        navigation.navigate("successOrder", {
          ...params,
        });
      }
      return;
    } else {
      await addToAllOrdersFunc();
      navigation.navigate("successOrder", {
        ...params,
      });
      return;
    }
  };
  // -------------------------------------------------------------------------

  // -----------------PAYPAL-----------------

  // const handlePaypalPress = async () => {
  //   try {
  //     setLoading(true);
  //     let res = await generatePaypalToken();
  //     setLoading(false);

  //     let token = res.access_token;
  //     setPaypalAccessToken(token);
  //     if (token) {
  //       setLoading(true);
  //       let res = await createPaypalOrder(token, {
  //         intent: "CAPTURE",
  //         purchase_units: [
  //           {
  //             items: [
  //               {
  //                 name: "T-Shirt",
  //                 description: "Green XL",
  //                 quantity: "1",
  //                 unit_amount: {
  //                   currency_code: "USD",
  //                   value: "250.00",
  //                 },
  //               },
  //             ],
  //             amount: {
  //               currency_code: "USD",
  //               value: "250.00",
  //               breakdown: {
  //                 item_total: {
  //                   currency_code: "USD",
  //                   value: "250.00",
  //                 },
  //               },
  //             },
  //           },
  //         ],
  //         application_context: {
  //           return_url: "https://example.com/return",
  //           cancel_url: "https://example.com/cancel",
  //         },
  //       });
  //       setLoading(false);
  // let approvedLink = res.links.find((link) => link.rel === "approve");
  // if (approvedLink) {
  //   setPaypalApprovedUrl(approvedLink.href);
  // }
  // }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };
  console.log(params.totalWithTaxAndTip);
  console.log(Number(params.totalWithTaxAndTip).toFixed(2));
  const handlePaypalPress = async () => {
    if (paypalEmail && paypalEmail.length > 0) {
      setPaypalPaymentSuccess(false);
      let token = null;
      try {
        setLoading(true);
        token = await generatePaypalAccessToken();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
      console.log(token);
      if (token?.access_token) {
        setPaypalAccessToken(token.access_token);
        try {
          setLoading(true);
          let res = await createPaypalOrder(token.access_token, {
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: Number(params.totalWithTaxAndTip.toFixed(2)),
                },
                payee: {
                  email_address: paypalEmail,
                },
                payment_instruction: {
                  disbursement_mode: "INSTANT",
                  platform_fees: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: "00.00",
                      },
                    },
                  ],
                },
              },
            ],
            application_context: {
              return_url: "https://example.com/return",
              cancel_url: "https://example.com/cancel",
            },
          });
          setLoading(false);
          if (res?.links) {
            let approvedLink = res.links.find((link) => link.rel === "approve");
            if (approvedLink?.href) {
              setPaypalApprovedUrl(approvedLink.href);
            }
          }
        } catch (error) {
          setLoading(false);
          console.log("error is " + error);
        }
      } else {
        alert("Try again ");
      }
    } else {
      alert("Paypal payment is not available for this truck.");
    }
  };
  const onPaypalUrlChange = (webViewState) => {
    console.log("webveiw state ", webViewState);
    if (webViewState?.url?.includes("https://example.com/cancel")) {
      clearPaypalState();
      alert("Paypal payment cancelled ❗️");
      return;
    }
    if (webViewState?.url?.includes("https://example.com/return")) {
      const urlValue = queryString.parseUrl(webViewState.url);
      console.log("url value ", urlValue);
      const { token } = urlValue.query;
      if (
        !!token &&
        paypaylApprovedUrl &&
        paypalAccessToken &&
        !paypalPaymentSuccess
      ) {
        paypalPaymentStatus(token);
        return;
      }
      clearPaypalState();
      return;
    }
  };

  const paypalPaymentStatus = async (id) => {
    setPaypalPaymentSuccess(true);
    if (paypaylApprovedUrl && paypalAccessToken) {
      try {
        setLoading(true);
        let res = await capturePaypalPayment(paypalAccessToken, id);
        console.log("capture payment res ", res);
        clearPaypalState();
        setLoading(false);
        if (
          res?.status === "COMPLETED" ||
          res?.details[0].issue === "ORDER_ALREADY_CAPTURED"
        ) {
          alert("Paypal payment success ✅");
          await handleSuceesPaymentPress("paypal");
          // call a function which will store order to user and truck database
          return;
        } else {
          alert("payee account is not verified with yumtrucks ❌");
          return;
        }
      } catch (error) {
        setLoading(false);
        alert("Paypal payment failed try again ❌");
        console.log(error);
        return;
      }
    } else {
      return;
    }
  };

  const clearPaypalState = () => {
    setPaypalApprovedUrl(null);
    setPaypalAccessToken(null);
  };
  // ---------------------------------------------

  // ----------------------STRIPE--------------------------
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
          onPress: async () => await handleSuceesPaymentPress("stripe"),
        },
      ]);
    }
  };
  const handleCardsPress = async () => {
    if (paymentId && paymentId.length > 0) {
      try {
        setLoading(true);
        let res = await initializePaymentSheet();
        let sheet = await openPaymentSheet();
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      alert("Stripe payment method is not available for this truck.");
    }
  };
  // -----------------------------------------------------------

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Modal visible={!!paypaylApprovedUrl}>
        <View style={{ flex: 1, marginTop: statusBarHeight + 10 }}>
          <WebView
            onNavigationStateChange={onPaypalUrlChange}
            source={{ uri: paypaylApprovedUrl }}
          />
        </View>
      </Modal>
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
