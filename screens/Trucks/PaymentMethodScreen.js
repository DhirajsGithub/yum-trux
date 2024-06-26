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
import uuid from "react-native-uuid";

import {
  addOrderToTruck,
  addToAllOrdersDetail,
  addToAllOrdersHttp,
  capturePaypalPayment,
  createPaypalOrder,
  generatePaypalAccessToken,
} from "../../utils/user-http-requests";
import { useStripe } from "@stripe/stripe-react-native";
import { baseUrl } from "../../constants/baseUrl";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import { removeCurrentOrder } from "../../store/store-slice";

import { io } from "socket.io-client";
const socket = io.connect(baseUrl);

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
  const platformAmount = params.platformAmount;
  const totalWithItemsAndTip = params.totalWithItemsAndTip; // payable to truck Owner
  const totalBeformPlatformFees = params.totalBeformPlatformFees; // actual price of items without tip and fees
  const totalWithFeesAndTip = params.totalWithFeesAndTip; // amount to be paid by user
  const truckName = params.truckName;
  const amount = totalWithFeesAndTip
    ? Math.round(totalWithFeesAndTip * 100)
    : 0;
  const stripePlatformAmount = platformAmount
    ? Math.round(platformAmount * 100)
    : 0;
  // console.log(amount);

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

  const orderId = uuid.v4();
  // will add to user order history
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
      totalPrice: parseFloat(totalBeformPlatformFees.toFixed(2)),
      truckId: params.truckId,
      orderId,
      status: "pending",
    };
    return reqData;
  };

  const addToAllOrdersFunc = async () => {
    const data = orderSummaryToStore();
    if (currentOrders.length > 0) {
      // if (params?.newOrder === true) {
      //   let res = await addToAllOrdersHttp(userId, data);
      //   // dispatch(addToAllOrders());
      //   dispatch(removeCurrentOrder());
      // }
      // if (params?.newOrder === false) {
      //   dispatch(removeCurrentOrder());
      // }

      // showing all orders including reorders
      let res = await addToAllOrdersHttp(userId, data, {
        title: "Order placed !",
        description: `Your order is placed for ${params?.cartOrders?.length} items for $ ${params.totalWithFeesAndTip}`,
        data: "data",
        notificationId: orderId,
      });
      // dispatch(addToAllOrders());
      dispatch(removeCurrentOrder());
    }
  };

  const returnDataForTruck = () => {
    const tempDate = new Date();
    let tim = date.format(tempDate, "hh:mm A");
    let dat = date.format(tempDate, "MMM D YYYY");

    const items = [];
    for (let item of params?.cartOrders) {
      items.push({
        itemId: item.itemId,
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        itemQuantity: item.quantity,
        itemDiscription: item.itemDiscription,
      });
    }
    const data = {
      orderOn: { fullDate: new Date(), date: dat, time: tim },
      pickUpTime: {
        fullDate: new Date(),
        date: params.pickUpDate.date + ", " + new Date().getFullYear(),
        time: params.pickUpTime.time,
      },
      items,
      orderId,
      expoPushToken: userDetails?.expoPushToken
        ? userDetails?.expoPushToken
        : "",
      status: "pending",
      totalPrice: params.totalWithFeesAndTip,
      platformAmount: platformAmount,
      totalWithItemsAndTip: totalWithItemsAndTip,
      totalBeformPlatformFees: totalBeformPlatformFees,
      customerDetails: {
        name: userDetails.fullName,
        email: userDetails.email,
        phone: userDetails.phoneNo,
        profileImg: userDetails.profileImg,
        address: userDetails.address,
        userId: userDetails._id,
      },
      truckId: params.truckId,
    };
    return data;
  };
  // will add to truck orders
  const addOrderToTruckFunc = async (obj) => {
    const data = returnDataForTruck();
    try {
      setLoading(true);
      let res = await addOrderToTruck(
        params.truckId,
        { ...data, paymentMethod: obj },
        {
          title: "New Order placed !",
          description: `${userDetails?.username} place order for ${params?.cartOrders?.length} items $ ${params.totalWithFeesAndTip}`,
          data: "data",
          notificationId: orderId,
        }
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // will add to admin orders
  const addToAdminOrdersFunc = async (obj) => {
    const tempDate = new Date();
    let tim = date.format(tempDate, "hh:mm A");
    let dat = date.format(tempDate, "MMM D YYYY");

    const data = {
      orderOn: { fullDate: new Date(), date: dat, time: tim },
      pickUpTime: {
        fullDate: new Date(),
        date: params.pickUpDate.date + ", " + new Date().getFullYear(),
        time: params.pickUpTime.time,
      },
      orderId,
      status: "pending",
      expoPushToken: userDetails?.expoPushToken
        ? userDetails?.expoPushToken
        : "",
      totalPrice: params.totalWithFeesAndTip,
      platformAmount: platformAmount,
      totalWithItemsAndTip: totalWithItemsAndTip,
      totalBeformPlatformFees: totalBeformPlatformFees,
      customerDetails: {
        name: userDetails.fullName,
        email: userDetails.email,
        phone: userDetails.phoneNo,
        profileImg: userDetails.profileImg,
        address: userDetails.address,
        userId: userDetails._id,
      },
      truckDetails: {
        truckId: params.truckId,
        truckName: params.truckName,
        truckImg: params.truckImg,
      },
      paymentMethod: obj,
    };

    try {
      setLoading(true);
      let res = await addToAllOrdersDetail(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSuceesPaymentPress = async (obj) => {
    await addOrderToTruckFunc(obj); // will add to truck orders also it will push to truck's notfication field
    await addToAllOrdersFunc(obj); // will add to order history of user also it will push to user's notification field
    await addToAdminOrdersFunc(obj); // will add to admin orders
    // socket io emit order to truck Id
    await socket.emit("send_msg", {
      message: {
        title: "New Order placed !",
        description: `${userDetails?.username} place order for ${params?.cartOrders?.length} items $ ${params.totalWithFeesAndTip}`,
        data: returnDataForTruck(),
        notificationId: orderId,
        isOrder: true,
      },
      room: [params.truckId],
    });
    navigation.navigate("successOrder", {
      ...params,
    });
    return;
  };
  // -------------------------------------------------------------------------

  // -----------------PAYPAL-----------------

  const handlePaypalPress = async () => {
    if (
      !userDetails?.email ||
      !userDetails?.fullName === 0 ||
      !userDetails?.phoneNo ||
      !userDetails?.address
    ) {
      alert("Please update your profile first");
      return;
    }
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
                  value: Number(totalWithFeesAndTip.toFixed(2)),
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
                        value: Number(platformAmount.toFixed(2)),
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
        }
      } else {
        alert("Can't proceed with paypal payment. Please try again later.");
      }
    } else {
      alert("Paypal payment is not available for this truck.");
    }
  };
  const onPaypalUrlChange = (webViewState) => {
    if (webViewState?.url?.includes("https://example.com/cancel")) {
      clearPaypalState();
      alert("Paypal payment cancelled ❗️");
      return;
    }
    if (webViewState?.url?.includes("https://example.com/return")) {
      const urlValue = queryString.parseUrl(webViewState.url);

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
        clearPaypalState();
        setLoading(false);
        if (
          res?.status === "COMPLETED" ||
          res?.details[0].issue === "ORDER_ALREADY_CAPTURED"
        ) {
          await handleSuceesPaymentPress({
            mode: "paypal",
            email: paypalEmail,
          });
          alert("Paypal payment success ✅");
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
      body: JSON.stringify({ amount, paymentId, stripePlatformAmount }),
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
      Alert.alert(`Error code: ${error.code}`, error.message + " ❗️");
    } else {
      await handleSuceesPaymentPress({
        mode: "card",
        paymentId: paymentId,
      });
      Alert.alert("Success", "Your order is confirmed! ✅", [
        {
          text: "OK",
          onPress: () => null,
        },
      ]);
    }
  };
  const handleCardsPress = async () => {
    if (
      !userDetails?.email ||
      !userDetails?.fullName === 0 ||
      !userDetails?.phoneNo ||
      !userDetails?.address
    ) {
      alert("Please update your profile first");
      return;
    }
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
                disabled={loading}
                style={{ ...styles.commonDiv, opacity: loading && 0.5 }}
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
                disabled={loading}
                style={{ ...styles.commonDiv, opacity: loading && 0.5 }}
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
