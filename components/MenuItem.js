import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../constants/colors";

const MenuItem = () => {
  const handleBtnPress = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.itemDetail}>
        <Text style={styles.nameText}>Name of Dish</Text>
        <Text style={styles.price}>$ 50</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, nisi?
        </Text>
      </View>

      <TouchableOpacity onPress={handleBtnPress} style={styles.btn}>
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
