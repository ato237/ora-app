import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import axios from "axios";




const OrangeMoney = () => {

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Withdrawal', value: 'withdraw'},
    {label: 'Client Transfer', value: 'send'},
    {label: 'non-Client Transfer', value: 'sendnone'},
  ]);
  const [status, setStatus] = useState("withdraw")

  const [text, onChangeText] = useState(0);
  const [Calculated, isCalculated] = useState(false);
  const [values, setValues] = useState(1000)
 const [data, setData] = useState([]);



const handleStatus = (e) =>{
  setStatus(items.map((item) => item.value))
  console.log(status)
}

  const handleCalculate = (e) => {
    e.preventDefault();

    axios.post(
      `localhost:8081/api/calculate/orange/${values}/${status}`).then((response)=>{
      setData(response.data);
      isCalculated(true);
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#14213D" barStyle="light-content" />
      <View style={styles.inputBox}>
        <Text style={{ fontSize: 12 }}>Orange Money</Text>
        <TextInput
          style={styles.input}
          value={values}
          onChangeText={(values) => setValues(values)}
          underlineColorAndroid="transparent"
          placeholder="Enter Amount"
          placeholderTextColor="#14213D"
          placeholderStyle={{ fontSize: 20 }}
          keyboardType="numeric"
        />

        <Text style={{ fontSize: 12, marginTop: 15 }}>Select Type</Text>
        <View style={styles.picker}>
          <DropDownPicker
      open={open}
      value={status}
      items={items}
      setOpen={setOpen}
      setValue={handleStatus}
      setItems={setItems}
      stickyHeader={true}
      placeholder="Select Transaction Type"
      dropDownDirection= {Platform.OS == "ios"? "TOP" : "AUTO"}
      bottomOffset={100}
    />
        </View>

        <TouchableOpacity
          onPress={handleCalculate}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.resultBox}>
        <View style={styles.resultHeader}>
          <Text style={styles.resultText}>Result</Text>
        </View>

        <View style={Calculated ? styles.resultComponent : null}>
          <View style={{ flexDirection: "row" }}>
            {Calculated ? (
              <Text style={styles.MainCharge}>Orange Money Charge: </Text>
            ) : null}
            <Text
              style={{
                fontSize: 16,
                marginTop: 12.5,
                fontWeight: "bold",
                color: "#14213D",
              }}
            >
              100000000fcfa
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            {Calculated ? (
              <Text style={styles.chargreIn}>Total Amount In Balance: </Text>
            ) : null}
            {data.map((datum) =>(
            <Text style={styles.amount}>{datum.orangeCharge}</Text>

            ))}
          </View>
          <View style={{ flexDirection: "row" }}>
            {Calculated ? <Text style={styles.chargreIn}>Tax: </Text> : null}
            <Text style={styles.amount}>500fcfa</Text>
          </View>
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
    borderRadius: 7,
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
    paddingHorizontal: 13,
  },
  resultHeader: { paddingBottom: 10 },
  resultText: {
    textAlign: "center",
    fontSize: 15,
  },
  resultComponent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "center",
    flexDirection: "column",
    borderWidth: 0.7,
    borderRadius: 5,
  },
  chargreIn: {
    marginVertical: 10,
    color: "#C36FAB",
    fontSize: 15,
    fontWeight: "bold",
  },
  MainCharge: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#14213D",
  },
  amount: {
    fontSize: 14,
    marginTop: 11,
    fontWeight: "bold",
    color: "#C36FAB",
  },
});
