import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../constants/colors";
const windowWidth = Dimensions.get("window").width;
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AirbnbRating } from "react-native-ratings";
import MenuList from "../../components/MenuList";
import { useDispatch, useSelector } from "react-redux";
import { addToCurrentOrder, removeCurrentOrder } from "../../store/store-slice";

const TruckDetailScreen = () => {
  const dispatch = useDispatch();
  const currentOrders = useSelector((state) => state.userSlice.currentOrders);
  const [favPressed, setFavPressed] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const truckData = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
    // this will ensure that whenever user comes to truck detail screen it's cart is empty
    dispatch(removeCurrentOrder());
  }, []);
  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleSchedulePress = () => {
    navigation.navigate("scheduleScreen", {
      truckImg: truckData.truckImg,
      // also truck upcoming location, for now it is hardcoded in schedule page
      // also pass this params from truckOverview Card
    });
  };
  const handleCartPress = () => {
    if (currentOrders.length > 0) {
      navigation.navigate("order");
    }
  };
  const handleFavIconsPress = () => {
    setFavPressed(!favPressed);
  };
  console.log(currentOrders);
  const handleAddPress = (data) => {
    if (currentOrders.length < 99 && data) {
      dispatch(
        addToCurrentOrder({
          truckName: truckData.truckName,
          truckDescription: truckData.truckDescription,
          truckImg: truckData.truckImg,
          truckAddress: truckData.truckAddress,
          ...data,
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <View>
          <View>
            <View style={styles.backIcon}>
              <TouchableOpacity style={styles.cartBg} onPress={handleBackPress}>
                <Feather name="chevron-left" size={28} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.favIcon}>
              <TouchableOpacity onPress={handleFavIconsPress}>
                {!favPressed && (
                  <AntDesign name="staro" size={32} color={colors.action} />
                )}
                {favPressed && (
                  <AntDesign name="star" size={32} color={colors.action} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.cartIcon}>
              <View>
                <View style={styles.ItemsCartView}>
                  <Text style={styles.ItemsInCart}>{currentOrders.length}</Text>
                </View>
                <TouchableOpacity
                  style={styles.cartBg}
                  onPress={handleCartPress}
                >
                  <AntDesign
                    name="shoppingcart"
                    size={22}
                    color={colors.black}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Image
              style={{ width: "100%", height: 200, borderRadius: 5 }}
              source={{
                uri: truckData?.truckImg,
              }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.truckDetails}>
            <View style={styles.nameRat}>
              <Text style={styles.truckName}>{truckData?.truckName}</Text>
              <View>
                <AirbnbRating
                  size={17}
                  defaultRating={truckData?.truckRatings}
                  showRating={false}
                  isDisabled={true}
                />
              </View>
            </View>
            <View style={styles.locSche}>
              <View style={styles.section}>
                <EvilIcons
                  name="location"
                  size={20}
                  color={colors.lightBlack}
                />
                <Text style={styles.footerHead}>
                  Current at:{" "}
                  <Text style={styles.footerHeadBold}>
                    {truckData?.truckAddress}
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleSchedulePress}
                style={styles.schedule}
              >
                <Fontisto name="date" size={16} color={colors.textColor} />
                <Text style={styles.scheduleText}>Check schedule</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.section}>
              <EvilIcons name="clock" size={20} color={colors.lightBlack} />
              <Text style={styles.footerHead}>
                Time:{" "}
                <Text style={styles.footerHeadBold}>
                  {truckData?.truckTiming}
                </Text>
              </Text>
            </View>
          </View>
          <Text style={styles.menuName}>Menu</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.menuView}>
            <MenuList
              handleAddPress={handleAddPress}
              menuList={truckData?.truckMenu}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TruckDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white,
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
  nameRat: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  truckName: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textColor,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    width: "60%",
    marginRight: 8,
  },
  scheduleText: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: "700",
    color: colors.textColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.textColor,
  },
  schedule: {
    flexDirection: "row",
    alignItems: "center",
  },
  locSche: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  footerHead: {
    color: colors.lightBlack,
    fontSize: 12,
    fontWeight: "400",
  },
  footerHeadBold: {
    color: colors.textColor,
    fontSize: 13,
    fontWeight: "500",
  },
  truckDetails: {
    marginTop: 8,
  },
  menuView: {
    // marginTop: 30,
  },
  menuName: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textColor,
    marginTop: 30,
  },
  favIcon: {
    position: "absolute",
    zIndex: 200,
    right: "18%",
    top: "8%",
    opacity: 1,
  },
  cartIcon: {
    position: "absolute",

    zIndex: 200,
    right: "4%",
    top: "8%",
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
  ItemsCartView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,

    position: "absolute",
    bottom: "75%",
    left: "60%",
  },
  ItemsInCart: {
    backgroundColor: colors.action,
    width: 18,
    paddingHorizontal: 2,
    paddingVertical: 2,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "700",
    color: colors.white,
    // padding: 2,
    borderRadius: 10,
    overflow: "hidden",
  },
});
