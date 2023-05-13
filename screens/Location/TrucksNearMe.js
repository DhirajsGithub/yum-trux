import {
  Alert,
  Button,
  Dimensions,
  FlatList,
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
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { trucksList } from "../../data/trucks";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

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
              marginBottom: 25,
            }}
          >
            {truckName} Truck
          </Text>
          <View style={{ position: "absolute", top: 25 }}>
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
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setInitialLatLong({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    console.log(location);
  }

  const [isModalVisible, setModalVisible] = useState(false);

  const handleSwipeUp = () => {
    setModalVisible(true);
  };
  const handleSwipeDown = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <HeaderComp onlySearch={true} />
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
              <TouchableOpacity onPress={getLocationHandler}>
                <Ionicons name="locate" size={30} color={colors.textColor} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: 16, flex: 1 }}>
            <MapView
              zoomEnabled={true}
              initialRegion={{
                latitude: 38.9637,
                longitude: 35.2433,
                latitudeDelta: 0,
                longitudeDelta: 0,
              }}
              // minZoomLevel={100000}
              showsUserLocation={true}
              followsUserLocation={true}
              style={styles.map}
            >
              <Marker
                pinColor={"blue"}
                title="Chinese Truck"
                description="Food stall"
                coordinate={{ latitude: 38.9632, longitude: 35.2423 }}
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
              onSwipeStart={() => console.log("swipe")}
            >
              <View
                style={{
                  backgroundColor: colors.white,
                  height: Dimensions.get("window").height - 350,
                  // width: Dimensions.get("window").width - 32,
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  bottom: "2%",
                  borderRadius: 15,
                  paddingHorizontal: 5,
                  paddingBottom: 10,
                }}
              >
                <Entypo name="chevron-small-down" size={24} color="black" />
                <ScrollView showsVerticalScrollIndicator={false}>
                  {truckListData.map((item, index) => {
                    return (
                      <View style={{ minWidth: "100%" }} key={index}>
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
    // maxHeight: Dimensions.get("window").height,
  },
  map: {
    // width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 200,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    width: "90%",
    // marginRight: 8,
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
  baseModal: {
    // marginBottom: "25%",
    position: "absolute",
    width: "100%",
    bottom: "10%",
    zIndex: 1000,
  },
});
