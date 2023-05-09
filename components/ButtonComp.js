import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../constants/colors";

const ButtonComp = ({ children, handleBtnPress, height }) => {
  return (
    <TouchableOpacity onPress={handleBtnPress} style={[styles.btn, { height }]}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.action,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 260,
  },
  text: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
  },
});
