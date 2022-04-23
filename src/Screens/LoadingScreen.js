import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/reducers/Provider";

const LoadingScreen = ({ navigation }) => {
  const { userData } = useContext(GlobalContext);
  useEffect(() => {
    userData.displayName == null
      ? null
      : navigation.navigate("home");
  }, []);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <ActivityIndicator size="large" color="#FFA500" />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
