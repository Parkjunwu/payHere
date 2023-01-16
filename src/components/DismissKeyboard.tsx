import React from "react";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";

const DismissKeyboard = ({ children }: { children: React.ReactNode }) => (
  <TouchableWithoutFeedback
    onPress={() => Keyboard.dismiss()}
    style={{flex:1}}
    disabled={Platform.OS === "web" ? true : false}
    accessible={false}
  >
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;