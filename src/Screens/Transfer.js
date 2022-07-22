import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";

const Transfer = () => {
  return (
    <View>
      <TextInput />
      <TextInput />
      <TouchableOpacity>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Transfer;

const styles = StyleSheet.create({});
