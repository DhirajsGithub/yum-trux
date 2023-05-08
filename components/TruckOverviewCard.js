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
import ButtonComp from "./ButtonComp";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const TruckOverviewCard = () => {
  const handleSchedulePress = () => {};
  const handleTruckViewPress = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headTitle}>Vietnamese truck</Text>
        <TouchableOpacity onPress={handleSchedulePress} style={styles.schedule}>
          <Fontisto name="date" size={16} color={colors.white} />
          <Text style={styles.scheduleText}>Check schedule</Text>
        </TouchableOpacity>
      </View>
      <Image
        style={{ width: "100%", height: 175 }}
        source={{
          uri: "https://media.istockphoto.com/id/1344654556/photo/young-people-buying-meal-from-street-food-truck-modern-business-and-take-away-concept.jpg?b=1&s=170667a&w=0&k=20&c=06G_9tSmRUVnpjZgkvAtP_fLmC47OF8r5--DfNt4R5A=",
        }}
        resizeMode="cover"
      />

      <View style={styles.footer}>
        <View style={styles.locRat}>
          <View style={styles.section}>
            <EvilIcons name="location" size={20} color={colors.lightBlack} />
            <Text style={styles.footerHead}>
              Current at:{" "}
              <Text style={styles.footerHeadBold}>92 Gerald Street</Text>
            </Text>
          </View>
          <View>
            <Text>rting</Text>
          </View>
        </View>

        <View style={styles.section}>
          <EvilIcons name="clock" size={20} color={colors.lightBlack} />
          <Text style={styles.footerHead}>
            Time: <Text style={styles.footerHeadBold}>10 AM - 10 PM</Text>
          </Text>
        </View>
        <View style={styles.contentView}>
          <Text style={styles.content}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </Text>
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity onPress={handleTruckViewPress} style={styles.btn}>
            <Text style={styles.text}>VIEW</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
  schedule: {
    flexDirection: "row",
    alignItems: "center",
  },
  scheduleText: {
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
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
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
