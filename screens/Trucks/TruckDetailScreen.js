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
import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../constants/colors";
const windowWidth = Dimensions.get("window").width;
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

import { AirbnbRating } from "react-native-ratings";
import MenuList from "../../components/MenuList";

const TruckDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const truckData = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const handleBackPress = () => {
    navigation.goBack();
  };
  const handleSchedulePress = () => {};
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <View>
          <View>
            <View style={styles.backIcon}>
              <TouchableOpacity onPress={handleBackPress}>
                <Ionicons
                  name="md-chevron-back-circle"
                  size={38}
                  color={colors.textColor}
                />
              </TouchableOpacity>
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
            <MenuList menuList={truckData?.truckMenu} />
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
    top: "2%",
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
});
