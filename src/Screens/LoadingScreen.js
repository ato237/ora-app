import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const LoadingScreen = () => {
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
