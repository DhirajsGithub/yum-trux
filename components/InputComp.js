import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import colors from "../constants/colors";

const InputComp = ({
  placeholder,
  keyType,
  inputValue,
  handleOnFocus,
  handleOnBlur,
}) => {
  const [value, setValue] = useState("");
  const onChangeValue = (text) => {
    setValue(text);
    inputValue(text);
  };
  return (
    <View>
      <TextInput
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        style={styles.input}
        onChangeText={onChangeValue}
        value={value}
        placeholder={placeholder}
        keyboardType={keyType}
        secureTextEntry={
          placeholder === "Password" || placeholder === "Confirm password"
            ? true
            : false
        }
      />
    </View>
  );
};

export default InputComp;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.inputBg,
    // color: "#312F2E",
    borderRadius: 30,
    fontSize: 17,
    // fontWeight: "500",
    height: 60,
    paddingHorizontal: 25,
    // marginHorizontal: 30,
    marginVertical: 18,
    minWidth: 260,
  },
});
