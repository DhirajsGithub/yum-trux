import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const RectangularDisplayFields = ({
  children,
  paddingHorizontal,
  paddingVertical,
  textSize,
  textWeight,
  textColor,
  bgColor,
  borderRadius,
  width,
  marginRight,
  handlePress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress(children)}>
        <Text
          style={[
            styles.container,
            {
              paddingHorizontal,
              paddingVertical,
              fontSize: textSize,
              fontWeight: textWeight,
              color: textColor,
              backgroundColor: bgColor,
              // borderRadius: borderRadius,
              width,
              textAlign: "center",
              marginRight,
              borderRadius: 20,
              overflow: "hidden",
            },
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RectangularDisplayFields;

const styles = StyleSheet.create({
  container: {},
});
