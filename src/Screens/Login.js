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
import { signIn } from "../../firebase";
import { Ionicons } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, isShown] = useState(false);

  async function handlePress() {
    setLoading(true);
    try {
        await signIn(email, password);
      } catch (error) {
        Alert.alert("Wrong email or password");
        setLoading(false);
      }
  }
  return (
    <SafeAreaView style={{ padding: 20, backgroundColor: "white", flex: 1 }}>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 35, fontWeight: "bold", color: "#14213D" }}>
          Lets Sign you in
        </Text>
      </View>
      <View style={{ marginTop: 40 }}>
        <View style={{ borderWidth: 1, padding: 15, borderRadius: 10 }}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
          />
        </View>
      </View>
      <View style={{ marginTop: 35, bottom: 25 }}>
        <View style={{ borderWidth: 1, padding: 15, borderRadius: 10, flexDirection:'row' }}>
          <TextInput
            value={password}
            secureTextEntry={show? false: true}
            onChangeText={setPassword}
            placeholder="Enter Password"
            style={{flex:1}}
          />
          <TouchableOpacity onPress={()=> isShown(!show)}>
          <Ionicons name ={show? "eye-outline" : "eye-off-outline"}size={25}/> 
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: "flex-end", bottom: 10 }}>
        <TouchableOpacity>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#14213D",
          padding: 20,
          paddingHorizontal: 50,
          borderRadius: 10,
          justifyContent: "center",
          height: 62,
          alignItems: "center",
        }}
        onPress={handlePress}
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
            Sign in
          </Text>
        )}
      </TouchableOpacity>
      <View style={{ flexDirection: "row", padding: 20, alignItems: "center" }}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <Text style={{ fontWeight: "bold" }}> Register Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
