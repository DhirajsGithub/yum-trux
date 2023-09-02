import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import date from "date-and-time";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../constants/colors";
import ButtonComp from "../../components/ButtonComp";
import { useDispatch, useSelector } from "react-redux";
import { addToAllOrders, removeCurrentOrder } from "../../store/store-slice";
import { addToAllOrdersHttp } from "../../utils/user-http-requests";

const SuccessOrderScreen = () => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const dispatch = useDispatch();
  const route = useRoute();
  const orderData = route.params;
  console.log(orderData.truckId);

  const navigation = useNavigation();
  const userSlice = useSelector((state) => state.userSlice);
  const userId = userSlice.userDetails._id;
  const currentOrders = userSlice.currentOrders;

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
      truckId: orderData.truckId,
    };
    return reqData;
  };

  const addToAllOrdersFunc = async () => {
    const data = orderSummaryToStore();
    if (currentOrders.length > 0) {
      if (orderData.newOrder === true) {
        let res = await addToAllOrdersHttp(userId, data);
        // dispatch(addToAllOrders());
        dispatch(removeCurrentOrder());
      }
      if (orderData.newOrder === false) {
        dispatch(removeCurrentOrder());
      }
    }
  };
  const handleDonePress = async () => {
    try {
      // await addToAllOrdersFunc();
      navigation.navigate("reviewScreen", {
        ...orderData,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.img}>
            <Image
              style={{ width: 107, height: 107 }}
              source={require("../../assets/Images/success-tick.png")}
            />
            <Text style={styles.successText}>Order successful!</Text>
            <Text style={styles.successMsg}>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
              aut. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
              odit aut. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
              aut odit aut.
            </Text>
          </View>
          <View style={styles.shadowBox}>
            <View style={styles.commonDiv}>
              <Text style={styles.faintText}>Name of Truck</Text>
              <Text style={styles.mainValue}>{orderData.truckName} truck</Text>
            </View>
            <View style={styles.commonDiv}>
              <Text style={styles.faintText}>location</Text>
              <Text style={styles.mainValue}>{orderData.truckLocation}</Text>
            </View>
            <View style={styles.commonDiv}>
              <Text style={styles.faintText}>pick up time | date</Text>
              <Text style={styles.mainValue}>
                {orderData.pickUpTime.time} | {orderData.pickUpDate.date}
              </Text>
            </View>
            <View style={styles.btn}>
              <ButtonComp handleBtnPress={handleDonePress} height={50}>
                DONE
              </ButtonComp>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SuccessOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  img: {
    justifyContent: "center",
    marginTop: 40,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  successText: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 10,
  },
  successMsg: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 40,
  },
  faintText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#A4A4A4",
    textAlign: "center",
  },
  mainValue: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textColor,
    textAlign: "center",
  },
  commonDiv: {
    marginTop: 35,
  },
  btn: {
    marginTop: 74,
  },
  shadowBox: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 7,
    backgroundColor: colors.white,
    elevation: 5,
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: "25%",
  },
});
