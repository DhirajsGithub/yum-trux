import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HeaderComp from "../../components/HeaderComp";
import colors from "../../constants/colors";
import HomeHeaderCard from "../../components/HomeHeaderCard";
import HomeTruckList from "../../components/HomeTruckList";
import EmptyData from "../../components/EmptyData";
import { truckListDetailHttp } from "../../utils/user-http-requests";
import Spinner from "react-native-loading-spinner-overlay/lib";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const [truckListNew, setTruckListNew] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      try {
        fetchTrucksList();
      } catch (error) {
        console.log(error);
      }
    }, [])
  );

  const fetchTrucksList = async () => {
    setLoading(true);
    let res = await truckListDetailHttp();
    if (res.status === "success") {
      setTruckListNew(res.truckList);
    } else {
      setTruckListNew([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    try {
      fetchTrucksList();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSettingPress = () => {};
  const handleTruckPress = (name) => {
    setCategory(name);
  };

  const handleSearchInput = (text) => {
    setSearchInput(text);
  };
  const filteredTrucks = truckListNew?.filter((truck) => {
    const searchFilter = truck.name
      ?.toLowerCase()
      .includes(searchInput?.toLowerCase());

    const categoryFilter =
      truck?.name?.toLowerCase().includes(category?.toLowerCase()) ||
      category === "More";
    return categoryFilter && searchFilter;
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        // textContent={'Loading...'}
        color={colors.action}
        // textStyle={styles.spinnerTextStyle}
      />
      <SafeAreaView>
        <View style={styles.headFile}>
          <View style={{ marginHorizontal: 6 }}>
            <HeaderComp
              isTrucksList={false}
              handleSettingPress={handleSettingPress}
              handleSearchInput={handleSearchInput}
            />
          </View>

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
        {filteredTrucks.length === 0 && <EmptyData msg="No truck found 😞" />}
        <ScrollView>
          <View>
            <HomeTruckList truckList={filteredTrucks} homeComp={true} />
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
    // paddingTop: 5,
  },
});
