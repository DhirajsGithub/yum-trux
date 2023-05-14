import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../constants/colors";
import ButtonComp from "../../components/ButtonComp";
import { useDispatch, useSelector } from "react-redux";
import { addToAllOrders, removeCurrentOrder } from "../../store/store-slice";

const SuccessOrderScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const orderData = route.params;
  const navigation = useNavigation();
  const allOrders = useSelector((state) => state.userSlice.allOrders);
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const handleDonePress = () => {
    // this will enusre current orders are added to allOrders
    if (orderData.newOrder === true) {
      dispatch(addToAllOrders()); // addToALlOrders function will take care of removing current order
    }
    if (orderData.newOrder === false) {
      dispatch(removeCurrentOrder()); // we are not calling addToAllOrders for previous order hence better we delete the current order here
    }

    navigation.navigate("reviewScreen", {
      truckName: orderData.truckName,
      truckImg: orderData.truckImg,
    });
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
    elevation: 14,
    shadowColor: "#171717",
    shadowOffset: { width: -3, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: "25%",
  },
});
