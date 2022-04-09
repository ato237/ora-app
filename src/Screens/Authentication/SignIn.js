import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/reducers/Provider";
import { TextInput } from "react-native";
import { siginIn, signup } from "../../firebase";
import { TouchableOpacity } from "react-native";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signUp");
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  const handlePress = async () => {
    if (mode === "signUp") {
      await signup(email, password);
    }
    if (mode === "signIn") {
      await siginIn(email, password);
    }
  };
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <Text
        style={{ color: colors.foreground, fontSize: 24, marginBottom: 20 }}
      >
        Welcome to Orramo
      </Text>
      <Image
        source={require("../../../assets/adaptive-icon.png")}
        style={{ width: 300, height: 200 }}
        resizeMode="cover"
      />
      <View style={{ marginTop: 20 }}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="email"
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 200,
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
            width: 200,
            marginTop: 20,
          }}
        />
        <View style={{ marginTop: 20 }}>
          <Button
            title={mode === "signUp" ? "Sign Up" : "Sign In"}
            disabled={!password || !email}
            color={colors.secondary}
            onPress={handlePress}
          />
        </View>
      
      </View>
      <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={
            () => mode == "signUp" ? setMode("signIn") : setMode("signUp")
          }
        >
          <Text style={{color: colors.secondaryText}}>
            {mode === "signUp"
              ? "Already have an Account? Sign In"
              : "Don't have an account SignUp"}
          </Text>
        </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
