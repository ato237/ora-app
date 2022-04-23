import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { MaterialIcons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const Feature = ({ title, icon, sizes, link, top,color }) => {
  navigation = useNavigation();
  return (
    <View style={{ justifyContent: "center", bottom: top }}>
      <TouchableOpacity
        onPress={() => navigation.navigate(link)}
        style={[styles.button, { zIndex: 999 }]}
      >
        <Ionicons
          style={styles.iconStyle}
          name={icon}
          size={35}
          color={color}
        />
      </TouchableOpacity>
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text
          style={[
            styles.buttonText,
            {
              right: 15,
              maxWidth: sizes,
            },
          ]}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Feature;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#14213D",
  },
  iconStyle: {
    top: Dimensions.get("window").height <= 667 ? 0 : 4,
  },
  button: {
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#DDDEE2",
    padding: 12,
    width: Dimensions.get("window").height <= 667 ? 65 : 72,
    height: Dimensions.get("window").height <= 667 ? 65 : 72,
    borderRadius: 18,
    margin: 10,
  },
  buttonText: {
    bottom: 15,
    color: "black",
    opacity: 0.8,
    textAlign: "center",
    marginLeft:20,
    marginTop: 20
  },
});