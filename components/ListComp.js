import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { trucksList } from "../data/trucks";
import TruckOverviewCard from "./TruckOverviewCard";

const ListComp = () => {
  const tempList = trucksList;
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={tempList}
        renderItem={({ item }) => <TruckOverviewCard />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ListComp;

const styles = StyleSheet.create({
  container: {
    marginBottom: 180,
  },
});
