import {
  StyleSheet,
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HeaderComp = ({ handleSearchInput }) => {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const handleSerachChange = (text) => {
    setSearchInput(text);
  };
  const handleSearchPress = () => {
    setShowSearch(!showSearch);
  };
  const handleNotificationPress = () => {
    navigation.navigate("notification");
  };

  useEffect(() => {
    handleSearchInput(searchInput);
  }, [searchInput]);

  return (
    <View style={styles.container}>
      <View style={styles.commonView}>
        <Image
          style={{ width: 57, height: 57, marginRight: 4, marginBottom: 5 }}
          source={require("../assets/Images/logo.png")}
        />
        <Text style={styles.heading}>YumTrux</Text>
      </View>
      <View style={styles.commonView}>
        {showSearch && (
          <View style={{ marginRight: 5 }}>
            <TextInput
              onChangeText={handleSerachChange}
              style={{
                backgroundColor: colors.inputBg,
                borderRadius: 16,
                width: 100,
                height: 30,
                paddingHorizontal: 8,
                paddingVertical: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
              placeholder="search truck"
            />
          </View>
        )}
        <TouchableOpacity onPress={handleSearchPress}>
          <Feather
            style={{ marginRight: 12 }}
            name="search"
            size={24}
            color={colors.textColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNotificationPress}>
          <Ionicons
            name="notifications-outline"
            style={{ marginRight: 12 }}
            size={24}
            color={colors.textColor}
          />
        </TouchableOpacity>

        {/* {isTrucksList && !onlySearch && (
          <TouchableOpacity onPress={handleFilterPress}>
            <MaterialIcons name="tune" size={24} color={colors.textColor} />
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
};

export default HeaderComp;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.action,
  },
  commonView: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
