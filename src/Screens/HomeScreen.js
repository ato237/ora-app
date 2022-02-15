import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const HomeScreen = () => {
  const [text, onChangeText] = useState(0);
  const [selectedValue, setSelectedValue] = useState("Withdrawal");
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#14213D" barStyle="light-content" />
      <View style={styles.inputBox}>
        <Text style={{ fontSize: 20 }}>Amount</Text>
        <TextInput
          style={styles.input}
          onChangeText={text}
          underlineColorAndroid="transparent"
          placeholder="0"
          placeholderTextColor="#14213D"
        />

        <Text style={{ fontSize: 20, marginTop: 15 }}>Select Type</Text>
        <View style={styles.picker}>
          <Picker
          styles={{fontSize:20}}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Withdrawal" value="withdraw" />
            <Picker.Item label="Sending" value="send" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputBox: {
    margin: 15,
  },
  input: {
    marginTop: 15,
    height: 50,
    borderColor: "#14213D",
    borderWidth: 1,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#14213D",
    height: 40,
    marginTop: 15,
    justifyContent:'center',
    paddingVertical: 25
  },
  button: {
    backgroundColor: "#FFA500",
    justifyContent: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#000",
    fontSize: 25,
    padding: 10,
  },
});
