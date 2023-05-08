import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import MenuItem from "./MenuItem";

const MenuList = ({ menuList }) => {
  return (
    <View style={styles.container}>
      <FlatList
        // style={{ flex: 0 }}
        showsVerticalScrollIndicator={false}
        data={menuList}
        renderItem={({ item }) => <MenuItem />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MenuList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: "10000%",
    // flex: 1,
    marginBottom: 180,
  },
});
