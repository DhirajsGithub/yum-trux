import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/store-slice";
import { baseUrl } from "../constants/baseUrl";
import {
  addExpoPushToken,
  getUserDetailsHttp,
  getUserStatus,
} from "../utils/user-http-requests";

// expo push notification
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

// ----------------------

const BlankScreen = () => {
  // expo push notification
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  console.log(expoPushToken.data);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // ----------------------

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const getUserData = async (userId) => {
    setLoading(true);
    let res = await getUserDetailsHttp(userId);
    setLoading(false);

    if (res.status === "success" && res.user) {
      dispatch(setUserDetails(res.user));
    } else {
      navigation.navigate("login");
    }
    return res;
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@yumtrux_user");
      const val = JSON.parse(jsonValue);

      if (val?.token) {
        try {
          setLoading(true);
          if (expoPushToken?.data) {
            let res1 = await addExpoPushToken(val.userId, expoPushToken.data);
            console.log(res1);
          }
          let res = await getUserData(val.userId);
          setLoading(false);
          if (res.status === "success" && res.user) {
            navigation.navigate("main");
          } else {
            navigation.navigate("login");
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      } else {
        navigation.navigate("login");
      }
    } catch (e) {
      setLoading(false);
    }
  };
  useEffect(() => {
    try {
      getData();
    } catch (error) {
      setLoading(false);
    }
  }, [expoPushToken]);
  return (
    <View style={styles.container}>
      {loading && <Text style={{ color: "white" }}>Loading...</Text>}
      {!loading && <Text style={{ color: "white" }}>Blank Screen</Text>}
    </View>
  );
};

export default BlankScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
