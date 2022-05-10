import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Services = ({ navigation }) => {
  return (
    <View
      style={{
        paddingTop: 10,
        backgroundColor: "#F8F8FF",
        flex: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Charges Calculator")}
      >
        <View
          style={{
            backgroundColor: "white",
            margin: 10,
            flexDirection: "row",
            padding: 20,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0.5 },
            shadowOpacity: 0.1,
            shadowRadius: 0.5,
          }}
        >
          <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Charges Calculator
              </Text>
              <Text style={{ color: "grey", paddingTop: 15 }}>
                Mobile Money Charges Calculator
              </Text>
            </View>
            <View style={{ left: 40 }}>
              <Ionicons name="calculator" size={30} color="#0053C5" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Currency Converter")}
      >
        <View
          style={{
            backgroundColor: "white",
            margin: 10,
            flexDirection: "row",
            padding: 20,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0.5 },
            shadowOpacity: 0.1,
            shadowRadius: 0.5,
          }}
        >
          <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#14213D" }}
              >
                Currency Converter
              </Text>
              <Text style={{ color: "grey", paddingTop: 15, color: "#14213D" }}>
                Convert 150+ Currencies
              </Text>
            </View>
            <View style={{ left: 90 }}>
              <Ionicons name="cash-outline" size={30} color="#0053C5" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});
