import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { GlobalContext } from "../context/reducers/Provider";
import { Avatar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Setting = ({navigation}) => {
  const { setId, userData, setUserData } = useContext(GlobalContext);

  const SignOut = async() => {
    await signOut(auth)
      .then(() => {
        console.log("signed out");
        navigation.navigate('signIn')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={{backgroundColor:'white',flex:1}}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity>
          <Image
            style={{
              right: 30,
              width: 120,
              height: 120,
              borderRadius: 100,
              marginHorizontal: 10,
            }}
            source={{ uri:userData == null?"Nothing to Show": userData.photoURL }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 30, marginBottom: 25 }}>
            {userData == null? "Nothing to show":userData.displayName}
          </Text>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "#0053C5",
              borderRadius: 25,
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingHorizontal:100,marginTop:100}}>
      <TouchableOpacity
      onPress={SignOut}
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          backgroundColor: "#0053C5",

        }}
      >
        <Text style={{color:'white'}}>Sign Out</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({});
