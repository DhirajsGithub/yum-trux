import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../constants/colors";

const ButtonComp = ({ children, handleBtnPress }) => {
  return (
    <TouchableOpacity onPress={handleBtnPress} style={styles.btn}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  btn: {
    height: 60,
    backgroundColor: colors.action,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    minWidth: 260,
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
  },
});
