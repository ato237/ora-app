import React, { useContext, useState } from "react";
import { View, Text, Image, TextInput, Button, Alert, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GlobalContext } from "../context/reducers/Provider";
import { auth, signIn, signUp } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
export default function SignIn({navigation}) {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const[loading, setLoading] = useState(false)
  const [mode, setMode] = useState("signUp");

  const {
    theme: { colors },

  } = useContext(GlobalContext);

  async function handlePress() {
    setLoading(true)
    if (mode === "signUp") {
      if(password!== rePassword){
        Alert.alert('Passwords do not Match')
      }
      else{
      await signUp(email, password);
      navigation.navigate('profile')
      
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
        {mode == "signUp" ? "Get Started on Orramo": "Log In To Your Account"}
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
            disabled={!password || !email || loading == true}
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
      {loading == true? (
           <View
           style={{
             justifyContent: "center",
             alignItems: "center",
             backgroundColor: "#fff",
             borderRadius: 30,
             marginTop: 10,
             width: 50,
             height: 50,
           }}
         >
           <ActivityIndicator size="large" color="#FFA500" />
         </View>
        ): null}
    </View>
  );
}
