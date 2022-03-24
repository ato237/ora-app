import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import icon from "../../images/adaptive-icon.png";
import Ionicons from "react-native-vector-icons/Ionicons";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#14213D" barStyle="light-content" />

      <View>
        <View style={styles.TitleSpace}>
          <Image source={icon} style={{ width: 200, height: 200 }} />
          <View style={{ bottom: 35 }}>
            <Text style={{ fontSize: 30, color: "#fff", fontWeight: "bold" }}>
              ORRAMO
            </Text>
            <Text style={{ fontSize: 13, color: "#fff", textAlign: "center" }}>
              Chat & Send
            </Text>
          </View>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            onPress={() => navigation.navigate("usernamesignup")}
            style={styles.button}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="logo-google" size={28} color="#EEB40A" />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {"    "}
                Sign in With Google
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 15,
              marginTop: 15,
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                ...styles.lowerButton,
                ...{
                  borderWidth: 1,
                  backgroundColor: "none",
                  borderColor: "#FFA500",
                },
              }}
              onPress={() => navigation.navigate("login")}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                Platform.OS == "ios" && Dimensions.get("window").height > 895
                  ? styles.lowerButton
                  : styles.lowerButton4
              }
              onPress={() => navigation.navigate("signup")}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#14213D",
  },
  TitleSpace: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 180,
  },
  buttonBox: {},
  button: {
    backgroundColor: "#4B7FE0",
    paddingVertical: 15,
    justifyContent: "center",
    borderRadius: 1,
  },
  circle: {
    width: 470,
    height: 470,
    borderRadius: 300,
    backgroundColor: "#14213D",
    top: Dimensions.get("window").height - 850,
  },
  lowerButton: {
    padding: 18,
    width: Platform.OS == "ios" ? Dimensions.get("window").width - 240 : "50%",
    backgroundColor: "#FFA500",
  },
  lowerButton4: {
    padding: 18,
    width: Platform.OS == "ios" ? Dimensions.get("window").width - 195 : "50%",
    backgroundColor: "#FFA500",
  },
});
