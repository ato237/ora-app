import { async } from "@firebase/util";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useRef, useEffect, useContext } from "react";
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
import { auth, db } from "../../firebase";
import { GlobalContext } from "../context/reducers/Provider";

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
  const { userData } = useContext(GlobalContext);
  const[failCount,setFailCount] = useState(0)
  const user = auth.currentUser;
  const [seconds, setSeconds] = React.useState(60);
  const [minutes, setMinutes] = React.useState(Math.floor(seconds / 60));

  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
        setMinutes(minutes)
    } else {
      setSeconds('I have reached 0');
    }
    
  });
  const handlePhoneAuth = async () => {
    axios
      .post(
        `http://10.0.0.225:8080/api/otp/sendotp/${
          "+" + phoneInput.current.state.code + value
        }`
      )
      .catch((error) => console.log(error))
      .then(async (response) => {
        console.log(response.status);

        // response.status == 200 ? (

        if (response.status == 200) {
          setPhone("+" + phoneInput.current.state.code + value);
          let phoneNumber = "+" + phoneInput.current.state.code + value;
          const userData = {
            email: user.email,
            verified: false,
          };
          if (phoneNumber) {
            userData.phoneNumber = phoneNumber;
          }
          await Promise.all([
            updateProfile(user, userData),
            updateDoc(doc(db, "users", user.uid), {
              ...userData,
              uid: user.uid,
            }),
          ]);
          setSubmitted(true);
        } else {
          return Alert.alert("Verification failed please try again later");
        }
      });
  };

  const handleVerify = async () => {
    console.log(phone);
    console.log(otp);
    axios
      .post(`http://10.0.0.225:8080/api/otp/verifyotp/${phone}/${otp}`)
      .catch((error) => console.log(error))
      .then(async (response) => {
        if (response.status == 200) {
          const userData = {
            AccountBalance: 0,
            email: user.email,
            verified: true,
            verifiedAt: serverTimestamp(),
          };
          await Promise.all([
            updateProfile(user, userData),
            updateDoc(doc(db, "users", user.uid), {
              ...userData,
              uid: user.uid,
            }),
          ]);
          navigation.navigate("home")
        }
      });
  };
  useEffect(() => {
    userData.verified == true ? navigation.navigate("home") : null;
  }, [userData.verified]);

  return (
    <>
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
          <View style={{ paddingHorizontal: 130, marginTop: 30 }}>
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
          <Text>{seconds}, {minutes}</Text>
        </SafeAreaView>
      </View>
    </>
  );
};

export default PhoneVerification;
