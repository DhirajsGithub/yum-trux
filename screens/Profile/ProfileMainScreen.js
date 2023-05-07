import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

const ProfileMainScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const handleEditProfilePress = () => {
    navigation.navigate("profileEdit");
  };
  const handlePaymentMethodPress = () => {};
  const handleFavouritePress = () => {};
  const handleLogoutPress = () => {};
  const handleSupportPress = () => {};
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
            <Text style={styles.name}>Victoria Tho</Text>
            <Image
              style={{ width: 91, height: 91, borderRadius: 100 }}
              source={{
                uri: "https://buffer.com/library/content/images/2022/03/sigmund-MQ2xYBHImKM-unsplash--1--1.jpg",
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
                <Text style={styles.mainText}>Victoriia23@gmail.com</Text>
              </View>
              <View style={styles.sectionRow}>
                <View style={styles.icon}>
                  <Fontisto name="mobile-alt" size={18} color={colors.white} />
                </View>
                <Text style={styles.mainText}>+1 (647) 4569-9865</Text>
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
                  Gerald Street 92, ON, Toronto
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
            </View>
            <View style={styles.borderBottom}></View>
            <View style={styles.section}>
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
