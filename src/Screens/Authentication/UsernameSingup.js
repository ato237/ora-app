import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Platform,
  } from "react-native";
  import React, { useState } from "react";
  import { TextInput } from "react-native";
  import icon from "../../images/adaptive-icon.png";
  import { TouchableOpacity } from "react-native";
  import { Feather } from "react-native-vector-icons";
  import * as Animatable from "react-native-animatable";
  import { SafeAreaView } from "react-native-safe-area-context";
  
  const UsernameSignup = ({navigation}) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const handleFirstName = () =>{
      setFirstName(firstName)
  }
  
  const handleLastName = () =>{
    setLastName(lastName)
}

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#14213D" barStyle="light-content" />
  
        <View>
          <View style={styles.inputSection}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="#B0B5BE"
              enablesReturnKeyAutomatically={true}
              returnKeyType="done"
              clearButtonMode="while-editing"
              autoCapitalize="none"
              onChangeText={handleFirstName}

            />
           
          </View>
          <View style={styles.inputSection}>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="#B0B5BE"
              enablesReturnKeyAutomatically={true}
              returnKeyType="done"
              clearButtonMode="while-editing"
              autoCapitalize="none"
              onChangeText={handleLastName}
            />
          
          </View>
  
  
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("phonesignup")}>
              <View>
                <Text
                  style={{ textAlign: "center", fontSize: 17, color: "white" }}
                >
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default UsernameSignup;
  
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
  