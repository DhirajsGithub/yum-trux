import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../constants/colors";
import { addQuantity, removeQuantity } from "../../store/store-slice";
import ButtonComp from "../../components/ButtonComp";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-paper";
import date from "date-and-time";

const OrderedItemCard = ({
  quantity,
  itemName,
  itemPrice,
  itemDesc,
  handleRemovePress,
  handleAddPress,
}) => {
  return (
    <View style={styles.orderedItemCard}>
      <View style={{ width: "60%" }}>
        <Text style={styles.pickupText}>{itemName}</Text>
        <Text style={styles.truckDesc}>$ {itemPrice}</Text>
        <Text style={styles.truckDesc}>{itemDesc}</Text>
      </View>
      <View style={styles.itemQuantity}>
        <TouchableOpacity onPress={handleRemovePress}>
          <Feather name="minus" size={20} color={colors.white} />
        </TouchableOpacity>
        <Text style={{ fontSize: 17, fontWeight: "400", color: colors.white }}>
          {quantity}
        </Text>
        <TouchableOpacity onPress={handleAddPress}>
          <Feather name="plus" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TipCard = ({
  tipPer,
  tipAmount,
  isTip,
  noTip,
  myAmount,
  handleTipPress,
  backgroundColor,
  color,
}) => {
  return (
    <TouchableOpacity
      onPress={() => handleTipPress(isTip ? tipPer : myAmount ? myAmount : 0)}
      style={{
        width: 70,
        height: 60,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor,
        borderRadius: 5,
        overflow: "hidden",
        marginRight: 7,
      }}
    >
      {isTip && (
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            textAlign: "center",
            color,
          }}
        >
          {tipPer} %
        </Text>
      )}
      {isTip && (
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            textAlign: "center",
            color,
          }}
        >
          $ {tipAmount}
        </Text>
      )}
      {noTip && (
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            textAlign: "center",
            color,
          }}
        >
          No tip
        </Text>
      )}
      {myAmount && (
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            textAlign: "center",
            color,
          }}
        >
          My amount
        </Text>
      )}
    </TouchableOpacity>
  );
};

const OrderScreen = () => {
  const currentOrders = useSelector((state) => state.userSlice.currentOrders);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const params = useRoute().params;
  const truckName = currentOrders[0]?.truckName;
  const truckDescription = currentOrders[0]?.truckDescription;
  const truckImg = currentOrders[0]?.truckImg;
  const truckLocation = currentOrders[0]?.truckAddress;
  const truckId = currentOrders[0]?.truckId;

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const handleBackPress = () => {
    if (!params.newOrder) {
      navigation.navigate("previousOrders");
    }
    navigation.goBack();
  };

  const orderSet = new Set();
  const ordersArray = [];

  for (let order of currentOrders) {
    let quantity = 0;
    if (!orderSet.has(order.itemId)) {
      currentOrders.forEach((item) => {
        if (item.itemId === order.itemId) {
          quantity = quantity + 1;
        }
      });

      ordersArray.push({ quantity, ...order });
      orderSet.add(order.itemId);
    }
  }
  const handleAddPress = (itemId) => {
    dispatch(addQuantity(itemId));
  };
  const handleRemovePress = (itemId) => {
    dispatch(removeQuantity(itemId));
  };

  // this is myAmount
  const [myAmount, setMyAmount] = useState(0);
  const handleMyAmountValue = (text) => {
    setMyAmount(text);
  };

  // note toFixed will convet number to string hence after applying toFoxed make sure to parse the string to float or int
  let totalBeforeTax = currentOrders?.reduce((totalPrice, currentOrder) => {
    return totalPrice + currentOrder.itemPrice;
  }, 0);
  totalBeforeTax = parseFloat(totalBeforeTax.toFixed(2));
  const taxPercentage = 10;

  const [tipCardPress, setTipCardPress] = useState(0);
  const handleTipPress = (data) => {
    setTipCardPress(data);
  };
  const taxAmount = parseFloat(
    ((taxPercentage / 100) * totalBeforeTax).toFixed(2)
  );
  let tipShit = 0;
  if (tipCardPress === true) {
    tipShit = myAmount.length > 0 && parseFloat(myAmount);
  } else {
    tipShit = totalBeforeTax * (tipCardPress / 100);
  }
  let totalWithTaxAndTip = taxAmount + totalBeforeTax + tipShit;

  totalWithTaxAndTip = parseFloat(totalWithTaxAndTip.toFixed(2));

  const dateNow = new Date();
  const [pickUpDate, setPickUpDate] = useState({
    show: false,
    date: date.format(dateNow, "D MMM"),
  });
  const [pickUpTime, setPickUpTime] = useState({
    show: false,
    time: date.format(dateNow, "hh:mm A"),
  });
  const handlePickupDate = (obj, daa) => {
    if (daa) {
      setPickUpDate({ show: false, date: date.format(daa, "D MMM") });
    }
  };

  const handlePicupTime = (obj, daa) => {
    if (daa) {
      setPickUpTime({ show: false, time: date.format(daa, "hh:mm A") });
    }
  };
  const showPickupDate = () => {
    setPickUpTime((prvData) => {
      return { ...prvData, show: false };
    });
    if (Platform.OS === "ios") {
      setPickUpDate((prvData) => {
        return { ...prvData, show: !prvData.show };
      });
    } else {
      setPickUpDate((prvData) => {
        return { ...prvData, show: true };
      });
    }
  };
  const showPickupTime = () => {
    setPickUpDate((prvData) => {
      return { ...prvData, show: false };
    });
    if (Platform.OS === "ios") {
      setPickUpTime((prvData) => {
        return { ...prvData, show: !prvData.show };
      });
    } else {
      setPickUpTime((prvData) => {
        return { ...prvData, show: true };
      });
    }
  };

  const handlePaymenPress = () => {
    if (pickUpTime.time === "") {
      alert("pick a valid time");
      return;
    } else if (pickUpDate.date === "") {
      alert("pick a valid date");
      return;
    } else if (typeof totalWithTaxAndTip !== "number") {
      alert("Total price must be a Number");
      return;
    }
    navigation.navigate("paymentMethod", {
      truckName,
      truckDescription,
      truckLocation,
      pickUpTime,
      truckImg,
      totalWithTaxAndTip,
    });
  };

  const handleBtnPress = () => {
    if (pickUpTime.time === "time") {
      alert("pick a valid time");
      return;
    } else if (pickUpDate.date === "date") {
      alert("pick a valid date");
      return;
    } else if (typeof totalWithTaxAndTip !== "number") {
      alert("Total price must be a Number");
      return;
    }
    navigation.navigate("successOrder", {
      truckName,
      truckDescription,
      truckLocation,
      pickUpTime,
      pickUpDate,
      truckImg,
      totalWithTaxAndTip,
      newOrder: params.newOrder,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.backIcon}>
              <TouchableOpacity style={styles.cartBg} onPress={handleBackPress}>
                <Feather name="chevron-left" size={28} color="black" />
              </TouchableOpacity>
            </View>

            <Image
              style={{ width: "100%", height: 170, borderRadius: 5 }}
              source={{
                uri: truckImg,
              }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.truckDet}>
            <Text style={styles.truckNameText}>{truckName}</Text>
            <Text style={styles.truckDesc}>{truckDescription}</Text>
          </View>
          <View style={styles.pickUpTime}>
            <Text style={styles.pickupText}>Pick up date | time</Text>
            <View style={styles.dateTimePick}>
              <TouchableOpacity
                style={styles.timeDateTouch}
                onPress={showPickupDate}
              >
                <Text>{pickUpDate.date}</Text>
              </TouchableOpacity>
              <View>
                <Text>|</Text>
              </View>
              <TouchableOpacity
                style={styles.timeDateTouch}
                onPress={showPickupTime}
              >
                <Text>{pickUpTime.time}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {pickUpDate.show && (
            <DateTimePicker
              onChange={handlePickupDate}
              mode="date"
              display="spinner"
              value={new Date("01-03-2023")}
            />
          )}
          {pickUpTime.show && (
            <DateTimePicker
              onChange={handlePicupTime}
              display="spinner"
              mode="time"
              value={new Date()}
            />
          )}
          <View style={styles.ordersView}>
            {ordersArray.map((item, index) => {
              return (
                <View key={index}>
                  <OrderedItemCard
                    quantity={item.quantity}
                    itemName={item.itemName}
                    itemDesc={item.itemDiscription}
                    itemPrice={item.itemPrice}
                    handleAddPress={() => handleAddPress(item.itemId)}
                    handleRemovePress={() => handleRemovePress(item.itemId)}
                  />
                </View>
              );
            })}
          </View>
          <View style={styles.cost1}>
            <Text style={[styles.pickupText, { marginBottom: 5 }]}>Cost</Text>
            <View style={styles.cost1Flex}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  color: colors.textColor,
                }}
              >
                Total before tax
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: colors.textColor,
                }}
              >
                {totalBeforeTax}
              </Text>
            </View>
            <View style={styles.cost1Flex}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400",
                  color: colors.textColor,
                }}
              >
                Tax amount
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: colors.textColor,
                }}
              >
                {taxAmount}
              </Text>
            </View>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.tipView}
          >
            <TipCard
              handleTipPress={handleTipPress}
              isTip={false}
              noTip={true}
              myAmount={false}
              backgroundColor={
                tipCardPress === 0 ? colors.textColor : colors.inputBg
              }
              color={tipCardPress === 0 ? colors.white : colors.textColor}
            />
            <TipCard
              handleTipPress={handleTipPress}
              isTip={true}
              tipPer={10}
              tipAmount={(0.1 * totalBeforeTax)?.toFixed(2)}
              noTip={false}
              myAmount={false}
              backgroundColor={
                tipCardPress === 10 ? colors.textColor : colors.inputBg
              }
              color={tipCardPress === 10 ? colors.white : colors.textColor}
            />
            <TipCard
              handleTipPress={handleTipPress}
              isTip={true}
              tipPer={15}
              tipAmount={(0.15 * totalBeforeTax)?.toFixed(2)}
              noTip={false}
              myAmount={false}
              backgroundColor={
                tipCardPress === 15 ? colors.textColor : colors.inputBg
              }
              color={tipCardPress === 15 ? colors.white : colors.textColor}
            />
            <TipCard
              handleTipPress={handleTipPress}
              isTip={true}
              tipPer={20}
              tipAmount={(0.2 * totalBeforeTax)?.toFixed(2)}
              noTip={false}
              myAmount={false}
              backgroundColor={
                tipCardPress === 20 ? colors.textColor : colors.inputBg
              }
              color={tipCardPress === 20 ? colors.white : colors.textColor}
            />
            <TipCard
              handleTipPress={handleTipPress}
              isTip={false}
              noTip={false}
              myAmount={true}
              backgroundColor={
                tipCardPress === true ? colors.textColor : colors.inputBg
              }
              color={tipCardPress === true ? colors.white : colors.textColor}
            />
          </ScrollView>
          {tipCardPress === true && (
            <View style={{}}>
              <TextInput
                value={String(myAmount)}
                onChangeText={handleMyAmountValue}
                keyboardType={"phone-pad"}
                style={{
                  backgroundColor: colors.inputBg,
                  width: 100,
                  height: 30,
                  // borderRadius: 15,
                }}
              />
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 12,
              borderBottomColor: colors.borderBottom,
              borderBottomWidth: 1,
              paddingBottom: 10,
              marginBottom: 14,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              Total with tax and tip
            </Text>
            <Text style={{ fontSize: 22, fontWeight: "700" }}>
              $ {totalWithTaxAndTip}
            </Text>
          </View>

          <View>
            <Text style={styles.pickupText}>Payment</Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: colors.inputBg,
                paddingHorizontal: 20,
                paddingVertical: 18,
                borderRadius: 30,
                overflow: "hidden",
                marginTop: 6,
              }}
              onPress={handlePaymenPress}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 37, height: 15, marginRight: 10 }}
                  source={require("../../assets/Images/vissa.png")}
                />
                <Text
                  style={{
                    color: colors.textColor,
                    fontSize: 15,
                    fontWeight: "500",
                  }}
                >
                  **** 8879
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 16, marginBottom: "25%" }}>
            <ButtonComp handleBtnPress={handleBtnPress} height={50}>
              PLACE ORDER
            </ButtonComp>
          </View>
          {/* <View style={{ marginBottom: 200 }}>
            <Text>fs</Text>
          </View> */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // width: windowWidth - 20,
    paddingVertical: 5,
    // marginBottom: 5,
    paddingHorizontal: 15,
  },
  backIcon: {
    position: "absolute",

    zIndex: 200,
    left: "2%",
    top: "6%",
    opacity: 1,
  },
  cartBg: {
    backgroundColor: "#f3f3f3",
    // padding: 4,
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  truckDesc: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.textColor,
  },
  truckNameText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textColor,
  },
  truckDet: {
    marginTop: 4,
  },
  pickUpTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    borderBottomColor: colors.borderBottom,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  pickupText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textColor,
  },
  timeDateTouch: {
    marginHorizontal: 5,
  },
  itemQuantity: {
    flexDirection: "row",
    backgroundColor: colors.textColor,
    width: 101,
    height: 35,
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  orderedItemCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  ordersView: {
    borderBottomColor: colors.borderBottom,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  cost1: {
    marginTop: 10,
  },
  cost1Flex: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tipView: {
    marginVertical: 12,
  },
  dateTimePick: {
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.inputBg,
    borderRadius: 16,
    overflow: "hidden",
  },
});
