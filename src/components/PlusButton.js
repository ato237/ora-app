import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import OptionModal from "./OptionModal";
import { GlobalContext } from "../context/reducers/Provider";

const PlusButton = () => {
    const {
        setModalVisible,modalVisible

      } = useContext(GlobalContext);
  return (
    <View
      style={{
        //padding: 50,
        zIndex: 9999,
        position: "absolute",
        bottom: 0,
        right: 35,
      }}
    >
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: "#14213D",
          borderRadius: 100,
          alignItems: "center",
          width: 65,
          height: 65,
          justifyContent: "center",
          elevation: 10,
        }}
      >
        <Ionicons name="add-outline" size={30} color="#fff" />
      </TouchableOpacity>
      <OptionModal />
    </View>
  );
};

export default PlusButton;

const styles = StyleSheet.create({});
