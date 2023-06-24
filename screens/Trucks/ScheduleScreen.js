import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
//-------

import { useNavigation, useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import ButtonComp from "../../components/ButtonComp";

const DateCard = ({
  backgroundColor,
  color,
  handleDateCardPress,
  date,
  day,
}) => {
  return (
    <TouchableOpacity
      onPress={handleDateCardPress}
      style={{
        // backgroundColor: colors.inputBg,
        height: 57,
        width: 70,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
        backgroundColor,
      }}
    >
      <Text
        style={{ color, textAlign: "center", fontWeight: "600", fontSize: 16 }}
      >
        {day}
      </Text>
      <Text
        style={{ color, textAlign: "center", fontWeight: "700", fontSize: 17 }}
      >
        {date}
      </Text>
    </TouchableOpacity>
  );
};

const LocTimeCard = ({ city, address, time }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingVertical: 22,
        borderRadius: 10,
        backgroundColor: colors.textColor,
        marginBottom: 14,
      }}
    >
      <Text
        style={{
          color: colors.white,
          textAlign: "center",
          fontSize: 17,
          fontWeight: "700",
          marginTop: 5,
        }}
      >
        {city}
      </Text>
      <Text
        style={{
          color: colors.white,
          textAlign: "center",
          fontSize: 15,
          fontWeight: "400",
          marginTop: 5,
        }}
      >
        {address}
      </Text>
      <Text
        style={{
          color: colors.action,
          textAlign: "center",
          fontSize: 20,
          fontWeight: "700",
          marginTop: 5,
        }}
      >
        {time}
      </Text>
    </View>
  );
};

const ScheduleScreen = () => {
  const route = useRoute();
  const truckData = route.params;
  const navigation = useNavigation();

  const [schDateInd, setScheDateInd] = useState(0); // this is for maping date with trucks location

  const [schDate, setSchDate] = useState(null); // this is choosen schedule date, intially it will be first selected
  const [schAdd, setSchAdd] = useState(null); // this is choosen schedule address, intially it will be first selected
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const dateObj = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const requDate =
    monthNames[dateObj.getMonth()] +
    " " +
    dateObj.getDate() +
    ", " +
    days[dateObj.getDay()];

  const handleBackBtnPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setSchDate(upcomingLocations[schDateInd].dateObj);
    setSchAdd(upcomingLocations[schDateInd].locations);
  }, [schDateInd]);
  const handleDateCardPress = (ind) => {
    setScheDateInd(ind);
  };

  const handleDonePress = () => {};

  const upcomingLocations = truckData.truckSchedule;
  console.log(upcomingLocations);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.top}>
            <TouchableOpacity onPress={handleBackBtnPress}>
              <Ionicons
                name="chevron-back-circle"
                size={35}
                color={colors.textColor}
              />
            </TouchableOpacity>
            <Text style={styles.dateNow}>{requDate}</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Image
              style={{
                width: "100%",
                height: 90,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
              source={{ uri: truckData.truckImg }}
            />
            <View style={styles.upcodimgView}>
              <Text style={styles.upcodimgText}>Upcoming locations</Text>
            </View>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{ marginTop: 12 }}
          >
            {upcomingLocations.map((item, index) => {
              return (
                <DateCard
                  date={item.dateObj.date}
                  day={item.dateObj.day}
                  color={schDateInd === index ? colors.white : colors.textColor}
                  backgroundColor={
                    schDateInd === index ? colors.textColor : colors.inputBg
                  }
                  handleDateCardPress={() => handleDateCardPress(index)}
                  key={index}
                />
              );
            })}
          </ScrollView>
          <View style={{ marginTop: 25 }}>
            {upcomingLocations[schDateInd]?.locations?.map((item, index) => {
              return (
                <LocTimeCard
                  city={item.city}
                  address={item.address}
                  time={item.time}
                  key={index}
                />
              );
            })}
          </View>
          <View style={styles.btn}>
            <ButtonComp height={50} handleBtnPress={handleDonePress}>
              DONE
            </ButtonComp>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateNow: {
    color: colors.textColor,
    fontSize: 20,
    fontWeight: "700",
  },
  upcodimgView: {
    backgroundColor: colors.action,
    paddingVertical: 4,
  },
  upcodimgText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
  },
  btn: {
    marginTop: "30%",
    marginBottom: "20%",
  },
});
