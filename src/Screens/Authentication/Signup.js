import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native";
import icon from "../../images/adaptive-icon.png";
import { TouchableOpacity } from "react-native";
import { Feather } from "react-native-vector-icons";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../../context/reducers/Provider";
import { db } from "../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const Signup = ({navigation}) => {
  const datas = useContext(GlobalContext);

  const [data, setData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: true,
  });

  const textInputChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };
  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirmPassword: val,
    });
  };

  const updateSecurityTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateConfirmSecurityTextEntry = () => {
    setData({
      ...data,
      confirmSecureTextEntry: !data.confirmSecureTextEntry,
    });
  };

  const auth = getAuth();


  const handleSignUp =()=>{

    if (data.confirmPassword != data.password) {
      return Alert.alert("Passwords don't match");
    } else {
      createUserWithEmailAndPassword(auth,data.email, data.password)
        .then((userCredentials) => {
          createUser(userCredentials.user.uid)
          const user = userCredentials.user;
          console.log(user.email);
          navigation.navigate('usernamesignup');
        })
        .catch((error) => {
          Alert(error.message);
        });
    }
}

const createUser = (id) => {
  const userRef = doc(db, "users", id);
  return setDoc(userRef, {
    created: serverTimestamp(),
    name: userName,
    picture: photo,
    email: email,
    gender:gender,
    AccountBalance: 0
  });
};


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#14213D" barStyle="light-content" />

      <View>
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#B0B5BE"
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            clearButtonMode="while-editing"
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Feather name="check-circle" color="green" size={20} />
          ) : null}
        </View>
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#B0B5BE"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecurityTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="#fff" size={20} />
            ) : (
              <Feather name="eye" color="#fff" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Re-Enter Password"
            placeholderTextColor="#B0B5BE"
            secureTextEntry={data.confirmSecureTextEntry ? true : false}
            onChangeText={(val) => handleConfirmPasswordChange(val)}
          />
          <TouchableOpacity onPress={updateConfirmSecurityTextEntry}>
            {data.confirmSecureTextEntry ? (
              <Feather name="eye-off" color="#fff" size={20} />
            ) : (
              <Feather name="eye" color="#fff" size={20} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <View>
              <Text
                style={{ textAlign: "center", fontSize: 17, color: "white" }}
              >
                Continue
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#14213D",
    flex: 1,
  },
  inputSection: {
    backgroundColor: "#14213D",
    borderWidth: 1,
    borderColor: "#fff",
    padding: Platform.OS == "ios" ? 15 : 12,
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#14213D",
    color: "#fff",
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#FFA500",
    borderWidth: 1,
    paddingVertical: 15,
    justifyContent: "center",
    borderRadius: 1,
  },
  bottomContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
