import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { signUp } from "../../firebase";
import { Ionicons } from "@expo/vector-icons";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, isShowPass] = useState(false);
  const [reShowPass, isReShowPass] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (password === rePassword) {
      try {
        await signUp(email, password);
        navigation.navigate("profile");
      } catch (error) {
        Alert.alert("Credentials Error Please try Again");
        setLoading(false);
      }
    } else {
      Alert.alert("Passwords do not match");
    }
  };
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
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
        </View>
      </View>
      <View style={{ marginTop: 35, bottom: 25 }}>
        <View
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 10,
            borderColor: "#8E8383",
            flexDirection: "row",
          }}
        >
          <TextInput
            style={{ flex: 1 }}
            secureTextEntry={showPass ? false : true}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
          />
          <Ionicons
            name={showPass ? "eye-outline" : "eye-off-outline"}
            size={25}
          />
        </View>
      </View>
      <View style={{ marginTop: 10, bottom: 25 }}>
        <View
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 10,
            borderColor: "#8E8383",
            flexDirection: "row",
          }}
        >
          <TextInput
            style={{ flex: 1 }}
            secureTextEntry={reShowPass ? false : true}
            value={rePassword}
            onChangeText={setRePassword}
            placeholder="Re-Enter Password"
          />
          <TouchableOpacity onPress={() => isReShowPass(!reShowPass)}>
            <Ionicons
              name={reShowPass ? "eye-outline" : "eye-off-outline"}
              size={25}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: "#14213D",
          padding: 20,
          paddingHorizontal: 50,
          borderRadius: 10,
        }}
      >
        {loading == true ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
              marginTop: 10,
              width: 150,
              height: 150,
              position: "absolute",
            }}
          >
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>
            Register
          </Text>
        )}
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
