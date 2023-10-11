import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import TruckOverviewCard from "./TruckOverviewCard";
import { useNavigation } from "@react-navigation/native";

const HomeTruckList = ({ truckList, homeComp, handleRefreshFunc }) => {
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const findRating = (ratingLi) => {
    if (ratingLi?.length > 0) {
      let sum = 0;
      for (let r of ratingLi) {
        sum = sum + r;
      }
      return Math.round(sum / ratingLi.length);
    }
    return 0;
  };

  const handleHomeTruckCardPress = (truckId) => {
    console.log(truckId);
    let truckDetail = truckList?.find((truck) => {
      return truck._id === truckId;
    });
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
    if (truckDetail) {
      const truckName = truckDetail.name;
      const truckRatings = findRating(truckDetail.ratings);
      const truckTiming = truckDetail.timing;
      const truckDescription = truckDetail.description;
      const truckId = truckDetail._id;
      const truckImg = truckDetail.imgUrl;
      const truckMenu = truckDetail.menu;
      const truckAddress = truckDetail.address;
      const truckSchedule = truckDetail.schedule;
      const paymentId = truckDetail.paymentId;
      const paypalEmail = truckDetail.paypalEmail;
      navigation.navigate("trucks", {
        screen: "truckDetail",
        params: {
          screen: "home",
          truckName,
          truckRatings,
          truckTiming,
          truckDescription,
          truckId,
          truckImg,
          truckMenu,
          truckAddress,
          truckSchedule,
          paymentId,
          paypalEmail,
        },
      });
    }
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
      {truckList?.length > 0 && (
        <FlatList
          contentContainerStyle={{ paddingBottom: "100%" }}
          showsVerticalScrollIndicator={false}
          data={truckList}
          keyExtractor={(item) => item._id}
          refreshing={refresh}
          onRefresh={handleRefresh}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleHomeTruckCardPress(item._id)}
            >
              <TruckOverviewCard
                screen="home"
                key={item._id}
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
            </TouchableOpacity>
          )}
        />
      )}

      {/* <ScrollView showsVerticalScrollIndicator={false}>
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
      </ScrollView> */}
    </View>
  );
};

export default HomeTruckList;

const styles = StyleSheet.create({
  container: {
    marginBottom: "100%",
  },
});
