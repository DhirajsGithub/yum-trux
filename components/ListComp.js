import {
  FlatList,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from "react-native";
import React, { useState } from "react";
import TruckOverviewCard from "./TruckOverviewCard";

const ListComp = ({ trucksList, homeComp, screen, handleRefreshFunc }) => {
  const tempList = trucksList;
  const [refresh, setRefresh] = useState(false);

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
  const getItem = (data, index) => {
    return data[index];
  };

  const handleRefresh = async () => {
    try {
      setRefresh(true);
      await handleRefreshFunc();
      setRefresh(false);
    } catch (error) {
      setRefresh(false);
    }
  };
  return (
    <View style={styles.container}>
      {tempList?.length > 0 && (
        <VirtualizedList
          showsVerticalScrollIndicator={false}
          data={tempList}
          keyExtractor={(item) => item._id}
          initialNumToRender={4}
          getItemCount={() => tempList.length}
          getItem={getItem}
          refreshing={refresh}
          onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <TruckOverviewCard
              paypalEmail={item.paypalEmail}
              paymentId={item.paymentId}
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
        />
      )}
    </View>
  );
};

export default ListComp;

const styles = StyleSheet.create({
  container: {
    marginBottom: "100%",
    height: "100%",
  },
});
