import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import colors from "../constants/colors";

const MenuItem = ({
  itemName,
  itemPrice,
  itemDiscription,
  itemId,
  handleAddPress,
  imgUrl,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgNameBtn}>
        <View style={{ width: "25%" }}>
          <Image
            source={{
              uri:
                imgUrl?.length > 0
                  ? imgUrl
                  : "https://www.hatasi.com.vn/wp-content/uploads/2021/11/landscape-placeholder.png",
            }}
            style={styles.image}
          />
        </View>
        <View style={{ width: "75%" }}>
          <Text style={styles.description}>{itemDiscription}</Text>
        </View>
      </View>
      <View style={styles.imgNameBtn}>
        <Text style={styles.nameText}>{itemName}</Text>
        <Text style={styles.price}>$ {itemPrice?.toFixed(2)}</Text>
        <TouchableOpacity
          onPress={() =>
            handleAddPress({
              itemName,
              itemPrice,
              itemDiscription,
              itemId,
              imgUrl,
            })
          }
          style={styles.btn}
        >
          <Text style={styles.text}>ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
    // alignItems: "center",
    borderBottomColor: colors.borderBottom,
    paddingVertical: 9,
    borderBottomWidth: 1,
  },

  imgNameBtn: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
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
    textAlign: "left",
    width: "50%",
    fontSize: 20,
    fontWeight: "700",
    color: colors.textColor,
  },
  price: {
    maxWidth: "20%",
    fontSize: 15,
    fontWeight: "600",
    color: colors.textColor,
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
    color: "#454545",
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: "row",
    width: "70%",
  },
});
