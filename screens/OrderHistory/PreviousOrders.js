import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import HeaderComp from "../../components/HeaderComp";
import { Image } from "react-native";
import colors from "../../constants/colors";
import { trucksList } from "../../data/trucks";
import RectangularDisplayFields from "../../components/RectangularDisplayFields";
import { useDispatch, useSelector } from "react-redux";
import { addToCurrentOrder, removeCurrentOrder } from "../../store/store-slice";
import EmptyData from "../../components/EmptyData";

const OrderCard = ({
  imgUrl,
  truckName,
  NoOfDishes,
  price,
  dateTime,
  handleReorderPress,
  handleViewTruckPress,
}) => {
  return (
    <View style={styles.orderCard}>
      <View style={styles.imgDesc}>
        <View>
          <Image
            style={{ width: 100, height: 86, borderRadius: 5, marginRight: 5 }}
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
          View truck
        </RectangularDisplayFields>
      </View>
    </View>
  );
};

const PreviousOrders = () => {
  const dispatch = useDispatch();
  const prvOrders = useSelector((state) => state.userSlice.allOrders);
  const currentOrders = useSelector((state) => state.userSlice.currentOrders);

  const [prvOrdersList, setPrvOrdersList] = useState([]);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  useEffect(() => {
    setPrvOrdersList(prvOrders);
  }, [prvOrders]);

  // const [searchInput, setSearchInput] = useState("");
  const handleSearchInput = (text) => {
    const filterTrucks = prvOrders.filter((truck) => {
      return truck.truckName?.toLowerCase().includes(text?.toLowerCase());
    });
    setPrvOrdersList(filterTrucks);
  };

  const handleViewTruckPress = (truckId) => {
    let truckDetail = trucksList.find((truck) => {
      return truck.id === truckId;
    });

    if (truckDetail) {
      const truckName = truckDetail.name;
      const truckRatings = truckDetail.ratings;
      const truckTiming = truckDetail.timing;
      const truckDescription = truckDetail.description;
      const truckId = truckDetail.id;
      const truckImg = truckDetail.imgUrl;
      const truckMenu = truckDetail.menu;
      const truckAddress = truckDetail.address;
      const truckSchedule = truckDetail.schedule;
      navigation.navigate("trucks", {
        screen: "truckDetail",
        params: {
          truckName,
          truckRatings,
          truckTiming,
          truckDescription,
          truckId,
          truckImg,
          truckMenu,
          truckAddress,
          truckSchedule,
        },
      });
    }
  };
  const handleReorderPress = (prvOrder) => {
    // note here we will check if user has some items in his cart, if yes show alert for removing all the order
    if (currentOrders.length > 0) {
      Alert.alert(
        "Your cart already contain some orders ❗️",
        "Reorder will override all the items in your cart",
        [
          {
            text: "Cancel",
            // onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Reorder",
            onPress: () => addPrvOrdersToCart(prvOrder),
          },
        ]
      );
    } else {
      addPrvOrdersToCart(prvOrder);
    }
  };

  const addPrvOrdersToCart = (prvOrders) => {
    dispatch(removeCurrentOrder()); // removing the previous order if present
    for (let i of prvOrders) {
      dispatch(addToCurrentOrder(i));
    }
    navigation.navigate("trucks", {
      screen: "order",
      // passing params of newOrder as false to not store this order again in allOrders !
      params: { newOrder: false },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <HeaderComp handleSearchInput={handleSearchInput} onlySearch={true} />
        {prvOrdersList.length === 0 && <EmptyData msg="No truck found 😞" />}
        <View style={styles.orderList}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={prvOrdersList}
            renderItem={({ item }) => (
              <OrderCard
                handleViewTruckPress={() => handleViewTruckPress(item.truckId)}
                handleReorderPress={() => handleReorderPress(item.items)}
                imgUrl={item.truckImg}
                truckName={item.truckName}
                NoOfDishes={item.items?.length}
                price={item.totalPrice}
                dateTime={item.orderOn}
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

    fontSize: 14,
    fontWeight: "500",
  },
  btnTouch: {
    width: 101,
    // overflow: "hidden",
    // borderRadius: 20,
  },
  trckNameText: {
    width: 120,
    color: colors.textColor,
    fontSize: 20,
    fontWeight: "700",
  },
  smallText: {
    color: "#6B6B6B",
    fontSize: 13,
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
