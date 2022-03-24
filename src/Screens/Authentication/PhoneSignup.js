import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import React, { useState, useContext } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "react-native-elements";
import { GlobalContext } from "../../context/reducers/Provider";
import { Ionicons } from "react-native-vector-icons";

const PhoneSignup = ({ navigation }) => {
  const [phoneNumber, setphoneNumber] = useState("");
  const datas = useContext(GlobalContext);

  const handlePhoneNumber = () => {
    setFirstName(phoneNumber);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#14213D" barStyle="light-content" />

      <View>
        <View style={styles.inputSection}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.currencyOptions}
              onPress={() => {
                navigation.navigate("currency");
                datas.setFrom(false);
              }}
            >
              <Ionicons
                style={{ right: 5, top: 5 }}
                name="caret-down-outline"
                size={10}
                color="#fff"
              />
              <Text
                style={{
                  color: "white",
                }}
              >
                +237
              </Text>
              {/**This is the Arrow beside the 2nd currency */}
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#B0B5BE"
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            clearButtonMode="while-editing"
            autoCapitalize="none"
            onChangeText={handlePhoneNumber}
          />
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("BottomTab")}
          >
            <View>
              <Text
                style={{ textAlign: "center", fontSize: 17, color: "white" }}
              >
                Send me a text
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("BottomTab")}>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              textDecorationLine: "underline",
              color: "white",
            }}
          >
            Do This Later
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PhoneSignup;

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
  currencyOptions: {
    width: 50,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
});
