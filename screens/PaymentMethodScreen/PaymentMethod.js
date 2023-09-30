import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import colors from "../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import ButtonComp from "../../components/ButtonComp";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetailsHttp,
  udpateUesrPaymentMethod,
} from "../../utils/user-http-requests";
import Spinner from "react-native-loading-spinner-overlay";
import { setUserDetails } from "../../store/store-slice";

const PaymentMethod = () => {
  const userDetails = useSelector((state) => state.userSlice.userDetails);
  const paymentDetails = userDetails?.paymentDetails?.paymentDetails;
  const dispatch = useDispatch();
  console.log(paymentDetails?.expiryDate?.split("/")[1]);
  const navigation = useNavigation();
  const [name, setName] = useState(paymentDetails?.name || "");
  const [cardNumber, setCardNumber] = useState(
    paymentDetails?.cardNumber || ""
  );
  const [month, setMonth] = useState(
    paymentDetails?.expiryDate?.split("/")[0] || ""
  );
  const [year, setYear] = useState(
    paymentDetails?.expiryDate?.split("/")[1] || ""
  );
  const [paypalEmail, setPaypalEmail] = useState(
    paymentDetails?.paypalEmail || ""
  );
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Payment Method",
      headerTitleStyle: {
        fontSize: 20,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={32}
            color={colors.textColor}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const monthInputRef = useRef(null);
  const yearInputRef = useRef(null);

  const handleMonthChange = (text) => {
    setMonth(text);
    if (text.length === 2) {
      // When the month input has 2 characters, move focus to the year input
      yearInputRef.current.focus();
    }
  };
  const handleYearChange = (text) => {
    setYear(text);
    if (text.length === 0) {
      // When the year input has 2 characters, move focus to the cvv input
      monthInputRef.current.focus();
      console.log("f");
    }
  };
  const updatePaymentDetails = async () => {
    try {
      setLoading(true);
      let res = await udpateUesrPaymentMethod(userDetails._id, {
        paymentDetails: {
          name,
          cardNumber,
          expiryDate: month + "/" + year,
          paypalEmail,
        },
      });
      if (res?.status === "success") {
        let res2 = await getUserDetailsHttp(userDetails._id);
        if (res2?.status === "success") {
          dispatch(setUserDetails(res2.user));
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleBtnPress = () => {
    if (name && cardNumber && month && year && paypalEmail) {
      updatePaymentDetails();
    }
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        // textContent={'Loading...'}
        color={colors.action}
        // textStyle={styles.spinnerTextStyle}
      />
      <Text
        style={{ color: colors.textColor, fontSize: 18, fontWeight: "400" }}
      >
        Save your payment methods for future transactions
      </Text>
      <View>
        <TextInput
          style={[styles.textField, styles.input]}
          placeholder="Cardholder Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <View style={[styles.inputContainer, styles.textField]}>
          <TextInput
            style={styles.input3}
            placeholder="Card Number"
            value={cardNumber}
            keyboardType="number-pad"
            maxLength={19}
            onChangeText={(text) => setCardNumber(text)}
          />
          <Image
            source={require("../../assets/Images/bank-cards.png")} // Replace with your card image source
            style={styles.cardImage}
          />
        </View>

        <View style={styles.expiryView}>
          <TextInput
            style={[
              styles.input2,
              {
                borderRightWidth: 0,
              },
            ]}
            value={month}
            placeholder="MM"
            maxLength={2}
            keyboardType="number-pad"
            onChangeText={handleMonthChange}
            ref={monthInputRef}
          />
          <TextInput
            style={[styles.input2, { borderLeftWidth: 0 }]}
            placeholder="YY"
            maxLength={2}
            keyboardType="number-pad"
            onChangeText={handleYearChange}
            ref={yearInputRef}
            value={year}
            onFocus={() => {
              if (month.length < 2) {
                monthInputRef.current.focus();
              }
            }}
          />
        </View>
        <View style={[styles.inputContainer, styles.textField]}>
          <TextInput
            style={styles.input3}
            placeholder="Paypal Email"
            value={paypalEmail}
            keyboardType="email-address"
            maxLength={19}
            onChangeText={(text) => setPaypalEmail(text)}
          />
          <Image
            source={require("../../assets/Images/paypal.png")} // Replace with your card image source
            style={styles.cardImage}
          />
        </View>
      </View>
      <View style={{ marginTop: 40, paddingBottom: "10%" }}>
        <ButtonComp handleBtnPress={handleBtnPress} height={50}>
          SAVE
        </ButtonComp>
      </View>
    </ScrollView>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    padding: 15,
    borderColor: "#B9C4CA",
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
  },
  expiryView: {
    flexDirection: "row",
    marginTop: 24,
    marginBottom: 40,
    // justifyContent: "space-between",
  },
  input2: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 36,
  },
  textField: {
    // flex: 1,
    marginTop: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#B9C4CA",
    borderWidth: 1,
    borderRadius: 4,
    paddingRight: 15,
    // marginBottom: 24,
  },
  input3: {
    padding: 15,
    flex: 1,

    fontSize: 16,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  cardImage: {
    width: 30,
    height: 20,
    marginLeft: 5, // Adjust the margin as needed
  },
});
