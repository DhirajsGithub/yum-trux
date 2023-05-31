import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import EditableInputComp from "../../components/EditableInputComp";
import ButtonComp from "../../components/ButtonComp";
import Spinner from "react-native-loading-spinner-overlay";
import { baseUrl } from "../../constants/baseUrl";
import {
  getUserDetailsHttp,
  updateUserHttp,
} from "../../utils/user-http-requests";
import { useDispatch, useSelector } from "react-redux";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Button } from "react-native";
import { setUserDetails } from "../../store/store-slice";

const InputErroMsg = ({ msg }) => {
  return (
    <View style={{ marginBottom: 10, marginTop: -10 }}>
      <Text style={{ color: "#ff0033", marginLeft: 30 }}>{msg}</Text>
    </View>
  );
};

const ProfileEditScreen = () => {
  const userDetails = useSelector((state) => state.userSlice.userDetails);
  const dispatch = useDispatch();
  const userId = userDetails._id;
  const [loading, setLoding] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [wantMargin, setWantMargin] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [inputError, setInputError] = useState({
    fullName: false,
    phoneNo: false,
    address: false,
  });
  const [image, setImage] = useState(
    "https://buffer.com/library/content/images/2022/03/sigmund-MQ2xYBHImKM-unsplash--1--1.jpg"
  );

  useEffect(() => {
    setFullName(userDetails.fullName);
    setAddress(userDetails.address);
    setPhoneNo(userDetails.phoneNo);
  }, [userDetails]);

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
      const img = result.assets[0];
      try {
        updateProfileImg(result.assets[0].uri);
      } catch (error) {
        console.log(error);
      }
      setImage(img);
    }
  };

  const updateProfileImg = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ml_default");
    formData.append("cloud_name", "dk8hyxr2z");
    setLoding(true);
    console.log(formData);
    let res = await fetch(
      // use user id from redux
      baseUrl + "updateProfileImg/647034e4130ceeb47e938540",
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }
    );

    setLoding(false);
  };

  const updateUser = async () => {
    setLoding(true);
    let res = await updateUserHttp(userId, { fullName, phoneNo, address });
    if (res.status === "success") {
      let res2 = await getUserDetailsHttp(userId);
      dispatch(setUserDetails(res2.user));
    }
    setLoding(false);
  };

  const handleFullName = (value) => {
    setFullName(value);
  };
  const handlePhoneNumber = (value) => {
    setPhoneNo(value);
  };
  const handleAddress = (value) => {
    setAddress(value);
  };
  const handleSavePress = () => {
    // call udate api
    if (fullName.length < 4) {
      setInputError((prvData) => {
        return { ...prvData, fullName: true };
      });
    }
    if (phoneNo.length < 10) {
      setInputError((prvData) => {
        return { ...prvData, phoneNo: true };
      });
    }
    if (address.length < 5) {
      setInputError((prvData) => {
        return { ...prvData, address: true };
      });
    }
    if (!(fullName.length < 4 || phoneNo.length < 10 || address.length < 5)) {
      // set http
      setInputError({
        fullName: false,
        phoneNo: false,
        address: false,
      });
      try {
        updateUser();
      } catch (error) {
        console.log(error);
      }
    }
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
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        // textContent={'Loading...'}
        color={colors.action}
        // textStyle={styles.spinnerTextStyle}
      />
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
                uri: image.uri,
              }}
            />
          </View>
          <View style={styles.inputFields}>
            <EditableInputComp
              defaultVal={fullName}
              placeholder="full name"
              keyType="default"
              handleOnFocus={() =>
                setInputError((prvData) => {
                  return { ...prvData, fullName: false };
                })
              }
              inputValue={handleFullName}
            />
            {inputError.fullName && <InputErroMsg msg="Enter valid fullname" />}
            <EditableInputComp
              defaultVal={phoneNo}
              placeholder="phone number"
              keyType="default"
              inputValue={handlePhoneNumber}
              handleOnBlur={() => setWantMargin(false)}
              handleOnFocus={() => {
                setWantMargin(true);
                setInputError((prvData) => {
                  return { ...prvData, phoneNo: false };
                });
              }}
            />
            {inputError.phoneNo && <InputErroMsg msg="Enter valid Number" />}
            <EditableInputComp
              defaultVal={address}
              placeholder="address"
              keyType="default"
              inputValue={handleAddress}
              handleOnBlur={() => setWantMargin(false)}
              handleOnFocus={() => {
                setWantMargin(true);
                setInputError((prvData) => {
                  return { ...prvData, address: false };
                });
              }}
            />
            {inputError.address && <InputErroMsg msg="Enter valid address" />}
          </View>
          <View style={styles.btn}>
            <ButtonComp height={52} handleBtnPress={handleSavePress}>
              SAVE
            </ButtonComp>
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
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  iconView: {
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
  btn: {
    marginBottom: "15%",
  },
});
