import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import MenuItem from "./MenuItem";

const height = Dimensions.get("window").height;

const MenuList = ({ menuList, handleAddPress }) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {menuList.map((item, index) => {
          return (
            <MenuItem
              key={index}
              itemName={item.name}
              itemPrice={item.price}
              itemDiscription={item.description}
              handleAddPress={handleAddPress}
              itemId={item.id}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MenuList;

const styles = StyleSheet.create({
  container: {
    marginBottom: "170%",
  },
});
