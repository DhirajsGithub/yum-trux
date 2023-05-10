import {
  StyleSheet,
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../constants/colors";

const HeaderComp = ({
  isTrucksList,
  handleSearchPress,
  handleFilterPress,
  handleSettingPress,
  prvOrders,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.commonView}>
        <Image
          style={{ width: 57, height: 57, marginRight: 4 }}
          source={require("../assets/Images/logo.png")}
        />
        <Text style={styles.heading}>YumTrux</Text>
      </View>
      <View style={styles.commonView}>
        <TouchableOpacity onPress={handleSearchPress}>
          <Feather
            style={{ marginRight: 12 }}
            name="search"
            size={24}
            color={colors.textColor}
          />
        </TouchableOpacity>

        {!isTrucksList && !prvOrders && (
          <TouchableOpacity onPress={handleSettingPress}>
            <Feather name="settings" size={24} color={colors.textColor} />
          </TouchableOpacity>
        )}
        {isTrucksList && !prvOrders && (
          <TouchableOpacity onPress={handleFilterPress}>
            <MaterialIcons name="tune" size={24} color={colors.textColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default HeaderComp;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.action,
  },
  commonView: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
