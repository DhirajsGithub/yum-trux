import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import TruckOverviewCard from "./TruckOverviewCard";

const HomeTruckList = ({ truckList, homeComp }) => {
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
              truckRatings={item.ratings}
              truckTiming={item.timing}
              truckDescription={item.description}
              truckId={item.id}
              truckImg={item.imgUrl}
              truckMenu={item.menu}
              truckAddress={item.address}
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
