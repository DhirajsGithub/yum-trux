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

const HeaderComp = ({
  isTrucksList,
  // handleSearchPress,
  handleFilterPress,
  handleSettingPress,
  onlySearch,
  handleSearchInput,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const handleSerachChange = (text) => {
    setSearchInput(text);
    // handleSearchInput(text);
  };
  const handleSearchPress = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    handleSearchInput(searchInput);
  }, [searchInput]);

  return (
    <View style={styles.container}>
      <View style={styles.commonView}>
        <Image
          style={{ width: 57, height: 57, marginRight: 4 }}
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
