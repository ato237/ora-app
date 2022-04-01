import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import { TextInput } from "react-native";
import icon from "../../images/adaptive-icon.png";
import { TouchableOpacity } from "react-native";
import { Feather } from "react-native-vector-icons";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../../context/reducers/Provider";

const Login = ({navigation}) => {
  const datas = useContext(GlobalContext);

  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
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

  const updateSecurityTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const auth = getAuth();


  const handleSignIn =()=>{
      signInWithEmailAndPassword(auth,data.email, data.password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log(user.email);
          datas.storeData(userCredentials);
          navigation.navigate('BottomTab');
        })
        .catch((error) => {
          alert(error.message);
        });
    }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#14213D" barStyle="light-content" />
      <Animatable.View
        animation="zoomInUp"
        style={{ backgroundColor: "#14213D", marginTop: 15 }}
      >
        <Image
          source={icon}
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
          }}
        />
      </Animatable.View>

      <View>
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Email or Phone Number"
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
        <TouchableOpacity
          style={{ alignItems: "flex-end", paddingHorizontal: 20 }}
        >
          <Text style={{ color: "#e5e5e5", textDecorationLine: "underline" }}>
            Forgot Password
          </Text>
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <View>
              <Text
                style={{ textAlign: "center", fontSize: 17, color: "white" }}
              >
                Log In
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
