import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HeaderComp from "../../components/HeaderComp";
import colors from "../../constants/colors";
import HomeHeaderCard from "../../components/HomeHeaderCard";
import HomeTruckList from "../../components/HomeTruckList";
import EmptyData from "../../components/EmptyData";
import {
  categoryListHttp,
  getUserStatus,
  truckListDetailHttp,
} from "../../utils/user-http-requests";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { useSelector } from "react-redux";
import Modal from "react-native-modal";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

const statusBarHeight = Constants.statusBarHeight;

const HomeScreen = () => {
  const userDetails = useSelector((state) => state.userSlice.userDetails);
  const userId = userDetails._id;
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const [truckListNew, setTruckListNew] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchUserStatus = async () => {
    const res = await getUserStatus(userId);
    if (res.status && res.status === "inactive") {
      navigation.navigate("login");
      alert("Your account is inactive. Please contact admin.");
    }
  };
  console.log(category);
  useFocusEffect(
    React.useCallback(() => {
      setSearchInput("");
      setCategory("");
      try {
        fetchUserStatus();
        fetchCategories();
        fetchTrucksList();
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }, [])
  );

  const fetchCategories = async () => {
    setLoading(true);
    let res = await categoryListHttp();
    setLoading(false);
    if (res.status === "success" && res?.categories?.length > 0) {
      setCategories(res.categories ? res.categories?.reverse() : []);
    } else {
      setCategories([]);
    }
  };
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
      fetchCategories();
      fetchTrucksList();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  const handleSettingPress = () => {};
  const handleTruckPress = (name) => {
    setModalVisible(false);
    setCategory(name);
  };

  const handleSearchInput = (text) => {
    setSearchInput(text);
  };
  const filteredTrucks = truckListNew?.filter((truck) => {
    const searchFilter = (truck?.name + truck?.category)
      ?.toLowerCase()
      .includes(searchInput?.toLowerCase());

    const categoryFilter =
      truck?.category
        ?.toLowerCase()
        .includes(category?.split(" ")[0].toLowerCase()) || category === "all";
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

          <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            animationOutTiming={500}
            transparent={true}
            isVisible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={{ marginTop: statusBarHeight + 10 }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons
                  style={{ textAlign: "center" }}
                  name="close-circle"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
              <Text style={styles.categoriesName}>Categories</Text>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalCat}>
                  <View key="allTrucksXYZ" style={{ width: "50%" }}>
                    <HomeHeaderCard
                      truckName="All Trucks"
                      handleOnPress={() => {
                        handleTruckPress("all");
                        setModalVisible(false);
                      }}
                    />
                  </View>
                  {categories?.map((item, index) => {
                    return (
                      <View key={item.categoryId} style={{ width: "50%" }}>
                        <HomeHeaderCard
                          id={item.categoryId}
                          truckName={item.name + " Trucks"}
                          handleOnPress={handleTruckPress}
                          comp={
                            <Image
                              style={{ width: 58, height: 58 }}
                              source={{ uri: item.imgUrl }}
                            />
                          }
                        />
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </Modal>

          <View style={styles.head1} horizontal={true}>
            {categories?.slice(0, 2).map((item, index) => {
              return (
                <View key={item.categoryId} style={{ width: "50%" }}>
                  <HomeHeaderCard
                    id={item.categoryId}
                    truckName={item.name + " Trucks"}
                    handleOnPress={handleTruckPress}
                    comp={
                      <Image
                        style={{ width: 58, height: 58 }}
                        source={{ uri: item.imgUrl }}
                      />
                    }
                  />
                </View>
              );
            })}
          </View>

          <ScrollView horizontal={true}>
            {categories?.slice(2, 4).map((item, index) => {
              return (
                <View key={item.categoryId} style={{ width: "35%" }}>
                  <HomeHeaderCard
                    id={item.categoryId}
                    truckName={item.name + " Trucks"}
                    handleOnPress={handleTruckPress}
                    comp={
                      <Image
                        style={{ width: 38, height: 37 }}
                        source={{ uri: item.imgUrl }}
                      />
                    }
                  />
                </View>
              );
            })}

            <View key="allCate" style={{ width: "30%" }}>
              <HomeHeaderCard
                id={"allCate"}
                truckName="ALL Catego..."
                handleOnPress={() => setModalVisible(true)}
              />
            </View>
          </ScrollView>
        </View>
        {filteredTrucks.length === 0 && !loading && (
          <EmptyData msg="No truck found 😞" />
        )}

        <View>
          <HomeTruckList truckList={filteredTrucks} homeComp={true} />
        </View>
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
    width: "100%",
    flex: "wrap",
  },
  headFile: {
    paddingHorizontal: 10,
    width: "100%",
    // paddingTop: 5,
  },
  modalCat: {
    flex: 1,
    flexDirection: "row",
    // alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingBottom: "20%",
  },
  categoriesName: {
    // backgroundColor: colors.lightBlack,
    color: "white",
    // padding: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
  },
});
