import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import TruckOverviewCard from "./TruckOverviewCard";

const ListComp = ({ trucksList, homeComp, screen }) => {
  const tempList = trucksList;
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={tempList}
        renderItem={({ item }) => (
          <TruckOverviewCard
            screen={screen}
            homeComp={homeComp}
            truckName={item.name}
            truckRatings={item.ratings}
            truckTiming={item.timing}
            truckDescription={item.description}
            truckId={item._id}
            truckImg={item.imgUrl}
            truckMenu={item.menu}
            truckAddress={item.address}
            truckSchedule={item.schedule}
          />
        )}
        keyExtractor={(item) => item._id}
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
