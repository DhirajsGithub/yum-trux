import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";
import colors from "../../constants/colors";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  getUserNotfications,
  updateUserNotification,
} from "../../utils/user-http-requests";
import Spinner from "react-native-loading-spinner-overlay";

const NotificationItem = ({
  title,
  description,
  date,
  handleOnPress,
  viewed,
}) => {
  const [viewPress, setViewPress] = useState(false);
  const handleNotiPress = (action) => {
    if (action === "view") {
      setViewPress(!viewPress);
    }
    if (action === "view" && viewed) {
      return;
    }
    handleOnPress(action);
  };

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
  return (
    <TouchableOpacity
      onPress={() => handleNotiPress("view")}
      style={[
        styles.notificationItem,
        { backgroundColor: !viewed ? "#eee" : colors.white },
      ]}
    >
      <View
        style={[
          styles.head,
          {
            borderBottomColor: colors.textColor,
            borderBottomWidth: viewPress ? 0.5 : 0,
          },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => handleNotiPress("delete")}>
          <EvilIcons name="trash" size={24} color="#ef5350" />
        </TouchableOpacity>
      </View>

      {viewPress && <Text style={styles.desc}>{description}</Text>}
      <View style={styles.time}>
        <Ionicons name="timer" size={18} color="black" />
        <Text>{timeSince(new Date(date))} ago</Text>
      </View>
    </TouchableOpacity>
  );
};

const Notification = () => {
  const userDetails = useSelector((state) => state.userSlice.userDetails);
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Notifications",
      headerTitleStyle: {
        fontSize: 20,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={32}
            color={colors.textColor}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleRefreshPress}>
          {/* <Ionicons
            name="md-refresh-circle"
            size={32}
            color={colors.textColor}
          /> */}
          <EvilIcons name="refresh" size={28} color={colors.textColor} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const fetchUserNotification = async () => {
    setLoading(true);
    let res = await getUserNotfications(userDetails._id);
    if (res?.notifications?.length > 0) {
      setNotifications(res.notifications.reverse());
    } else {
      setNotifications([]);
    }
    setLoading(false);
  };
  const handleRefreshPress = () => {
    try {
      fetchUserNotification();
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    try {
      fetchUserNotification();
    } catch (error) {
      setLoading(false);
    }
  }, []);
  const handleOnPress = async (action, notificationId) => {
    try {
      setLoading(true);
      let res = await updateUserNotification(
        userDetails._id,
        notificationId,
        action === "delete" ? true : false
      );
      console.log(res);
      handleRefreshPress();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <View showsVerticalScrollIndicator={false} style={styles.container}>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        // textContent={'Loading...'}
        color={colors.action}
      // textStyle={styles.spinnerTextStyle}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={notifications}
        renderItem={({ item }) => (
          <NotificationItem
            handleOnPress={(action) =>
              handleOnPress(action, item.notificationId)
            }
            title={item.title}
            description={item.description}
            date={item.date}
            viewed={item.viewed}
            notficationId={item.notificationId}
          />
        )}
        keyExtractor={(item) => item.notificationId}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  notificationItem: {
    borderRadius: 4,
    padding: 10,
    marginVertical: 6,
    backgroundColor: colors.white,
    elevation: 4,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    width: "90%",
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  desc: {
    fontSize: 17,
    fontWeight: "400",
  },
  time: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.textColor,
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
  },
});
