import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import colors from "../constants/colors";

const EditableInputComp = ({
  placeholder,
  keyType,
  inputValue,
  defaultVal,
  handleOnFocus,
  handleOnBlur,
}) => {
  const [value, setValue] = useState(defaultVal);
  const onChangeValue = (text) => {
    setValue(text);
    inputValue(text);
  };
  return (
    <View>
      <Text style={styles.text}>{placeholder}</Text>
      <TextInput
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        style={styles.input}
        onChangeText={onChangeValue}
        value={value}
        // placeholder={placeholder}
        keyboardType={keyType}
      />
    </View>
  );
};

export default EditableInputComp;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.inputBg,
    // color: "#312F2E",
    borderRadius: 30,
    fontSize: 16,
    // fontWeight: "500",
    height: 60,
    paddingTop: 10,
    paddingHorizontal: 25,
    // marginHorizontal: 30,
    marginVertical: 10,
    minWidth: 280,
  },
  text: {
    color: "#818181",
    fontSize: 12,
    fontWeight: "400",
    position: "absolute",
    top: "20%",
    zIndex: 200,
    left: "10%",
  },
});
