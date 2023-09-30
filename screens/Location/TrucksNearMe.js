import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar as StatusBar2,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Modal from "react-native-modal";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../constants/colors";
import HeaderComp from "../../components/HeaderComp";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { AirbnbRating } from "react-native-ratings";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Image } from "react-native";
import ButtonComp from "../../components/ButtonComp";
import { trucksList } from "../../data/trucks";
import GestureRecognizer from "react-native-swipe-gestures";
import * as Location from "expo-location";
import { truckListDetailHttp } from "../../utils/user-http-requests";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

const TruckCard = ({
  handleMakeOrderPress,
  truckName,
  truckAddress,
  truckTime,
  truckImg,
  truckRating,
  distanceAndTime,
}) => {
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
  return (
    <View
      style={{
        backgroundColor: "gray",
        padding: 13,
        borderRadius: 14,

        marginVertical: 10,
        backgroundColor: colors.white,
        elevation: 5,
        shadowColor: "#171717",
        shadowOffset: { width: -3, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              color: colors.textColor,
              fontSize: 18,
              fontWeight: "600",
              width: "100%",
            }}
          >
            {truckName}
          </Text>
          <View style={{ left: "-20%" }}>
            <AirbnbRating
              size={12}
              defaultRating={findRating(truckRating)}
              showRating={false}
              isDisabled={true}
            />
          </View>

          <View style={styles.section}>
            <EvilIcons name="location" size={20} color={colors.lightBlack} />
            <Text style={styles.footerHead}>
              Current at:{" "}
              <Text style={styles.footerHeadBold}>{truckAddress}</Text>
            </Text>
          </View>
          <View style={styles.section}>
            <EvilIcons name="clock" size={20} color={colors.lightBlack} />
            <Text style={styles.footerHead}>
              Time: <Text style={styles.footerHeadBold}>{truckTime}</Text>
            </Text>
          </View>
          <View style={styles.section}>
            <Fontisto name="car" size={20} color="black" />
            <Text style={{ fontSize: 14, fontWeight: 500 }}>
              &nbsp;&nbsp;{distanceAndTime?.time}
            </Text>
          </View>
        </View>
        <View>
          <Image
            style={{ width: "100%", height: 80, borderRadius: 5 }}
            source={{
              uri: truckImg,
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="map-marker-distance"
              size={15}
              color="black"
            />
            <Text style={{ fontSize: 14, fontWeight: 500 }}>
              {distanceAndTime?.distance}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 24, marginBottom: 8 }}>
        <ButtonComp height={46} handleBtnPress={handleMakeOrderPress}>
          MAKE ORDER
        </ButtonComp>
      </View>
    </View>
  );
};

const TrucksNearMe = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const [initialLatLong, setInitialLatLong] = useState(null);
  const [truckListData, setTruckListData] = useState([]);
  const [truckCordinates, setTruckCordinates] = useState([]);
  const [tempTruckListData, setTempTruckListData] = useState([]);
  const [tempTruckCordinates, setTempTruckCordinates] = useState([]);
  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     try {
  //       fetchTrucksList();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }, [])
  // );

  const fetchTrucksList = async () => {
    setLoading(true);
    let res = await truckListDetailHttp();
    if (res.status === "success") {
      let temp = [];
      let tempCordinates = [];
      for (let truck of res.truckList) {
        if (truck.latLong.latitude && truck.latLong.latitude) {
          tempCordinates.push({
            latitude: truck.latLong.latitude
              ? parseFloat(truck.latLong.latitude)
              : 0,
            longitude: truck.latLong.longitude
              ? parseFloat(truck.latLong.longitude)
              : 0,
            color: "#" + Math.floor(Math.random() * 16777215).toString(16),
            truckName: truck.name,
            category: truck.category,
            truckDescription: truck.description,
          });
          let res = await fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${truck.latLong.latitude},${truck.latLong.longitude}&origins=${location?.coords.latitude},${location?.coords.longitude}&units=imperial&key=AIzaSyCgwqGtmAnaG3iFtWcw7xLS-1Idq_fxzx0`
          );
          res = await res.json();

          let distanceAndTime = {
            distance: "1000000 mi",
            time: "Over sea",
          };
          if (res?.rows[0]?.elements[0]?.distance) {
            distanceAndTime = {
              distance: res?.rows[0]?.elements[0]?.distance.text,
              time: res?.rows[0]?.elements[0]?.duration.text,
            };
          }
          temp.push({ ...truck, distanceAndTime });
        }
      }
      setTruckCordinates(tempCordinates);
      setTruckListData(temp);
      setTempTruckListData(temp);
      setTempTruckCordinates(tempCordinates);
    } else {
      setTruckListData([]);
      setTruckCordinates([]);
    }
    setLoading(false);
  };

  let filterTrucks = truckListData.sort((a, b) => {
    return (
      Number(a?.distanceAndTime?.distance?.split(" ")[0]) -
      Number(b?.distanceAndTime?.distance?.split(" ")[0])
    );
  });

  useEffect(() => {
    try {
      fetchTrucksList();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);

  const handleSwipeUp = () => {
    setModalVisible(true);
  };
  const handleSwipeDown = () => {
    setModalVisible(false);
  };
  const [searchInput, setSearchInput] = useState("");

  const statusBarHeight = Constants.statusBarHeight;

  const handleMakeOrderPress = (truckId) => {
    setModalVisible(false);
    let truckDetail = truckListData?.find((truck) => {
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
      const category = truckDetail.category;
      navigation.navigate("trucks", {
        screen: "truckDetail",
        params: {
          screen: "truckNearMe",
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
          category,
        },
      });
    }
  };

  const handleSearchInput = (text) => {
    setSearchInput(text);
    let filterTruckCordinates = tempTruckCordinates.filter((truck) => {
      return (truck?.truckName + truck?.category)
        ?.toLowerCase()
        .includes(text.toLowerCase());
    });
    setTruckCordinates(filterTruckCordinates);
    let filterTruckListData = tempTruckListData.filter((truck) => {
      return (truck?.name + truck?.category)
        ?.toLowerCase()
        .includes(text.toLowerCase());
    });
    setTruckListData(filterTruckListData);
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
      <View style={{ marginTop: statusBarHeight, paddingHorizontal: 16 }}>
        <HeaderComp handleSearchInput={handleSearchInput} onlySearch={true} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              marginTop: 5,
              color: colors.textColor,
            }}
          >
            Trucks near you
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 5, flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={
            location && {
              latitude: location?.coords.latitude
                ? location?.coords.latitude
                : 0,
              longitude: location?.coords.longitude
                ? location?.coords.longitude
                : 0,
              latitudeDelta: 0,
              longitudeDelta: 0,
            }
          }
          showsUserLocation={true}
          followsUserLocation={true}
          style={styles.map}
        >
          {truckCordinates?.map((cordinate, index) => {
            return (
              <Marker
                key={index}
                pinColor={cordinate.color}
                title={cordinate.truckName}
                description={cordinate.truckDescription.slice(0, 40) + "..."}
                coordinate={{
                  latitude: cordinate.latitude ? cordinate.latitude : 0,
                  longitude: cordinate.longitude ? cordinate.longitude : 0,
                }}
              />
            );
          })}
        </MapView>
      </View>

      <Modal animationType="slide" isVisible={isModalVisible}>
        <View
          style={{
            backgroundColor: colors.white,
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
            paddingBottom: 10,
          }}
        >
          <TouchableOpacity onPress={handleSwipeDown}>
            <Entypo name="chevron-small-down" size={40} color="black" />
          </TouchableOpacity>

          {filterTrucks?.length > 0 && (
            <FlatList
              contentContainerStyle={{ paddingBottom: "100%" }}
              showsVerticalScrollIndicator={false}
              data={filterTrucks}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TruckCard
                  distanceAndTime={item.distanceAndTime}
                  truckName={item.name}
                  truckImg={item.imgUrl}
                  truckAddress={item.address}
                  truckRating={item.ratings}
                  truckTime={item.timing}
                  truckId={item._id}
                  // here we go with truck id later
                  handleMakeOrderPress={() => handleMakeOrderPress(item._id)}
                />
              )}
            />
          )}

          {/* <ScrollView showsVerticalScrollIndicator={false}>
            {filterTrucks?.map((item, index) => {
              return (
                <View key={index}>
                  <TruckCard
                    distanceAndTime={item.distanceAndTime}
                    truckName={item.name}
                    truckImg={item.imgUrl}
                    truckAddress={item.address}
                    truckRating={item.ratings}
                    truckTime={item.timing}
                    truckId={item._id}
                    // here we go with truck id later
                    handleMakeOrderPress={() => handleMakeOrderPress(item._id)}
                  />
                </View>
              );
            })}
          </ScrollView> */}
        </View>
      </Modal>

      <View style={styles.baseModal}>
        <TouchableOpacity
          onPress={handleSwipeUp}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            zIndex: 1009,
          }}
        >
          <Entypo
            style={{ position: "absolute", zIndex: 1009, paddingVertical: 6 }}
            name="chevron-small-up"
            size={40}
            color="black"
          />
        </TouchableOpacity>
        {filterTrucks.length > 0 && (
          <TruckCard
            truckName={filterTrucks[0].name}
            truckImg={filterTrucks[0].imgUrl}
            truckAddress={filterTrucks[0].address}
            truckRating={filterTrucks[0].ratings}
            truckTime={filterTrucks[0].timing}
            distanceAndTime={filterTrucks[0].distanceAndTime}
            // here we go with truck id later
            handleMakeOrderPress={() =>
              handleMakeOrderPress(filterTrucks[0]._id)
            }
          />
        )}
      </View>
    </View>
  );
};

export default TrucksNearMe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  map: {
    flex: 1,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    width: "90%",
  },
  footerHead: {
    color: colors.lightBlack,
    fontSize: 12,
    fontWeight: "400",
    width: "65%",
  },
  footerHeadBold: {
    color: colors.textColor,
    fontSize: 14,
    fontWeight: "500",
  },
  baseModal: {
    position: "absolute",
    paddingHorizontal: 10,
    width: "100%",
    bottom: Platform.OS === "android" ? "-2%" : "3%",
    zIndex: 1000,
  },
});
