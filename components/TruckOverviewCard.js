import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Image } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import colors from "../constants/colors";
import { AirbnbRating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const TruckOverviewCard = ({
  truckName,
  truckRatings,
  truckTiming,
  truckDescription,
  truckId,
  truckImg,
  truckMenu,
  truckAddress,
  truckSchedule,
  homeComp,
}) => {
  const navigation = useNavigation();
  const handleSchedulePress = () => {
    navigation.navigate("scheduleScreen", {
      truckImg,
      truckSchedule,
      truckId,
      // also truck upcoming location, for now it is hardcoded in schedule page
      // also pass this params from truckDetails screen
    });
  };
  const handleTruckViewPress = () => {
    navigation.navigate("truckDetail", {
      // all necessary fields of truck must be pass here, which will be use to carry to order further
      truckName,
      truckRatings,
      truckTiming,
      truckDescription,
      truckId,
      truckImg,
      truckMenu,
      truckAddress,
      truckSchedule,

      // note to pass all this params when click on view truck from order history
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headTitle}>{truckName} truck</Text>
        {!homeComp && (
          <TouchableOpacity
            onPress={handleSchedulePress}
            style={styles.schedule}
          >
            <Fontisto name="date" size={16} color={colors.white} />
            <Text style={styles.scheduleText}>Check schedule</Text>
          </TouchableOpacity>
        )}
      </View>
      <Image
        style={{ width: "100%", height: 175 }}
        source={{
          uri: truckImg,
        }}
        resizeMode="cover"
      />

      <View style={styles.footer}>
        <View style={styles.locRat}>
          <View style={styles.section}>
            <EvilIcons name="location" size={20} color={colors.lightBlack} />
            <Text style={styles.footerHead}>
              Current at:{" "}
              <Text style={styles.footerHeadBold}>{truckAddress}</Text>
            </Text>
          </View>
          <View>
            <AirbnbRating
              size={15}
              defaultRating={truckRatings}
              showRating={false}
              isDisabled={true}
            />
          </View>
        </View>

        <View style={styles.section}>
          <EvilIcons name="clock" size={20} color={colors.lightBlack} />
          <Text style={styles.footerHead}>
            Time: <Text style={styles.footerHeadBold}>{truckTiming}</Text>
          </Text>
        </View>
        {!homeComp && (
          <>
            <View style={styles.contentView}>
              <Text style={styles.content}>
                {truckDescription?.length > 215
                  ? truckDescription?.slice(0, 215) + "..."
                  : truckDescription}
              </Text>
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity
                onPress={handleTruckViewPress}
                style={styles.btn}
              >
                <Text style={styles.text}>VIEW</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default TruckOverviewCard;

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 20,
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 7,
    backgroundColor: colors.white,
    elevation: 6,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.textColor,
    padding: 13,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  headTitle: {
    width: "55%",
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
  schedule: {
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleText: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: "700",
    color: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  },
  locRat: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    width: "60%",
    marginRight: 8,
  },
  footer: {
    marginTop: 10,
    marginHorizontal: 12,
    marginBottom: 17,
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
  contentView: {
    marginTop: 13,
  },
  content: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 14,
  },
  btn: {
    height: 35,
    width: 150,
    backgroundColor: colors.action,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
});
