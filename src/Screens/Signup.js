import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = ({ navigation }) => {
  return (
    <SafeAreaView style={{ padding: 20, backgroundColor: "white", flex: 1 }}>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            color: "#14213D",
            maxWidth: 250,
          }}
        >
          Let's Register Your Account
        </Text>
      </View>
      <View style={{ marginTop: 40 }}>
        <View
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 10,
            borderColor: "#8E8383",
          }}
        >
          <TextInput placeholder="Email" />
        </View>
      </View>
      <View style={{ marginTop: 35, bottom: 25 }}>
        <View
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 10,
            borderColor: "#8E8383",
          }}
        >
          <TextInput placeholder="Password" />
        </View>
      </View>
      <View style={{ marginTop: 10, bottom: 25 }}>
        <View
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 10,
            borderColor: "#8E8383",
          }}
        >
          <TextInput placeholder="Re-Enter Password" />
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#14213D",
          padding: 20,
          paddingHorizontal: 50,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>
          Register
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", padding: 20, alignItems: "center" }}>
        <Text>Already Have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text style={{ fontWeight: "bold" }}> Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
