import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  const handleSearchBar = () => {
    return (
      <View style={{ backgroundColor: "red" }}>
        <TextInput />
      </View>
    );
  };
  return (
    <View style={{ flexDirection: "row" }}>
      <StatusBar animated={true} backgroundColor="#14213D" barStyle="light-content" />
      <TouchableOpacity style={{ right: 35 }}>
        <Ionicons name="search-outline" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("settings")}
        style={{ right: 20 }}
      >
        <Ionicons name="cog-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
