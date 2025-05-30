import { Text, Pressable, StyleSheet, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { Colors } from "../../src/estilos_globals";
import React from "react";

interface IButton {
  label: string | number;
  pressFunction: () => void;
  color?: string;
}
const ButtonComponent = ({ color = "red", label, pressFunction }: IButton) => {
  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        pressFunction();
      }}
      style={({ pressed }) => [
        styles.pressStyle,
        { backgroundColor: color, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <Text style={styles.labelStyle}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressStyle: {
    // borderColor: "#e4e4e4",
    // borderWidth: 1,
    height: 70,
    borderRadius: 5,
    margin: 3,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  labelStyle: { textAlign: "center", lineHeight: 70 },
});

export default ButtonComponent;
