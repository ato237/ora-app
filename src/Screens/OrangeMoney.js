import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Dropdown from "../components/Dropdown";

const OrangeMoney = () => {
  const [text, onChangeText] = useState(0);
  const [selectedValue, setSelectedValue] = useState("Withdrawal");
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#14213D" barStyle="light-content" />
      <View style={styles.inputBox}>
        <Text style={{ fontSize: 12 }}>Orange Money</Text>
        <TextInput
          style={styles.input}
          onChangeText={text}
          underlineColorAndroid="transparent"
          placeholder="Enter Amount"
          placeholderTextColor="#14213D"
          placeholderStyle={{ fontSize: 20 }}
          keyboardType="numeric"
        />

        <Text style={{ fontSize: 12, marginTop: 15 }}>Select Type</Text>
        <View style={styles.picker}>
          <Dropdown />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultBox}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultText}>Result</Text>
        </View>
        <View style={styles.resultComponent}>
          <Text style={styles.MainCharge}>Orange Money Charge: </Text>
          <Text style={styles.chargreIn}>Total Amount In Balance: </Text>
          <Text style={styles.chargreIn}>Tax: </Text>
        </View>
      </View>
    </View>
  );
};

export default OrangeMoney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputBox: {
    margin: 15,
  },
  input: {
    marginTop: 15,
    height: 50,
    borderColor: "#14213D",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  picker: {
    justifyContent: "center",
    paddingVertical: 12,
  },
  button: {
    backgroundColor: "#FFA500",
    justifyContent: "center",
    marginTop: 15,
    borderRadius: 12,
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  },
  resultBox: {
    justifyContent: "center",
    marginTop: 13,
  },
  resultHeader: {},
  resultText: {
    textAlign: "center",
    fontSize: 15,
  },
  resultComponent: {
    justifyContent: "center",
  },
  chargreIn: {
    textAlign:'center',
    color: "#C36FAB",
    fontSize: 15,
    fontWeight: 'bold'
  },
  MainCharge:{
    textAlign:'center',
    fontSize: 18,
    fontWeight:'bold',
    color: "#14213D"
  }
});
