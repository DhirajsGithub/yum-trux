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
import * as FileSystem from "expo-file-system";

import colors from "../../constants/colors";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import EditableInputComp from "../../components/EditableInputComp";
import ButtonComp from "../../components/ButtonComp";
import Spinner from "react-native-loading-spinner-overlay";
import { baseUrl } from "../../constants/baseUrl";
import {
  deleteProfileImg,
  getUserDetailsHttp,
  updateUserHttp,
  uploadProfileImg,
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
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState(
    "https://res.cloudinary.com/dk8hyxr2z/image/upload/v1685710777/yumtrux_users/defaultProfileImg_rrndub.webp"
  );

  useEffect(() => {
    setFullName(userDetails.fullName);
    setAddress(userDetails.address);
    setPhoneNo(userDetails.phoneNo);
    setImgUrl(userDetails.profileImg);
  }, [userDetails]);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const handleBackBtnPress = () => {
    navigation.navigate("profileMain");
  };

  const getFileInfo = async (fileURI) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI);
    return fileInfo;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.8,
      maxWidth: 100,
      maxHeight: 100,
    });

    if (!result.canceled) {
      const img = result.assets[0];
      const fileInfo = await getFileInfo(img.uri);
      const imgSize = fileInfo.size / 1024 / 1024;

      if (imgSize > 2) {
        alert("Image size too large, try image with size less than 5 mb");
        return;
      }
      try {
        setLoding(true);
        let res = await deleteProfileImg(userId);

        if (res.result) {
          let uplaodImgStatus = await updateProfileImg({
            uri: img.uri,
            type: `test/${img.uri.split(".")[1]}`,
            name: `test.${img.uri.split(".")[1]}`,
          });

          if (uplaodImgStatus.url) {
            let uploadImg = await uploadProfileImg(userId, uplaodImgStatus.url);

            if (uploadImg.status === "success") {
              let res2 = await getUserDetailsHttp(userId);
              if (res2.status === "success") {
                dispatch(setUserDetails(res2.user));
              }
            }
          }
        }
        setLoding(false);
      } catch (error) {
        setLoding(false);
        console.log(error);
      }
      setImage(img);
    }
  };

  const updateProfileImg = async (dd) => {
    const formData = new FormData();
    formData.append("file", dd);
    formData.append("upload_preset", "ml_default");
    formData.append("cloud_name", "dk8hyxr2z");
    formData.append("public_id", userId);

    setLoding(true);
    let uploadImgStatus = await fetch(
      "https://api.cloudinary.com/v1_1/dk8hyxr2z/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setImgUrl(data.url);
        setLoding(false);
        return data;
      });

    return uploadImgStatus;
  };

  const updateUser = async () => {
    setLoding(true);
    let res = await updateUserHttp(userId, { fullName, phoneNo, address });
    if (res.status === "success") {
      let res2 = await getUserDetailsHttp(userId);
      if (res2.status === "success") {
        dispatch(setUserDetails(res2.user));
      }
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
                uri: imgUrl,
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
