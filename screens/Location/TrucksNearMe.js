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
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Modal from "react-native-modal";

import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../constants/colors";
import HeaderComp from "../../components/HeaderComp";
import MapView, { Marker } from "react-native-maps";
import { AirbnbRating } from "react-native-ratings";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Image } from "react-native";
import ButtonComp from "../../components/ButtonComp";
import { trucksList } from "../../data/trucks";
import GestureRecognizer from "react-native-swipe-gestures";
import * as Location from "expo-location";

const TruckCard = ({
  handleMakeOrderPress,
  truckName,
  truckAddress,
  truckTime,
  truckImg,
  truckRating,
}) => {
  return (
    <View
      style={{
        backgroundColor: "gray",
        padding: 13,
        borderRadius: 14,

        marginVertical: 10,
        backgroundColor: colors.white,
        elevation: 14,
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
              fontSize: 20,
              fontWeight: "600",
              width: 180,
            }}
          >
            {truckName} Truck
          </Text>
          <View style={{ left: "-20%" }}>
            <AirbnbRating
              size={17}
              defaultRating={truckRating}
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
        </View>
        <View>
          <Image
            style={{ width: 105, height: 85, borderRadius: 5 }}
            source={{
              uri: truckImg,
            }}
          />
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
  const handleMakeOrderPress = () => {};
  const [initialLatLong, setInitialLatLong] = useState(null);
  const [truckListData, setTruckListData] = useState(trucksList);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
  const handleSearchInput = (text) => {
    setSearchInput(text);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <HeaderComp
              handleSearchInput={handleSearchInput}
              onlySearch={true}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "600",
                  marginTop: 10,
                  color: colors.textColor,
                }}
              >
                Trucks near you
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 16, flex: 1 }}>
            <MapView
              zoomEnabled={true}
              initialRegion={
                location && {
                  latitude: location?.coords.latitude,
                  longitude: location?.coords.longitude,
                  latitudeDelta: 0,
                  longitudeDelta: 0,
                }
              }
              showsUserLocation={true}
              followsUserLocation={true}
              oomEnabled={true}
              style={styles.map}
            >
              <Marker
                pinColor={"blue"}
                title="Chinese Truck"
                description="Food stall"
                coordinate={{ latitude: 38.9632, longitude: 35.2423 }}
              />
              <Marker
                pinColor={"yellow"}
                title="Chinese Truck"
                description="Food stall"
                coordinate={
                  location
                    ? {
                        latitude: location?.coords.latitude,
                        longitude: location?.coords.longitude,
                      }
                    : { latitude: 38.9632, longitude: 35.2423 }
                }
              />
              <Marker
                pinColor={"green"}
                title="Mexican Truck"
                description="Food stall"
                coordinate={{ latitude: 38.9648, longitude: 35.2434 }}
              />
              <Marker
                pinColor={"red"}
                title="Veitamanian Truck"
                description="Food stall"
                coordinate={{ latitude: 38.9668, longitude: 35.253 }}
              />
            </MapView>
          </View>

          <GestureRecognizer
            style={{ flex: 1 }}
            onSwipeUp={handleSwipeUp}
            onSwipeDown={handleSwipeDown}
          >
            <Modal
              animationType="slide"
              // backdropOpacity={1}
              // style={{ height: "100%", width: "100%" }}
              isVisible={isModalVisible}
            >
              <View
                style={{
                  backgroundColor: colors.white,
                  height:
                    Platform.OS === "ios"
                      ? Dimensions.get("screen").height - 350
                      : Dimensions.get("screen").height - 250,
                  justifyContent: "center",
                  alignItems: "center",

                  // bottom: "2%",
                  borderRadius: 15,
                  paddingBottom: 10,
                }}
              >
                <TouchableOpacity onPress={handleSwipeDown}>
                  <Entypo name="chevron-small-down" size={30} color="black" />
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {truckListData.map((item, index) => {
                    return (
                      <View key={index}>
                        <TruckCard
                          truckName={item.name}
                          truckImg={item.imgUrl}
                          truckAddress={item.address}
                          truckRating={item.ratings}
                          truckTime={item.timing}
                          // here we go with truck id later
                          handleMakeOrderPress={() =>
                            handleMakeOrderPress(item.truckName)
                          }
                        />
                      </View>
                    );
                  })}
                </ScrollView>
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
                  style={{ position: "absolute", zIndex: 1009 }}
                  name="chevron-small-up"
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
              <TruckCard
                truckName={truckListData[0].name}
                truckImg={truckListData[0].imgUrl}
                truckAddress={truckListData[0].address}
                truckRating={truckListData[0].ratings}
                truckTime={truckListData[0].timing}
                // here we go with truck id later
                handleMakeOrderPress={() =>
                  handleMakeOrderPress(truckListData[0].truckName)
                }
              />
            </View>
          </GestureRecognizer>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TrucksNearMe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  map: {
    height:
      Platform.OS === "ios"
        ? Dimensions.get("screen").height - 360
        : Dimensions.get("screen").height - 340,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
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
    fontSize: 13,
    fontWeight: "500",
  },
  baseModal: {
    width: "100%",
    bottom: "1%",
    zIndex: 1000,
  },
});
