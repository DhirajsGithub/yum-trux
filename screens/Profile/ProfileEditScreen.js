import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import EditableInputComp from "../../components/EditableInputComp";
import ButtonComp from "../../components/ButtonComp";

const ProfileEditScreen = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [wantMargin, setWantMargin] = useState(false);
  const [image, setImage] = useState(
    "https://buffer.com/library/content/images/2022/03/sigmund-MQ2xYBHImKM-unsplash--1--1.jpg"
  );

  const [userData, setUserData] = useState({
    name: "Victoria Tho",
    phoneNo: "+1 (647) 459-9865",
    address: "Gerald Street 92, ON, Toronto",
  });

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const handleBackBtnPress = () => {
    navigation.navigate("profileMain");
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const img = result.assets[0].uri;
      setImage(img);
    }
  };

  const handleFullName = (value) => {
    // edit user data here
  };
  const handlePhoneNumber = (value) => {
    // edit user data here
  };
  const handleAddress = (value) => {
    // edit user data here
  };
  const handleSavePress = () => {
    // call udate api
  };

  const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardVisible(true);
  });
  const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardVisible(false);
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <ScrollView
          style={{
            marginTop: keyboardVisible && wantMargin ? -100 : 0,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.iconView}>
            <TouchableOpacity onPress={handleBackBtnPress}>
              <Ionicons
                name="chevron-back-circle"
                size={35}
                color={colors.textColor}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imgEdit}>
            <View style={styles.touchableText}>
              <TouchableOpacity onPress={pickImage}>
                <Text style={styles.changeImg}>Change Image</Text>
              </TouchableOpacity>
            </View>

            <Image
              style={{ width: 125, height: 125, borderRadius: 200 }}
              source={{
                uri: image,
              }}
            />
          </View>
          <View style={styles.inputFields}>
            <EditableInputComp
              defaultVal={userData.name}
              placeholder="full name"
              keyType="default"
              inputValue={handleFullName}
            />
            <EditableInputComp
              defaultVal={userData.phoneNo}
              placeholder="phone number"
              keyType="default"
              inputValue={handlePhoneNumber}
              handleOnBlur={() => setWantMargin(false)}
              handleOnFocus={() => setWantMargin(true)}
            />
            <EditableInputComp
              defaultVal={userData.address}
              placeholder="address"
              keyType="default"
              inputValue={handleAddress}
              handleOnBlur={() => setWantMargin(false)}
              handleOnFocus={() => setWantMargin(true)}
            />
          </View>
          <View>
            <ButtonComp handleBtnPress={handleSavePress}>SAVE</ButtonComp>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    paddingVertical: 20,
  },
  iconView: {
    marginHorizontal: 30,
    flexDirection: "row",
  },
  imgEdit: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  changeImg: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  touchableText: {
    position: "absolute",
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  inputFields: {
    marginVertical: 20,
    marginBottom: "40%",
  },
});
