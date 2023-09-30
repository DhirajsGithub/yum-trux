import {
  Alert,
  BackHandler,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { adminUrl } from "../../constants/baseUrl";

const ProfileMainScreen = () => {
  const userDetails = useSelector((state) => state.userSlice.userDetails);
  const [imgUrl, setImgUrl] = useState(
    "https://res.cloudinary.com/dk8hyxr2z/image/upload/v1685710777/yumtrux_users/defaultProfileImg_rrndub.webp"
  );
  useEffect(() => {
    setImgUrl(userDetails.profileImg);
  }, [userDetails]);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const handleEditProfilePress = () => {
    navigation.navigate("profileEdit");
  };
  const handlePaymentMethodPress = () => {
    navigation.navigate("paymentMethod");
  };
  const handleFavouritePress = () => {
    navigation.navigate("favouriteTrucks");
  };
  const logoutFunction = async () => {
    try {
      await AsyncStorage.removeItem("@yumtrux_user");

      navigation.dispatch(StackActions.popToTop());
      navigation.navigate("login");
    } catch (exception) {
      console.log(exception);
    }
  };
  const handleLogoutPress = async () => {
    Alert.alert("Alert", "Are you sure you want to logout", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: logoutFunction,
      },
    ]);
  };
  const handleSupportPress = () => {
    Linking.openURL(adminUrl + "support");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.editProfile}>
            <TouchableOpacity onPress={handleEditProfilePress}>
              <Text style={styles.editProfileText}>Edit profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.nameImg}>
            <Text style={styles.name}>
              {userDetails?.fullName?.length > 0
                ? userDetails.fullName
                : "Upate Profile"}
            </Text>
            <Image
              style={{ width: 91, height: 91, borderRadius: 100 }}
              source={{
                uri: imgUrl,
              }}
            />
          </View>
          <View style={styles.borderBottom}></View>
          <View style={styles.sections}>
            <View style={styles.section}>
              <View style={styles.sectionRow}>
                <View style={styles.icon}>
                  <Fontisto name="email" size={18} color={colors.white} />
                </View>
                <Text style={styles.mainText}>{userDetails.email}</Text>
              </View>
              <View style={styles.sectionRow}>
                <View style={styles.icon}>
                  <Fontisto name="mobile-alt" size={18} color={colors.white} />
                </View>
                <Text style={styles.mainText}>
                  {userDetails?.phoneNo?.length > 0
                    ? userDetails.phoneNo
                    : "Upate Profile"}
                </Text>
              </View>
              <View style={styles.sectionRow}>
                <View style={styles.icon}>
                  <MaterialCommunityIcons
                    name="map-marker-radius-outline"
                    size={20}
                    color={colors.white}
                  />
                </View>
                <Text style={styles.mainText}>
                  {userDetails?.address?.length > 0
                    ? userDetails.address
                    : "Upate Profile"}
                </Text>
              </View>
            </View>
            <View style={styles.borderBottom}></View>
            {/* <View style={styles.section}>
              <View style={styles.touchableView}>
                <TouchableOpacity
                  onPress={handlePaymentMethodPress}
                  style={styles.sectionRow}
                >
                  <View style={styles.icon}>
                    <Ionicons
                      name="wallet-outline"
                      size={20}
                      color={colors.white}
                    />
                  </View>
                  <Text style={styles.mainText}>Manage payment method</Text>
                </TouchableOpacity>
              </View>
            </View> */}
            {/* <View style={styles.borderBottom}></View> */}
            <View style={styles.section}>
              <View style={styles.touchableView}>
                <TouchableOpacity
                  onPress={handleFavouritePress}
                  style={styles.sectionRow}
                >
                  <View style={styles.icon}>
                    <EvilIcons name="star" size={24} color={colors.white} />
                  </View>
                  <Text style={styles.mainText}>Favorite</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.touchableView}>
                <TouchableOpacity
                  onPress={handleSupportPress}
                  style={styles.sectionRow}
                >
                  <View style={styles.icon}>
                    <MaterialIcons
                      name="support-agent"
                      size={20}
                      color={colors.white}
                    />
                  </View>
                  <Text style={styles.mainText}>Support</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.borderBottom}></View>
              <View style={styles.touchableView}>
                <TouchableOpacity
                  onPress={handleLogoutPress}
                  style={styles.sectionRow}
                >
                  <View style={styles.icon}>
                    <MaterialIcons
                      name="logout"
                      size={20}
                      color={colors.white}
                    />
                  </View>
                  <Text style={styles.mainText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProfileMainScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    flex: 1,
    // backgroundColor: "white",
  },
  editProfile: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  editProfileText: {
    fontSize: 15,
    fontWeight: "500",
  },
  name: {
    fontSize: 25,
    fontWeight: "600",
    width: "60%",
  },
  nameImg: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },
  borderBottom: {
    borderBottomColor: colors.borderBottom,
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  sections: {
    marginBottom: 30,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  mainText: {
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    // padding: 2,
    width: 35,
    height: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: colors.textColor,
    marginRight: 20,
  },
  touchableView: {
    flexDirection: "row",
  },
});
