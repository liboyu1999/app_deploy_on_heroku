import React from "react";
import { Pressable, View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import  {useTogglePasswordVisibility}  from './useTogglePasswordVisibility';

import defaultStyles from "../config/styles.js";

function AppPasswordTextInput({ icon, ...otherProps }) {

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput style={styles.inputField} {...otherProps} 
      secureTextEntry={passwordVisibility}/>
      <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons  name={rightIcon} size={20} color="#232323" />
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  inputField: {
    padding: 0,
    fontSize: 20,
    width: '85%'
  },

  icon: {
    marginRight: 10,
  },
});

export default AppPasswordTextInput;