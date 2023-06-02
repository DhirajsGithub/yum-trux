import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import TruckOverviewCard from "./TruckOverviewCard";

const HomeTruckList = ({ truckList, homeComp }) => {
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {truckList.map((item, index) => {
          return (
            <TruckOverviewCard
              screen="home"
              key={index}
              homeComp={homeComp}
              truckName={item.name}
              truckTiming={item.timing}
              truckDescription={item.description}
              truckRatings={findRating(item.ratings)}
              truckId={item._id}
              truckImg={item.imgUrl}
              truckMenu={item.menu}
              truckAddress={item.address}
              truckSchedule={item.schedule}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HomeTruckList;

const styles = StyleSheet.create({
  container: {
    marginBottom: "100%",
  },
});
