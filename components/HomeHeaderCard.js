import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../constants/colors";

const HomeHeaderCard = ({ truckName, handleOnPress, comp }) => {
  useEffect(() => {});
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleOnPress(truckName)}
        style={styles.content}
      >
        <Text style={styles.text}>{truckName}</Text>
        {comp}
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeaderCard;

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",

    flexGrow: 1,
    marginHorizontal: 5,
    marginVertical: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textColor,
    width: 70,
  },
  content: {
    height: 76,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 5,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
