import React, { useContext, useState } from "react";
import { View, Text, Image, TextInput, Button, Alert, KeyboardAvoidingView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GlobalContext } from "../context/reducers/Provider";
import { signIn, signUp } from "../../firebase";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [mode, setMode] = useState("signUp");
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  async function handlePress() {
    if (mode === "signUp") {
      if(password!== rePassword){
        Alert.alert('Passwords do not Match')
      }
      else{
      await signUp(email, password);
      }
    }
    if (mode === "signIn") {
      await signIn(email, password);
    }
  }
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <View style={{marginBottom:35}}>
      <Text
        style={{ color: colors.foreground, fontSize: 24, marginBottom: 20 }}
      >
        {mode == "signUp"?"Get Started on Orramo": "Log In To Your Account"}
      </Text>

      <View style={{ marginTop: 20 }}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 250,
          }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 250,
            marginTop: 20,
          }}
        />
        {mode == "signUp" && (
          <TextInput
            placeholder="Re-Enter Password"
            value={rePassword}
            onChangeText={setRePassword}
            secureTextEntry={true}
            style={{
              borderBottomColor: colors.primary,
              borderBottomWidth: 2,
              width: 250,
              marginTop: 20,
            }}
          />
        )}

        <View style={{ marginTop: 20 }}>
          <Button
            title={mode === "signUp" ? "Sign Up" : "Sign in"}
            disabled={!password || !email}
            color={colors.secondary}
            onPress={handlePress}
          />
        </View>
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() =>
            mode === "signUp" ? setMode("signIn") : setMode("signUp")
          }
        >
          <Text
            style={{
              color: colors.secondaryText,
              justifyContent: "center",
              alignItems: "center",
              color: "#0053C5",
            }}
          >
            {mode === "signUp"
              ? "Already have an account? Log in"
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}