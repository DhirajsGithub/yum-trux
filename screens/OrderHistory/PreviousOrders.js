import {
  FlatList,
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
import HeaderComp from "../../components/HeaderComp";
import { Image } from "react-native";
import colors from "../../constants/colors";
import { useSelector } from "react-redux";
import RectangularDisplayFields from "../../components/RectangularDisplayFields";

const TempButton = ({ bg, text, handleButtonPress }) => {
  return (
    <View style={styles.btnView}>
      <TouchableOpacity style={styles.btnTouch} onPress={handleButtonPress}>
        <Text
          onPress={handleButtonPress}
          style={[styles.btnText, { backgroundColor: bg }]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const OrderCard = ({ imgUrl, truckName, NoOfDishes, price, dateTime }) => {
  const handleReorderPress = () => {
    console.log("jhj");
  };
  const handleViewTruckPress = () => {};
  return (
    <View style={styles.orderCard}>
      <View style={styles.imgDesc}>
        <View>
          <Image
            style={{ width: 102, height: 86, borderRadius: 5, marginRight: 11 }}
            source={{
              uri: imgUrl,
            }}
          />
        </View>
        <View>
          <Text style={styles.trckNameText}>{truckName}</Text>
          <Text style={styles.smallText}>{NoOfDishes} dishes</Text>
          <Text style={styles.smallText}>$ {price}</Text>
          <Text style={styles.smallText}>{dateTime}</Text>
        </View>
      </View>
      <View style={styles.btns}>
        {/* <TempButton
          handleButtonPress={handleReorderPress}
          text="Reorder"
          bg={colors.action}
        />
        <TempButton
          handleButtonPress={handleViewTruckPress}
          text="View truck"
          bg="#404040"
        /> */}
        <RectangularDisplayFields
          paddingHorizontal={4}
          paddingVertical={9}
          textSize={14}
          textWeight={500}
          textColor={colors.white}
          bgColor={colors.action}
          borderRadius={20}
          width={101}
          marginRight={0}
          handlePress={handleReorderPress}
        >
          Reorder
        </RectangularDisplayFields>
        <RectangularDisplayFields
          paddingHorizontal={4}
          paddingVertical={9}
          textSize={14}
          textWeight={500}
          textColor={colors.white}
          bgColor="#404040"
          borderRadius={20}
          width={101}
          marginRight={0}
          handlePress={handleViewTruckPress}
        >
          View trucks
        </RectangularDisplayFields>
      </View>
    </View>
  );
};

const PreviousOrders = () => {
  const prvOrders = useSelector((state) => state.userSlice.previousOrders);
  console.log(prvOrders);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <HeaderComp prvOrders={true} />
        <View style={styles.orderList}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={prvOrders}
            renderItem={({ item }) => (
              <OrderCard
                imgUrl={item.truckImg}
                truckName={item.nameOfTruck}
                NoOfDishes={item.totalItems}
                price={item.price}
                dateTime={item.orderDate}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PreviousOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingBottom: 8,
    // marginBottom: "50%",
  },
  orderList: {
    marginBottom: 180,
  },
  btnView: {
    flexDirection: "row",
  },
  btnText: {
    // width: 102,
    color: colors.white,
    // justifyContent: "center",
    // alignItems: "center",
    // textAlign: "center",
    // paddingVertical: 9,
    // borderRadius: 20,
    // paddingHorizontal: 4,

    fontSize: 14,
    fontWeight: "500",
  },
  btnTouch: {
    width: 101,
    // overflow: "hidden",
    // borderRadius: 20,
  },
  trckNameText: {
    color: colors.textColor,
    fontSize: 20,
    fontWeight: "700",
    maxWidth: 140,
  },
  smallText: {
    color: "#6B6B6B",
    fontSize: 14,
    fontWeight: "400",
  },
  btns: {
    display: "flex",
    rowGap: 8,
  },
  imgDesc: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
});
