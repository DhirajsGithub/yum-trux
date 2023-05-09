import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../constants/colors";

const MenuItem = ({ itemName, itemPrie, itemDiscription, handleAddPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemDetail}>
        <Text style={styles.nameText}>{itemName}</Text>
        <Text style={styles.price}>$ {itemPrie}</Text>
        <Text style={styles.description}>{itemDiscription}</Text>
      </View>

      <TouchableOpacity onPress={handleAddPress} style={styles.btn}>
        <Text style={styles.text}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: colors.borderBottom,
    paddingVertical: 9,
    borderBottomWidth: 1,
  },
  itemDetail: {
    width: "65%",
  },
  btn: {
    minWidth: "30%",
    height: 35,
    maxWidth: 100,
    backgroundColor: colors.action,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.white,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textColor,
  },
  price: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.textColor,
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    color: "#454545",
  },
});
