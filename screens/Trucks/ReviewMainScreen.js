import {
  Alert,
  BackHandler,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import colors from "../../constants/colors";
import { Image } from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import ButtonComp from "../../components/ButtonComp";
import { addRatingToTruck } from "../../utils/user-http-requests";
const WATER_IMAGE = require("../../assets/Images/water.png");

const height = Dimensions.get("window").height;

const ReviewMainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const orderData = route.params;
  const truckImg = orderData.truckImg;
  const truckName = orderData.truckName;
  const truckId = orderData.truckId;
  const [ragings, setRatings] = useState(5);
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const handleSkipPress = () => {
    navigation.navigate("trucksList");
  };
  const ratingCompleted = (rating) => {
    setRatings(rating);
  };

  const handleSendBtnPress = async () => {
    try {
      await addRatingToTruck(truckId, ragings);
    } catch (error) {
      console.log(err);
    }
    navigation.navigate("trucksList");
  };

  const handleBackPress = () => {
    if (route.name === "reviewScreen" && navigation.isFocused()) {
      Alert.alert(
        "Exit Screen",
        "Exit without Rating",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Leave",
            onPress: () => navigation.navigate("trucksList"),
            style: "destructive",
          },
        ],
        {
          cancelable: false,
        }
      );
      return true;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={handleSkipPress} style={styles.header}>
            <Text style={styles.headText}>Skip</Text>
            <Entypo name="cross" size={25} color={colors.textColor} />
          </TouchableOpacity>
          <View style={styles.imgView}>
            <Image
              style={{ width: 125, height: 124, borderRadius: 200 }}
              source={{
                uri: truckImg,
              }}
            />
          </View>
          <View>
            <Text style={styles.rateText}>Rate your Order</Text>
            <Text style={styles.para}>
              The <Text style={styles.truckNameText}>{truckName}</Text> truck
              will get your rating
            </Text>
          </View>

          <View style={styles.ratings}>
            <AirbnbRating
              defaultRating={5}
              reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
              ratingColor="#3498db"
              ratingBackgroundColor="#c8c7c8"
              onFinishRating={ratingCompleted}
              selectedColor={colors.action}
              reviewColor={colors.action}
              unSelectedColor="#B3B3B3"
            />
          </View>
          <View style={styles.btn}>
            <ButtonComp height={52} handleBtnPress={handleSendBtnPress}>
              SEND
            </ButtonComp>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ReviewMainScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  headText: {
    color: colors.textColor,
    fontSize: 15,
    fontWeight: "500",
  },
  imgView: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  rateText: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  para: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 28,
  },
  truckNameText: {
    fontWeight: "700",
  },
  ratings: {
    marginBottom: "52%",
  },
  btn: {
    marginBottom: "25%",
  },
});
