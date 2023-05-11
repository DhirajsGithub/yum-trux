import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../constants/colors";
import ButtonComp from "../../components/ButtonComp";
import { useDispatch } from "react-redux";
import { removeCurrentOrder } from "../../store/store-slice";

const SuccessOrderScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const orderData = route.params;
  const navigation = useNavigation();
  console.log(orderData);
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const handleDonePress = () => {
    // this dispatch will ensure that whenever the order is complete user cart is empty
    dispatch(removeCurrentOrder());
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
              <Text style={styles.faintText}>pick up time</Text>
              <Text style={styles.mainValue}>{orderData.pickUpTime}</Text>
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
