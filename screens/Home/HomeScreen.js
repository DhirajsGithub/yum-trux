import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HeaderComp from "../../components/HeaderComp";
import colors from "../../constants/colors";
import HomeHeaderCard from "../../components/HomeHeaderCard";
import { trucksList } from "../../data/trucks";
import ListComp from "../../components/ListComp";
import HomeTruckList from "../../components/HomeTruckList";

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const [truckListNew, setTruckListNew] = useState([]);
  useEffect(() => {
    setTruckListNew(trucksList);
  }, []);
  const handleSearchPress = () => {};
  const handleSettingPress = () => {};
  const handleTruckPress = (name) => {
    console.log(name);
    if (name === "More") {
      setTruckListNew(trucksList);
      return;
    }
    const newList = trucksList.filter((truck) => {
      return truck?.name?.toLowerCase().includes(name?.toLowerCase());
    });
    setTruckListNew(newList);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <View style={styles.headFile}>
          <HeaderComp
            isTrucksList={false}
            handleSearchPress={handleSearchPress}
            handleSettingPress={handleSettingPress}
          />
          <View style={styles.head1}>
            <HomeHeaderCard
              truckName="Mexican"
              handleOnPress={handleTruckPress}
              comp={
                <Image
                  style={{ width: 58, height: 58 }}
                  source={require("../../assets/Images/taco.png")}
                />
              }
            />
            <HomeHeaderCard
              truckName="Chinese"
              handleOnPress={handleTruckPress}
              comp={
                <Image
                  style={{ width: 58, height: 58 }}
                  source={require("../../assets/Images/noodles.png")}
                />
              }
            />
          </View>

          <ScrollView horizontal={true}>
            <HomeHeaderCard
              truckName="Japanese"
              handleOnPress={handleTruckPress}
              comp={
                <Image
                  style={{ width: 39, height: 39 }}
                  source={require("../../assets/Images/sushi.png")}
                />
              }
            />
            <HomeHeaderCard
              truckName="Vietnamese"
              handleOnPress={handleTruckPress}
              comp={
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../assets/Images/goi-cuon.png")}
                />
              }
            />
            <HomeHeaderCard truckName="More" handleOnPress={handleTruckPress} />
          </ScrollView>
        </View>
        <ScrollView>
          <View>
            <HomeTruckList truckList={truckListNew} homeComp={true} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // padding: 10,
  },
  head1: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headFile: {
    paddingHorizontal: 10,
    paddingTop: 5,
  },
});
