import axios from "axios";
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  Alert,
  TextInput,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";

const PhoneVerification = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [phone, setPhone] = useState("");
  const phoneInput = useRef(null);
  const [numberSubmit, isNumberSubmit] = useState(false);
  const [formattedValue, setFormattedValue] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [valid, setValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [otp, setOtp] = useState("");
  const handlePhoneAuth = () => {
    axios
      .post(
        `http://10.0.0.225:8080/api/otp/sendotp/${
          "+" + phoneInput.current.state.code + value
        }`
      )
      .catch((error) => console.log(error))
      .then((response) => {
        console.log(response.status);
        response.status == 200 ? setSubmitted(true) : null;
        setPhone("+" + phoneInput.current.state.code + value);
      });
  };

  const handleVerify = () => {
    axios
      .post(`http://10.0.0.225:8080/api/otp/verifyotp/${phone}/${otp}`)
      .catch((error) => console.log(error))
      .then((response) => {
        response.status == 200 ? navigation.navigate("profile") : null;
      });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View>
        <SafeAreaView>
          <View>
            {!submitted && (
              <Text
                style={{
                  fontSize: 20,
                  alignItems: "center",
                  textAlign: "center",
                  marginVertical: 50,
                  color: "#0053C5",
                }}
              >
                Enter Your Phone Number
              </Text>
            )}
            {submitted && (
              <Text
                style={{
                  fontSize: 20,
                  alignItems: "center",
                  textAlign: "center",
                  marginVertical: 50,
                  color: "#0053C5",
                }}
              >
                Enter Verification Code
              </Text>
            )}
          </View>
          {submitted && (
            <Text style={{ textAlign: "center" }}>
              Orramo will send you a verification text on your phone number so
              make sure it is valid
            </Text>
          )}
          {!submitted && (
            <Text style={{ textAlign: "center" }}>
              Orramo has sent you a verification code on your phone number
              please enter it below
            </Text>
          )}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            {!submitted && (
              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="CM"
                layout="first"
                onChangeText={(text) => {
                  setValue(text);
                }}
                onChangeFormattedText={(text) => {
                  setFormattedValue(text);
                }}
                // withDarkTheme
                autoFocus
              />
            )}
            {submitted && (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    color: "green",
                    marginBottom: 20,
                  }}
                >
                  Verification sent!{" "}
                </Text>
                <View style={{ backgroundColor: "white" }}>
                  <TextInput
                    style={{ paddingVertical: 15, marginHorizontal: 25 }}
                    placeholder="Enter Verification code"
                    value={otp}
                    onChangeText={setOtp}
                  />
                </View>
              </View>
            )}
          </View>
          <View style={{ paddingHorizontal: 130, marginTop: 100 }}>
            {!submitted && (
              <TouchableOpacity
                style={{
                  backgroundColor: "#14213D",
                  padding: 10,
                  borderRadius: 3,
                }}
                onPress={() => {
                  const checkValid = phoneInput.current?.isValidNumber(value);
                  setShowMessage(true);
                  setValid(checkValid ? checkValid : false);
                  !checkValid
                    ? Alert.alert("Please Enter a Valid Phone Number")
                    : handlePhoneAuth();
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Next
                </Text>
              </TouchableOpacity>
            )}
            {submitted && (
              <TouchableOpacity
                style={{
                  backgroundColor: "#14213D",
                  padding: 10,
                  borderRadius: 3,
                }}
                onPress={handleVerify}
              >
                <Text style={{ color: "white", textAlign: "center" }}>
                  Verify Number
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default PhoneVerification;
