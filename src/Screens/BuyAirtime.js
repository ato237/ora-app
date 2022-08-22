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
    if (operation === "myself")
      Linking.openURL(`tel:${encodeURIComponent(`#150*2*1*1*${amount}#`)}`);
    else if (operation === "someelse")
      Linking.openURL(
        `tel:${encodeURIComponent(`#150*2*1*2*${phoneNumber}*${amount}#`)}`
      );
  };
  const { operation } = route.params;
  return (
    <View style={{ padding: 30, backgroundColor: "white", flex: 1 }}>
      <StatusBar />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {operation === "myself"
          ? "Buy Airtime For Myself"
          : operation === "someelse"
          ? "Buy Airtime For SomeElse"
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
      {operation === "someelse" ? (
        <>
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
        </>
      ) : null}
      {operation === "myself" ? (
        <>
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
        </>
      ) : null}
    </View>
  );
};

export default Transfer;

const styles = StyleSheet.create({});
