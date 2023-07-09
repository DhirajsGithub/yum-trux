import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import colors from "../../constants/colors";
import RectangularDisplayFields from "../../components/RectangularDisplayFields";
import ButtonComp from "../../components/ButtonComp";

const TrucksFilterScreen = () => {
  const navigation = useNavigation();
  const [selectedMile, setSelectedMile] = useState(null);
  const [priceFilter, setPriceFilter] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [promOffer, setPromOffer] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const handleSkipPress = () => {
    navigation.goBack();
  };
  const handleMilePress = (miles) => {
    var matches = miles.match(/(\d+)/);
    setSelectedMile(matches[0]);
  };
  const handlePricePress = (priceFil) => {
    setPriceFilter(priceFil);
  };
  const handleRatingPress = (ratingFil) => {
    setRatingFilter(ratingFil);
  };
  const handlePromOffer = (val) => {
    setPromOffer(val);
  };
  const handleApplyPress = () => {
    alert(
      "filters " +
      " " +
      selectedMile +
      " " +
      priceFilter +
      " " +
      ratingFilter +
      " " +
      promOffer
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headText}>Filters</Text>
            <TouchableOpacity onPress={handleSkipPress}>
              <Entypo name="cross" size={28} color={colors.lightBlack} />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.commonView,
              {
                borderBottomColor: colors.borderBottom,
                paddingBottom: 23,
                borderBottomWidth: 1,
              },
            ]}
          >
            <Text style={styles.subHeading}>Radius</Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.commonHorView}
            >
              <RectangularDisplayFields
                paddingHorizontal={20}
                paddingVertical={9}
                textSize={15}
                textWeight={500}
                textColor={
                  selectedMile === "5" ? colors.white : colors.textColor
                }
                bgColor={
                  selectedMile === "5" ? colors.textColor : colors.inputBg
                }
                borderRadius={24}
                width={100}
                marginRight={8}
                handlePress={handleMilePress}
              >
                5 miles
              </RectangularDisplayFields>
              <RectangularDisplayFields
                paddingHorizontal={20}
                paddingVertical={9}
                textSize={15}
                textWeight={500}
                textColor={
                  selectedMile === "10" ? colors.white : colors.textColor
                }
                bgColor={
                  selectedMile === "10" ? colors.textColor : colors.inputBg
                }
                borderRadius={24}
                width={100}
                marginRight={8}
                handlePress={handleMilePress}
              >
                10 miles
              </RectangularDisplayFields>
              <RectangularDisplayFields
                paddingHorizontal={20}
                paddingVertical={9}
                textSize={15}
                textWeight={500}
                textColor={
                  selectedMile === "20" ? colors.white : colors.textColor
                }
                bgColor={
                  selectedMile === "20" ? colors.textColor : colors.inputBg
                }
                borderRadius={24}
                width={100}
                marginRight={8}
                handlePress={handleMilePress}
              >
                20 miles
              </RectangularDisplayFields>
              <RectangularDisplayFields
                paddingHorizontal={20}
                paddingVertical={9}
                textSize={15}
                textWeight={500}
                textColor={
                  selectedMile === "30" ? colors.white : colors.textColor
                }
                bgColor={
                  selectedMile === "30" ? colors.textColor : colors.inputBg
                }
                borderRadius={24}
                width={110}
                marginRight={8}
                handlePress={handleMilePress}
              >
                {"<30 miles"}
              </RectangularDisplayFields>
            </ScrollView>
          </View>

          <View
            style={[
              styles.commonView,
              {
                borderBottomColor: colors.borderBottom,
                paddingBottom: 23,
                borderBottomWidth: 1,
              },
            ]}
          >
            <Text style={styles.subHeading}>Price</Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={styles.commonHorView}
              horizontal={true}
            >
              <RectangularDisplayFields
                paddingHorizontal={20}
                paddingVertical={9}
                textSize={15}
                textWeight={500}
                textColor={
                  priceFilter === "Lowest to highest"
                    ? colors.white
                    : colors.textColor
                }
                bgColor={
                  priceFilter === "Lowest to highest"
                    ? colors.textColor
                    : colors.inputBg
                }
                borderRadius={24}
                marginRight={8}
                handlePress={handlePricePress}
              >
                Lowest to highest
              </RectangularDisplayFields>
              <RectangularDisplayFields
                paddingHorizontal={20}
                paddingVertical={9}
                textSize={15}
                textWeight={500}
                textColor={
                  priceFilter === "Highest to lowest"
                    ? colors.white
                    : colors.textColor
                }
                bgColor={
                  priceFilter === "Highest to lowest"
                    ? colors.textColor
                    : colors.inputBg
                }
                borderRadius={24}
                marginRight={8}
                handlePress={handlePricePress}
              >
                Highest to lowest
              </RectangularDisplayFields>
            </ScrollView>
          </View>
          <View style={styles.commonView}>
            <Text style={styles.subHeading}>Rating</Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={styles.commonHorView}
              horizontal={true}
            >
              <RectangularDisplayFields
                paddingHorizontal={20}
                paddingVertical={9}
                textSize={15}
                textWeight={500}
                textColor={
                  ratingFilter === "Lowest to highest"
                    ? colors.white
                    : colors.textColor
                }
                bgColor={
                  ratingFilter === "Lowest to highest"
                    ? colors.textColor
                    : colors.inputBg
                }
                borderRadius={24}
                marginRight={8}
                handlePress={handleRatingPress}
              >
                Lowest to highest
              </RectangularDisplayFields>
              <RectangularDisplayFields
                paddingHorizontal={20}
                paddingVertical={9}
                textSize={15}
                textWeight={500}
                textColor={
                  ratingFilter === "Highest to lowest"
                    ? colors.white
                    : colors.textColor
                }
                bgColor={
                  ratingFilter === "Highest to lowest"
                    ? colors.textColor
                    : colors.inputBg
                }
                borderRadius={24}
                marginRight={8}
                handlePress={handleRatingPress}
              >
                Highest to lowest
              </RectangularDisplayFields>
            </ScrollView>
          </View>
          <View style={[styles.commonView, styles.marginView]}>
            <View style={styles.bottomFil}>
              <View style={{ flexGrow: 1 }}>
                <RectangularDisplayFields
                  paddingHorizontal={20}
                  paddingVertical={9}
                  textSize={15}
                  textWeight={500}
                  textColor={
                    promOffer === "OFFERS" ? colors.white : colors.textColor
                  }
                  bgColor={
                    promOffer === "OFFERS" ? colors.textColor : colors.inputBg
                  }
                  borderRadius={24}
                  marginRight={8}
                  handlePress={handlePromOffer}
                >
                  OFFERS
                </RectangularDisplayFields>
              </View>
              <View style={{ flexGrow: 1 }}>
                <RectangularDisplayFields
                  paddingHorizontal={20}
                  paddingVertical={9}
                  textSize={15}
                  textWeight={500}
                  textColor={
                    promOffer === "PROMOS" ? colors.white : colors.textColor
                  }
                  bgColor={
                    promOffer === "PROMOS" ? colors.textColor : colors.inputBg
                  }
                  borderRadius={24}
                  marginRight={8}
                  handlePress={handlePromOffer}
                >
                  PROMOS
                </RectangularDisplayFields>
              </View>
            </View>
          </View>
          <View style={styles.btn}>
            <ButtonComp height={50} handleBtnPress={handleApplyPress}>
              APPLY
            </ButtonComp>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default TrucksFilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headText: {
    color: colors.textColor,
    fontSize: 25,
    fontWeight: "700",
  },
  subHeading: {
    color: colors.textColor,
    fontSize: 20,
    fontWeight: "700",
  },
  commonView: {
    marginTop: 25,
  },
  commonHorView: {
    marginTop: 12,
  },
  bottomFil: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  marginView: {
    marginTop: "45%",
    marginBottom: "5%",
  },
  btn: {
    marginBottom: "15%",
  },
});
