import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { GlobalContext } from "../context/reducers/Provider";
import { useIsFocused } from "@react-navigation/native";

const Transfer = ({ route, navigation }) => {
  const isFocused = useIsFocused();

  const { number } = useContext(GlobalContext);
  const [amount, setAmount] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");

  useEffect(() => {
    setphoneNumber(number);
    console.log(phoneNumber);
  }, [isFocused]);

  const handleSubmit = () => {
    if (phoneNumber.length > 9 || phoneNumber.length < 9) {
      Alert.alert("Please enter a valid phoneNumber");
    } else {
      if (operation === "versClientOrange")
        Linking.openURL(`tel:${encodeURIComponent(`#150*1*1*${phoneNumber}#*${amount}#`)}`);
      else if (operation === "versClientNonOrange")
        Linking.openURL(`tel:${encodeURIComponent(`#150*1*2*${phoneNumber}#*${amount}#`)}`);
    }
    if (operation === "versAutreClient")
      Linking.openURL(`tel:${encodeURIComponent(`#150*1*3*${phoneNumber}#*${amount}#`)}`);
  };
  const { operation } = route.params;
  return (
    <View style={{ padding: 30, backgroundColor: "white", flex: 1 }}>
      <StatusBar />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {operation === "versClientOrange"
          ? "ORANGE MONEY TRANSFER"
          : operation === "versClientNonOrange"
          ? "ORANGE TO NON-ORANGE TRANSFER"
          : "TRANSFER TO OTHER NETWORK"}
      </Text>
      <View style={{ marginTop: 25 }}>
        <View
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 6,
            borderColor: "#8E8383",
          }}
        >
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="Enter Amount"
          />
        </View>
      </View>
      <View style={{ marginTop: 25 }}>
        <View
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 6,
            borderColor: "#8E8383",
            flexDirection: "row",
          }}
        >
          <TextInput
            value={phoneNumber}
            onChangeText={setphoneNumber}
            style={{ flex: 1 }}
            keyboardType="numeric"
            placeholder="Reciever's phoneNumber"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("contacts")}
            style={{ backgroundColor: "#563CB1", padding: 4 }}
          >
            <Ionicons name="person" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: "#14213D",
          padding: 15,
          borderRadius: 6,
          marginTop: 27,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Transfer;

const styles = StyleSheet.create({});
