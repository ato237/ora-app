import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const Transfer = () => {
  return (
    <View style={{ padding: 30, backgroundColor:'white', flex:1 }}>
     <StatusBar/>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>ORANGE MONEY</Text>
      <View style={{ marginTop: 25 }}>
        <View
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 6,
            borderColor: "#8E8383",
          }}
        >
          <TextInput keyboardType="numeric" placeholder="Enter Amount" />
        </View>
        
      </View>
      <View style={{ marginTop: 25 }}>
        <View
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 6,
            borderColor: "#8E8383",
            flexDirection:'row',

          }}
        >
          <TextInput style={{flex:1}} keyboardType="numeric" placeholder="Reciever's Number" />
       <TouchableOpacity style={{backgroundColor:'#563CB1', padding: 4}}>
        <Ionicons name="person" size={22} color="white"/>
       </TouchableOpacity>
        </View>
        
      </View>
      <TouchableOpacity
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
