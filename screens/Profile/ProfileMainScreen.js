import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { adminUrl } from "../../constants/baseUrl";
import colors from "../../constants/colors";

const ProfileMainScreen = () => {
  const userDetails = useSelector((state) => state.userSlice.userDetails);
  const [imgUrl, setImgUrl] = useState(userDetails.profileImg);
  const navigation = useNavigation();

  useEffect(() => {
    setImgUrl(userDetails.profileImg);
  }, [userDetails]);

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

  const handleSupportPress = () => {
    Linking.openURL(adminUrl + "support");
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

  const handleDeleteAccountPress = async () => {
    Alert.alert(
      "Alert",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete Account",
          onPress: deleteAccount,
          style: "destructive",
        },
      ]
    );
  };

  const deleteAccount = async () => {
    try {
      // Perform the logic to delete the account here
      // Example:
      await api.deleteAccount(userDetails.userId);
      await AsyncStorage.removeItem("@yumtrux_user");
      navigation.dispatch(StackActions.popToTop());
      navigation.navigate("login");
    } catch (error) {
      console.log("Error deleting account: ", error);
      // Handle error appropriately
    }
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
                : "Update Profile"}
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
                  <Fontisto
                    name="mobile-alt"
                    size={18}
                    color={colors.white}
                  />
                </View>
                <Text style={styles.mainText}>
                  {userDetails?.phoneNo?.length > 0
                    ? userDetails.phoneNo
                    : "Update Profile"}
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
                    : "Update Profile"}
                </Text>
              </View>
            </View>
            <View style={styles.borderBottom}></View>
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
              <View style={styles.touchableView}>
                <TouchableOpacity
                  onPress={handleDeleteAccountPress}
                  style={styles.sectionRow}
                >
                  <View style={styles.icon}>
                    <MaterialIcons
                      name="delete"
                      size={20}
                      color={colors.white}
                    />
                  </View>
                  <Text style={styles.mainText}>Delete Account</Text>
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
