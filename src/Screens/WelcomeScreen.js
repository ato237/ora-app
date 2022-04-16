import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ marginTop: 50 }}>
      <Text
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: 50,
          fontSize: 25,
          color: "#14213D",
        }}
      >
        WELCOME TO ORRAMO
      </Text>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Image
          style={{
            width: 300,
            height: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
          source={require("../../assets/adaptive-icon.png")}
        />
      </View>
      <View
        style={{
          padding: 30,
          marginTop: 50,
        }}
      >
        <Text
          style={{ textAlign: "center", marginBottom: 20, color: "#0053C5" }}
        >
          By Clicking on the button Bellow I agree on the terms of services
          provided by orramo
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: "#14213D", paddingVertical: 10 }}
          onPress={() => navigation.navigate("signIn")}
        >
          <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
            Agree and Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
