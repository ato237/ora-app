import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GlobalContext } from "../context/reducers/Provider";
import { signIn, signUp } from "../../firebase";
import * as Animatable from "react-native-animatable";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("signUp");
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  async function handlePress() {
    setLoading(true);

    if (mode === "signUp") {
      try {
        if (password !== rePassword) {
          Alert.alert("Passwords do not match");
          setLoading(false);
        } else {
          await signUp(email, password);
          navigation.navigate("profile");
        }
      } catch (error) {
        Alert.alert("Credentials Error Please try Again");
        setLoading(false);
      }
    }
    if (mode === "signIn") {
      try {
        await signIn(email, password);
      } catch (error) {
        Alert.alert("Wrong email or password");
        setLoading(false);
      }
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
      <Text style={{ color: "#14213D", fontSize: 25, bottom: 0 }}>
        {mode == "signUp" ? "Get Started on Orramo" : "Log In To Your Account"}
      </Text>

      <Animatable.View
        animation="zoomInUp"
        style={{ backgroundColor: "#fff", marginTop: 2 }}
      >
        <Image
          source={require("../../assets/adaptive-icon.png")}
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
          }}
        />
      </Animatable.View>
      
      <View style={{ marginBottom: 150 }}>
        <View style={{ bottom: 20 }}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{
              borderBottomColor: "#14213D",
              borderBottomWidth: 2,
              width: 350,
            }}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={{
              borderBottomColor: "#14213D",
              borderBottomWidth: 2,
              width: 350,
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
                borderBottomColor: "#14213D",
                borderBottomWidth: 2,
                width: 350,
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
              style={{ backgroundColor: "red" }}
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
      {loading == true ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 30,
            marginTop: 10,
            width: 50,
            height: 50,
            position:"absolute"
          }}
        >
          <ActivityIndicator size="large" color="#FFA500" />
        </View>
      ) : null}
    </View>
  );
}
