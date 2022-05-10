import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const NewWelcome = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop:  Dimensions.get("window").height * PixelRatio.get() <= 1334
              ? 50
              : 80, }}>
        <Image
          style={{ width: "100%", height: 300 }}
          source={require("../../assets/BTC.png")}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Text style={{ fontSize: 30, color: "#14213D", fontWeight: "bold" }}>
          Welcome To Orramo
        </Text>
        <Text style={{ marginTop: 20 }}>
          Buy, Sell and Spend your crypto today with Orramo.
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop:
            Dimensions.get("window").height * PixelRatio.get() <= 1334
              ? 50
              : 80,
        }}
      >
        <View>
          <TouchableOpacity
            onPress={()=>navigation.navigate("login")}
            style={{
              backgroundColor: "#14213D",
              padding: 20,
              paddingHorizontal: 50,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontSize:20  }}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={()=>navigation.navigate("signup")}
            style={{
              backgroundColor: "#FFA500",
              padding: 20,
              paddingHorizontal: 50,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontSize:20 }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewWelcome;

const styles = StyleSheet.create({});
