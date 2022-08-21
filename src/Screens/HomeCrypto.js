import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { GlobalContext } from "../context/reducers/Provider";
import { Ionicons } from "@expo/vector-icons";
import MoneyTransferModal from "../components/MoneyTransferModal";

const HomeCrypto = ({ navigation }) => {
  const { userData } = useContext(GlobalContext);
  const [displayName, setDisplayName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setDisplayName(userData.displayName);
  }, []);

  const Option = ({navigate,icon,title,color}) => {
    return (
      <TouchableOpacity
      onPress={()=> setModalVisible(true)}
        style={{
          backgroundColor: modalVisible? "rgba(0,0,0,0.2)": "#fff",
          borderRadius: 20,
          alignItems: "center",
          marginHorizontal: 5,
          paddingVertical: 15,
          width: 110,
          height: 160,
          justifyContent:'center',

        }}
      >
        <Ionicons name={icon} color={color} size={35} />
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: color,
            fontSize: 18,
            marginTop: 10,
            maxWidth:80
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: modalVisible? "rgba(0,0,0,0.5)": "#F4F7FD",
        flex: 1,
      }}
    >
      <View>
        <Text style={{ fontSize: 27, fontWeight: "bold" }}>{displayName}</Text>
        <Text style={{ fontSize: 15, marginTop: 5 }}>Welcome Back</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent:'center', marginTop:30 }}>
        <Option icon="send" title="Money Transfer" color="#14213D"/>
        <Option icon="phone-portrait" title="Buy Airtime" color="#14213D"/>
        <Option icon="cash" title="Account Balance" color="#14213D"/>
      </View>
      <View>
        <Text style={{fontSize: 20, fontWeight:"bold", marginTop: 20}}>Features</Text>
      </View>
      <View
      style={{
        paddingTop: 10,
        backgroundColor: modalVisible? "#797979": "#F4F7FD",
        flex: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Charges Calculator")}
      >
        <View
          style={{
            backgroundColor: modalVisible? "rgba(0,0,0,0.2)": "#fff",            marginTop: 10,
            flexDirection: "row",
            padding: 20,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0.5 },
            shadowOpacity: 0.1,
            shadowRadius: 0.5,
          }}
        >
          <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Charges Calculator
              </Text>
              <Text style={{ color: "grey", paddingTop: 15 }}>
                Mobile Money Charges Calculator
              </Text>
            </View>
            <View style={{ left: 40 }}>
              <Ionicons name="calculator" size={35} color="#14213D" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Currency Converter")}
      >
        <View
          style={{
            backgroundColor: modalVisible? "rgba(0,0,0,0.2)": "#fff",    
                    marginTop: 20,
            flexDirection: "row",
            padding: 20,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0.5 },
            shadowOpacity: 0.1,
            shadowRadius: 0.5,
          }}
        >
          <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "#14213D" }}
              >
                Currency Converter
              </Text>
              <Text style={{ color: "grey", paddingTop: 15, color: "#14213D" }}>
                Convert 150+ Currencies
              </Text>
            </View>
            <View style={{ left: 90 }}>
              <Ionicons name="cash-outline" size={35} color="#14213D" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      </View>
      <MoneyTransferModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
    </SafeAreaView>
  );
};

export default HomeCrypto;

const styles = StyleSheet.create({});
