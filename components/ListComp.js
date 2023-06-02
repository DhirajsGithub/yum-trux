import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import TruckOverviewCard from "./TruckOverviewCard";

const ListComp = ({ trucksList, homeComp, screen }) => {
  const tempList = trucksList;
  const findRating = (ratingLi) => {
    if (ratingLi.length > 0) {
      let sum = 0;
      for (let r of ratingLi) {
        sum = sum + r;
      }
      return Math.round(sum / ratingLi.length);
    }
    return 0;
  };
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
            truckRatings={findRating(item.ratings)}
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
