import { StyleSheet, Text, View } from "react-native";
import React from "react";

const EmptyData = ({ msg }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>{msg}</Text>
    </View>
  );
};

export default EmptyData;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
