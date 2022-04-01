import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import icon from "../../images/adaptive-icon.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Google from "expo-auth-session/providers/google";
import { GlobalContext } from "../../context/reducers/Provider";
import * as WebBrowser from "expo-web-browser";
import {
  getFirestore,
  setDoc,
  doc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../firebase";
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import * as Facebook from "expo-facebook";

WebBrowser.maybeCompleteAuthSession();

const auth = getAuth();

// Listen for authentication state to change.
const WelcomeScreen = ({ navigation }) => {
  const[image, setImage] = useState('')
  const[gender,setGender] = useState('')
  const datas = useContext(GlobalContext);

useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      const userRef = doc(db, "users", user.uid);

      getDoc(userRef).then((docSnap) => {
        datas.setUserData(docSnap.data());
        if (docSnap.exists() && docSnap.data().phoneNumber != "") {
        } else {
          createUser(user.displayName, image, user.uid, user.email,gender);
          navigation.navigate("usernamesignup");
        }
      });
    } else {
      navigation.navigate("welcome");
    }
    // Do other things
  });
},[image])
 

  async function loginWithFacebook() {
    await Facebook.initializeAsync({ appId: "253829146651147" });

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"]
    });

    if (type === "success") {
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500),gender`)
      const profile = await response.json();
      setImage(profile.picture.data.url)
      //setGender(profile.gender)
      // Build Firebase credential with the Facebook access token.
      const credential = FacebookAuthProvider.credential(token);
      datas.storeData(credential);
      navigation.navigate('BottomTab')
      // Sign in with credential from the Facebook user.
      signInWithCredential(auth, credential).catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
    }
  }

  const facebookLogin = async() =>{
    try{
      await Facebook.initializeAsync({ appId: "253829146651147" });
      
    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ["public_profile", "email"],
    });
    if (type === "success") {
      // Build Firebase credential with the Facebook access token.
     
      console.log(profile);
      createUser(profile.displayName, user.photoURL, user.uid, user.email);

      const credential = FacebookAuthProvider.credential(token);

      // Sign in with credential from the Facebook user.
      signInWithCredential(auth, credential).catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
    }
    }catch (e) {
      Alert.alert(
          "Oops!",
          "La connexion a échoué avec Facebook! Nous allons l'examiner. Merci de créer un compte.",
      );
      console.log(e.message);
  }

    
  }

  const createUser = (userName, photo, uid, email,gender) => {
    const userRef = doc(db, "users", uid);
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
    <View style={styles.container}>
      <StatusBar backgroundColor="#14213D" barStyle="light-content" />

      <View>
        <View style={styles.TitleSpace}>
          <Image source={icon} style={{ width: 200, height: 200 }} />
          <View style={{ bottom: 35 }}>
            <Text style={{ fontSize: 30, color: "#fff", fontWeight: "bold" }}>
              ORRAMO
            </Text>
            <Text style={{ fontSize: 13, color: "#fff", textAlign: "center" }}>
              Chat & Send
            </Text>
          </View>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            onPress={() => {
              loginWithFacebook();
            }}
            style={styles.button}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="logo-facebook" size={28} color="#fff" />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {"    "}
                Sign in With Facebook
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 15,
              marginTop: 15,
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                ...styles.lowerButton,
                ...{
                  borderWidth: 1,
                  backgroundColor: "none",
                  borderColor: "#FFA500",
                },
              }}
              onPress={() => navigation.navigate("login")}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                Platform.OS == "ios" && Dimensions.get("window").height > 895
                  ? styles.lowerButton
                  : styles.lowerButton4
              }
              onPress={() => navigation.navigate("signup")}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#14213D",
  },
  TitleSpace: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 180,
  },
  buttonBox: {},
  button: {
    backgroundColor: "#4B7FE0",
    paddingVertical: 15,
    justifyContent: "center",
    borderRadius: 1,
  },
  circle: {
    width: 470,
    height: 470,
    borderRadius: 300,
    backgroundColor: "#14213D",
    top: Dimensions.get("window").height - 850,
  },
  lowerButton: {
    padding: 18,
    width: Platform.OS == "ios" ? Dimensions.get("window").width - 240 : "50%",
    backgroundColor: "#FFA500",
  },
  lowerButton4: {
    padding: 18,
    width: Platform.OS == "ios" ? Dimensions.get("window").width - 195 : "50%",
    backgroundColor: "#FFA500",
  },
});
