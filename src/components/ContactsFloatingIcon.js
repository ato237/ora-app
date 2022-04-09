import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";
import React, { useContext } from "react";
import { GlobalContext } from "../context/reducers/Provider";
import { useNavigation } from "@react-navigation/native";

const ContactsFloatingIcon = () => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  const navigation = useNavigation()
  return (
    <TouchableOpacity
    onPress ={() => navigation.navigate('contacts')}
      style={{
        position: "absolute",
        right: 20,
        bottom: 20,
        borderRadius: 60,
        width: 60,
        height: 60,
        backgroundColor: colors.secondary,
        alignItems:'center',
        justifyContent:'center'
      }}
    >
      <MaterialIcons
        name="chat"
        size={30}
        color="white"
        style={{ transform: [{ scaleX: -1 }] }}
      />
    </TouchableOpacity>
  );
};

export default ContactsFloatingIcon;

const styles = StyleSheet.create({});
