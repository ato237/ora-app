import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { GlobalContext } from "../context/reducers/Provider";
import { Ionicons } from "@expo/vector-icons";
import MoneyTransferModal from "../components/MoneyTransferModal";
import BuyAirtimeModal from "../components/BuyAirtimeModal";
import AccountBalanceModal from "../components/AccountBalanceModal";
import Payments from "./Payments";
import { A } from '@expo/html-elements';
import * as Linking from 'expo-linking';
import numbro from "numbro";


const HomeCrypto = ({ navigation }) => {
  const { userData } = useContext(GlobalContext);
  const [displayName, setDisplayName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  useEffect(() => {
    setDisplayName(userData.displayName);
  }, []);

  const Option = ({ icon, title, color }) => {
    return (
      <View>
      <View
        style={{
          backgroundColor:
            modalVisible || modalVisible1 || modalVisible2
              ? "rgba(0,0,0,0.2)"
              : "#fff",
          borderRadius: 20,
          alignItems: "center",
          marginHorizontal: 15,
          paddingVertical: 15,
          width: 80,
          height: 80,
          justifyContent: "center",
        }}
      >
        <Ionicons name={icon} color={color} size={25} />
        
      </View>
      <Text
      style={{
        textAlign: "center",
        color: color,
        fontSize: 12,
        marginTop: 10,
      }}
    >
      {title}
    </Text>
    </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor:
          modalVisible || modalVisible1 || modalVisible2
            ? "rgba(0,0,0,0.5)"
            : "#F4F7FD",
        flex: 1,
      }}
    >
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 27, fontWeight: "bold" }}>{displayName}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 15, marginTop: 5, color: "grey", flex: 1 }}>
            Welcome Back
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("payments")}
            style={{
              backgroundColor:
                modalVisible || modalVisible1 || modalVisible2
                  ? "rgba(0,0,0,0.2)"
                  : "blue",
              borderRadius: 20,
              width: 70,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Top up+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor:
            modalVisible || modalVisible1 || modalVisible2
              ? "rgba(0,0,0,0.2)"
              : "#fff",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: 23,
        }}
      >
        <Text style={{ fontSize: 25, marginBottom: 15, textAlign: "center" }}>
        {numbro(userData.Account.AccountBalance).format({
                thousandSeparated: true,
                mantissa: 2, // number of decimals displayed
              })}
          <Text style={{ fontSize: 15, fontWeight: "bold" }}> XAF</Text>
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cards")}
            style={{
              backgroundColor:
                modalVisible || modalVisible1 || modalVisible2
                  ? "rgba(0,0,0,0.2)"
                  : "#DFFAFF",
              marginHorizontal: 10,
            }}
          >
            <Text style={{ color: "blue" }}>Virtual Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("BuyAirtimeNetwork")}
            style={{
              backgroundColor:
                modalVisible || modalVisible1 || modalVisible2
                  ? "rgba(0,0,0,0.2)"
                  : "#DFFAFF",
            }}
          >
            <Text style={{ color: "blue" }}>Buy Airtime</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 13 }}>
          USSD Shortcuts
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 15,
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Option icon="send" title="Money Transfer" color="#14213D" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible1(true)}>
          <Option
            icon="phone-portrait"
            title="Buy Airtime "
            color="#14213D"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible2(true)}>
          <Option icon="cash" title="Account Balance" color="#14213D" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 15 }}>
          Features
        </Text>
      </View>
      <View
        style={{
          paddingTop: 10,
          backgroundColor:
            modalVisible || modalVisible1 || modalVisible2
              ? "#797979"
              : "#F4F7FD",
          flex: 1,
          flexDirection:"row", justifyContent:'center'
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Charges Calculator")}
        >
          <View
            style={{
              backgroundColor:
                modalVisible || modalVisible1 || modalVisible2
                  ? "rgba(0,0,0,0.2)"
                  : "#fff",
              marginTop: 8,
              flexDirection: "row",
              padding: 15,
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0.5 },
              shadowOpacity: 0.1,
              shadowRadius: 0.5,
              marginHorizontal:10
            }}
          >
            <View style={{ marginHorizontal: 0 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 14, maxWidth:200, textAlign:"center" }}>
                  Charges Calculator
                </Text>
                </View>

                 <Text style={{ color: "grey", fontSize: 12, paddingTop: 25 }}>
                  Mobile Money Charges
                </Text>
             
            
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Currency Converter")}
        >
          <View
            style={{
              backgroundColor:
                modalVisible || modalVisible1 || modalVisible2
                  ? "rgba(0,0,0,0.2)"
                  : "#fff",
              marginTop: 8,
              flexDirection: "row",
              padding: 15,
              borderRadius: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0.5 },
              shadowOpacity: 0.1,
              shadowRadius: 0.5,              marginHorizontal:10

            }}
          >
            <View style={{ marginHorizontal: 0 }}>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{ fontSize: 14, maxWidth:200, color: "#14213D" }}
                >
                  Currency Converter
                </Text>
                </View>

                <Text style={{ color: "grey", paddingTop: 25, fontSize: 12 }}>
                  Convert 150+ Currencies
                </Text>
             
            
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {!modalVisible && !modalVisible1 && !modalVisible2 ? (
        
      <TouchableOpacity onPress={()=>Linking.openURL('https://orralearn.com')    } style={{marginBottom:Platform.OS == "android"? 30 : 0}}>
      <View style={{backgroundColor:"#14213D", paddingVertical:35, paddingHorizontal:10, borderRadius:20}}>
        <Text style={{color:"white"}}>Want to learn how to code?</Text>
  <Text style={{color:'white', fontSize:20}}>Join </Text>
  <Text style={{color:'white', fontSize:25, maxWidth:240}}>The Programmer's University</Text>
</View>
      </TouchableOpacity>):null}

      {modalVisible || modalVisible1 || modalVisible2 ? (
        <>
          <MoneyTransferModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <BuyAirtimeModal
            modalVisible={modalVisible1}
            setModalVisible={setModalVisible1}
          />
          <AccountBalanceModal
            modalVisible={modalVisible2}
            setModalVisible={setModalVisible2}
          />
        </>
      ) : null}
    </SafeAreaView>
  );
};

export default HomeCrypto;

const styles = StyleSheet.create({});
