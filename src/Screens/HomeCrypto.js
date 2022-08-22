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
import BuyAirtimeModal from "../components/BuyAirtimeModal";
import AccountBalanceModal from "../components/AccountBalanceModal";

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
          marginHorizontal: 5,
          paddingVertical: 15,
          width: 110,
          height: 160,
          justifyContent: "center",
        }}
      >
        <Ionicons name={icon} color={color} size={30} />
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: color,
            fontSize: 18,
            marginTop: 10,
            maxWidth: 80,
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
      <View>
        <Text style={{ fontSize: 27, fontWeight: "bold" }}>{displayName}</Text>
        <Text style={{ fontSize: 15, marginTop: 5 }}>Welcome Back</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Option icon="send-outline" title="Money Transfer" color="#14213D" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible1(true)}>
          <Option
            icon="phone-portrait-outline"
            title="Buy Airtime"
            color="#14213D"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible2(true)}>
          <Option icon="cash-outline" title="Account Balance" color="#14213D" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
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
              marginTop: 10,
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
                <Ionicons name="calculator-outline" size={35} color="#14213D" />
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
                <Text
                  style={{ color: "grey", paddingTop: 15, color: "#14213D" }}
                >
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
