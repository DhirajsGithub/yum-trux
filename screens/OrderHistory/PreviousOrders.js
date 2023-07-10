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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import HeaderComp from "../../components/HeaderComp";
import { Image } from "react-native";
import colors from "../../constants/colors";
import RectangularDisplayFields from "../../components/RectangularDisplayFields";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCurrentOrder,
  removeCurrentOrder,
  setAllOrderHistoryProper,
  setUserDetails,
} from "../../store/store-slice";
import EmptyData from "../../components/EmptyData";
import { FontAwesome5 } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay/lib";
import {
  getUserDetailsHttp,
  truckListDetailHttp,
} from "../../utils/user-http-requests";

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
  const userSlice = useSelector((state) => state.userSlice);
  const userDetails = userSlice.userDetails;
  const rowOrderHistory = userDetails.orderHistory;
  const userId = userDetails._id;
  const prvOrders = userSlice.allOrders;
  const currentOrders = userSlice.currentOrders;
  const [loading, setLoading] = useState(false);
  const [prvOrdersList, setPrvOrdersList] = useState([]);
  const [trucksList, setTruckList] = useState([]);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const fetchUserLatestDetails = async () => {
    setLoading(true);
    let res2 = await getUserDetailsHttp(userId);
    setLoading(false);
    if (res2.status === "success") {
      dispatch(setUserDetails(res2.user));
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      try {
        fetchUserLatestDetails();
        fetchTrucksList();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }, [])
  );

  const fetchTrucksList = async () => {
    setLoading(true);
    let res = await truckListDetailHttp();
    setLoading(false);
    if (res.status === "success") {
      setTruckList(res.truckList);
    } else {
      setTruckList([]);
    }
  };

  useEffect(() => {
    try {
      fetchUserLatestDetails();
      fetchTrucksList();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);
  // actual converting order history row data to require data to be shown on order history
  const findTruckDetails = (truckId) => {
    let truckDetails = trucksList.filter((truck) => {
      return truck._id === truckId;
    });
    if (
      truckDetails[0]?.name &&
      truckDetails[0]?._id &&
      truckDetails[0]?.imgUrl &&
      truckDetails[0]?.menu
    ) {
      return truckDetails[0];
    }
    return null;
  };

  let temp = [];
  for (let i = rowOrderHistory.length - 1; i >= 0; i--) {
    let truckId = rowOrderHistory[i].truckId;
    let truckDetail = findTruckDetails(truckId);

    if (truckDetail) {
      let totalPrice = parseFloat(rowOrderHistory[i].totalPrice.toFixed(2));
      let truckId = rowOrderHistory[i].truckId;
      let orderOn = rowOrderHistory[i].orderOn;
      let Rowitems = rowOrderHistory[i].items;
      let truckMenu = truckDetail.menu;
      let truckDescription = truckDetail.description;
      let truckImg = truckDetail.imgUrl;
      let truckName = truckDetail.name;
      let truckAddress = truckDetail.address;
      let paymentId = truckDetail.paymentId;
      let paypalEmail = truckDetail.paypalEmail;
      let items = [];
      for (let item of Rowitems) {
        // from store order history menu item id
        for (let item2 of truckMenu) {
          // from truck menu item id
          if (item.itemId === item2.id) {
            items.push({
              truckId: truckId,
              truckName: truckName,
              truckDescription: truckDescription,
              truckImg: truckImg,
              truckAddress: truckAddress,
              itemName: item2.name,
              itemId: item2.id,
              itemPrice: item2.price,
              itemDiscription: item2.description,
              paymentId,
              paypalEmail,
            });
          }
        }
      }
      let tempOrder = {
        id: rowOrderHistory[i].orderId,
        truckName,
        orderOn,
        totalPrice,
        items,
        truckId,
        truckImg,
        paymentId,
      };
      temp.push(tempOrder);
    }
  }

  useEffect(() => {
    dispatch(setAllOrderHistoryProper(temp));
    setPrvOrdersList(temp);
  }, [trucksList, userDetails]);

  // const [searchInput, setSearchInput] = useState("");
  const handleSearchInput = (text) => {
    const filterTrucks = prvOrders.filter((truck) => {
      return truck.truckName?.toLowerCase().includes(text?.toLowerCase());
    });
    setPrvOrdersList(filterTrucks);
  };

  const handleViewTruckPress = (truckId) => {
    let truckDetail = trucksList?.find((truck) => {
      return truck._id === truckId;
    });
    const findRating = (ratingLi) => {
      if (ratingLi.length > 0) {
        let sum = 0;
        for (let r of ratingLi) {
          sum = sum + r;
        }
        return Math.round(sum / ratingLi.length);
      }
      return 0;
    };
    if (truckDetail) {
      const truckName = truckDetail.name;
      const truckRatings = findRating(truckDetail.ratings);
      const truckTiming = truckDetail.timing;
      const truckDescription = truckDetail.description;
      const truckId = truckDetail._id;
      const truckImg = truckDetail.imgUrl;
      const truckMenu = truckDetail.menu;
      const truckAddress = truckDetail.address;
      const truckSchedule = truckDetail.schedule;
      const paymentId = truckDetail.paymentId;
      const paypalEmail = truckDetail.paypalEmail;
      navigation.navigate("trucks", {
        screen: "truckDetail",
        params: {
          screen: "prvOrders",
          truckName,
          truckRatings,
          truckTiming,
          truckDescription,
          truckId,
          truckImg,
          truckMenu,
          truckAddress,
          truckSchedule,
          paymentId,
          paypalEmail,
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
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        // textContent={'Loading...'}
        color={colors.action}
        // textStyle={styles.spinnerTextStyle}
      />
      <SafeAreaView>
        <HeaderComp handleSearchInput={handleSearchInput} onlySearch={true} />

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: colors.textColor,
              marginRight: 10,
            }}
          >
            Order History
          </Text>
          <FontAwesome5
            name="clipboard-list"
            size={18}
            color={colors.textColor}
          />
        </View>
        {prvOrdersList.length === 0 && !loading && (
          <EmptyData msg="No truck found 😞" />
        )}

        <View style={styles.orderList}>
          {prvOrdersList?.length > 0 && (
            <FlatList
              contentContainerStyle={{ paddingBottom: "100%" }}
              showsVerticalScrollIndicator={false}
              data={prvOrdersList}
              renderItem={({ item }) => (
                <OrderCard
                  key={item.id}
                  handleViewTruckPress={() =>
                    handleViewTruckPress(item.truckId)
                  }
                  handleReorderPress={() => handleReorderPress(item.items)}
                  imgUrl={item.truckImg}
                  truckName={item.truckName}
                  NoOfDishes={item.items?.length}
                  price={item.totalPrice}
                  dateTime={item.orderOn}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          )}

          {/* <ScrollView showsVerticalScrollIndicator={false}>
            {prvOrdersList.length > 0 &&
              prvOrdersList?.map((item, index) => {
                return (
                  <>
                    <OrderCard
                      key={item.id}
                      handleViewTruckPress={() =>
                        handleViewTruckPress(item.truckId)
                      }
                      handleReorderPress={() => handleReorderPress(item.items)}
                      imgUrl={item.truckImg}
                      truckName={item.truckName}
                      NoOfDishes={item.items?.length}
                      price={item.totalPrice}
                      dateTime={item.orderOn}
                    />
                  </>
                );
              })}
          </ScrollView> */}
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
  },
  orderList: {
    // marginBottom: "100%",
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
