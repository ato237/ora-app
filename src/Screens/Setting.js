import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/reducers/Provider";
import { Avatar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { StreamChat } from "stream-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const API_KEY = "n7duuv99yqcx";
const client = StreamChat.getInstance(API_KEY);
const Setting = ({ navigation }) => {
  const { setId, userData, setUserData } = useContext(GlobalContext);

  const [user, setUser] = useState({
    Account: {
      AccountBalance:0,
      AccountNumber:""
    },
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL:
      "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png",
    token: "",
    uid: "",
    verified: true,
    verifiedAt: {
      nanoseconds: 453000000,
      seconds: 1649837251,
    },
  });

  useEffect(() => {
    setUser(userData);
  }, []);
  const SignOut = async () => {
    await AsyncStorage.removeItem("userData");
    await signOut(auth)
      .then(() => {
        console.log("signed out");
        navigation.navigate("welcome");
        client.disconnectUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ScrollView >
      <SafeAreaView style={{ backgroundColor: "#F8F8FF", flex: 1 }}>
        <TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: "#F8F8FF",
              paddingVertical: 15,
              bottom: 20,
              marginTop:30
            }}
          >
            <Image
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                marginHorizontal: 10,
              }}
              source={{
                uri: userData == null ? "Nothing to Show" : user.photoURL,
              }}
            />
          </View>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
          <Text style={{ color: "#0053C5", fontWeight: "bold", fontSize: 18 }}>
            Account
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            marginTop: 5,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginTop: 5,
            }}
          >
            <Ionicons
              style={{ marginTop: 10, marginHorizontal: 10 }}
              name="person-outline"
              size={20}
            />

            <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10 }}>
              {user.displayName}
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: 10,
                marginBottom: 10,
                color: "#0053C5",
                marginHorizontal: 0,
              }}
            >
              Online
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            marginTop: 5,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginTop: 5,
            }}
          >
            <Ionicons
              style={{ marginTop: 10, marginHorizontal: 10 }}
              name="call-outline"
              size={20}
            />

            <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10 }}>
              {user.phoneNumber}
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: 10,
                marginBottom: 10,
                color: user.verified ? "green" : "red",
                marginHorizontal: 0,
              }}
            >
              {user.verified ? "verified" : "Not Verified"}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            marginTop: 5,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginTop: 5,
            }}
          >
            <Ionicons
              style={{ marginTop: 10, marginHorizontal: 10 }}
              name="mail-outline"
              size={20}
            />
            <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10 }}>
              {user.email}
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: 10,
                marginBottom: 10,
                color: !user.verified ? "green" : "red",
                marginHorizontal: 0,
              }}
            >
              {!user.verified ? "verified" : "Not Verified"}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 20, marginTop: 25 }}>
          <Text style={{ color: "#0053C5", fontWeight: "bold", fontSize: 18 }}>
            Settings
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            marginTop: 5,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginTop: 5,
            }}
          >
            <Ionicons
              style={{ marginTop: 10, marginHorizontal: 10 }}
              name="alert-outline"
              size={20}
            />
            <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10 }}>
              Display Mode
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            marginTop: 5,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginTop: 5,
            }}
          >
            <Ionicons
              style={{ marginTop: 10, marginHorizontal: 10 }}
              name="notifications-outline"
              size={20}
            />
            <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10 }}>
              Notifications and Sounds
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            marginTop: 5,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginTop: 5,
            }}
          >
            <Ionicons
              style={{ marginTop: 10, marginHorizontal: 10 }}
              name="chatbox-outline"
              size={20}
            />
            <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10 }}>
              Chat Settings
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            marginTop: 5,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginTop: 5,
            }}
          >
            <Ionicons
              style={{ marginTop: 10, marginHorizontal: 10 }}
              name="laptop-outline"
              size={20}
            />
            <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10 }}>
              Devices
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 20, marginTop: 25 }}>
          <Text style={{ color: "#0053C5", fontWeight: "bold", fontSize: 18 }}>
            Contact us
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            marginTop: 5,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginTop: 5,
            }}
          >
            <Ionicons
              style={{ marginTop: 10, marginHorizontal: 10 }}
              name="alert-outline"
              size={20}
            />
            <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10 }}>
              Contact Support
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            marginTop: 5,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginTop: 5,
            }}
          >
            <Ionicons
              style={{ marginTop: 10, marginHorizontal: 10 }}
              name="book-outline"
              size={20}
            />
            <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10 }}>
              Terms and Conditions
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            marginTop: 5,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginTop: 5,
            }}
          >
            <Ionicons
              style={{ marginTop: 10, marginHorizontal: 10 }}
              name="logo-facebook"
              size={20}
            />
            <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10 }}>
              facebook
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            marginTop: 5,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginTop: 5,
            }}
          >
            <Ionicons
              style={{ marginTop: 10, marginHorizontal: 10 }}
              name="logo-twitter"
              size={20}
            />
            <Text style={{ fontSize: 17, marginTop: 10, marginBottom: 10 }}>
              Twitter
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 102, marginVertical: 10 }}>
          <TouchableOpacity
            onPress={SignOut}
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 20,
              borderWidth: 1,
            }}
          >
            <Text style={{ textAlign: "center" }}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Setting;

const styles = StyleSheet.create({});
