import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Constants from "expo-constants";
import { Modal } from "react-native-paper";
const statusBarHeight = Constants.statusBarHeight;

const NotificationModal = ({ list, modalVisibility, requestClose }) => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={500}
      transparent={false}
      isVisible={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
        requestClose();
      }}
    >
      <View style={{ marginTop: statusBarHeight + 10 }}>
        <Text style={{ height: 200, width: 200, backgroundColor: "red" }}>
          Modal
        </Text>
      </View>
    </Modal>
  );
};

export default NotificationModal;

const styles = StyleSheet.create({});
