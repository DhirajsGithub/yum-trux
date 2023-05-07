import {
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import colors from "../../constants/colors";
import { Image } from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import ButtonComp from "../../components/ButtonComp";
const WATER_IMAGE = require("../../assets/Images/water.png");

const ReviewMainScreen = () => {
  const navigation = useNavigation();
  const [ragings, setRatings] = useState(5);
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const handleSkipPress = () => {};
  const ratingCompleted = (rating) => {
    setRatings(rating);
  };

  const handleSendBtnPress = () => {
    console.log(ragings);
  };

  const truckName = "Mexican food";
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <ScrollView>
          <TouchableOpacity onPress={handleSkipPress} style={styles.header}>
            <Text style={styles.headText}>Skip</Text>
            <Entypo name="cross" size={25} color={colors.textColor} />
          </TouchableOpacity>
          <View style={styles.imgView}>
            <Image
              style={{ width: 125, height: 124, borderRadius: 200 }}
              source={{
                uri: "https://t3.ftcdn.net/jpg/01/63/75/02/360_F_163750221_q6QxEYOxEtMvqHojqWpiqwcquyAmjFuP.jpg",
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
          <View>
            <ButtonComp handleBtnPress={handleSendBtnPress}>SEND</ButtonComp>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ReviewMainScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 30,
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
});
