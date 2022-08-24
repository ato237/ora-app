import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { GlobalContext } from "../context/reducers/Provider";
import { Ionicons } from "@expo/vector-icons";
import MoneyTransferModal from "../components/MoneyTransferModal";
import BuyAirtimeModal from "../components/BuyAirtimeModal";
import AccountBalanceModal from "../components/AccountBalanceModal";
import Payments from "./Payments";

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
          width: 90,
          height: 110,
          justifyContent: "center",
        }}
      >
        <Ionicons name={icon} color={color} size={25} />
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: color,
            fontSize: 14,
            marginTop: 10,
            maxWidth: 60,
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
          onPress={()=>navigation.navigate("payments")}
      style={{ backgroundColor:  modalVisible || modalVisible1 || modalVisible2
        ? "rgba(0,0,0,0.2)"
        : "#DFFAFF" , borderRadius:20, width:70, justifyContent:'center' }} >
          <Text style={{color:'blue',textAlign:'center'}}>Top up+</Text>
      </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: modalVisible || modalVisible1 || modalVisible2
          ? "rgba(0,0,0,0.2)"
          : "#fff",
          borderRadius: 10,
          alignItems: "center",
          paddingVertical: 23,
        }}
      >
        <Text style={{ fontSize: 25, marginBottom: 15, textAlign: "center" }}>
          {userData.Account.AccountBalance}
          <Text style={{ fontSize: 15, fontWeight: "bold" }}> XAF</Text>
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cards")}
            style={{ backgroundColor:  modalVisible || modalVisible1 || modalVisible2
              ? "rgba(0,0,0,0.2)"
              : "#DFFAFF", marginHorizontal: 10 }}
          >
            <Text style={{ color: "blue" }}>Virtual Cards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: modalVisible || modalVisible1 || modalVisible2
        ? "rgba(0,0,0,0.2)"
        : "#DFFAFF" }}>
            <Text style={{ color: "blue" }}>Buy Airtime</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 13 }}>
          Mobile Money Shortcuts
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
          <Option icon="send-outline" title="Money Transfer" color="#14213D" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible1(true)}>
          <Option
            icon="phone-portrait-outline"
            title="Buy Airtime "
            color="#14213D"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible2(true)}>
          <Option icon="cash-outline" title="Account Balance" color="#14213D" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 15 }}>
          Features
        </Text>
      </View>
      <View
        style={{
          paddingTop: 0,
          backgroundColor:
            modalVisible || modalVisible1 || modalVisible2
              ? "#797979"
              : "#F4F7FD",
          flex: 1,
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
            }}
          >
            <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  Charges Calculator
                </Text>
                <Text style={{ color: "grey", fontSize: 12, paddingTop: 15 }}>
                  Mobile Money Charges Calculator
                </Text>
              </View>
              <View style={{ left: 80 }}>
                <Ionicons name="calculator-outline" size={25} color="#14213D" />
              </View>
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
              shadowRadius: 0.5,
            }}
          >
            <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "#14213D" }}
                >
                  Currency Converter
                </Text>
                <Text style={{ color: "grey", paddingTop: 15, fontSize: 12 }}>
                  Convert 150+ Currencies
                </Text>
              </View>
              <View style={{ left: 130 }}>
                <Ionicons name="cash-outline" size={25} color="#14213D" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

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
