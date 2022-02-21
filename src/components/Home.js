import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import OrangeMoney from "../Screens/OrangeMoney";
import MobileMoney from "../Screens/MobileMoney";
import EUMoney from "../Screens/EUMoney";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();
const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, color: "#fff" },
        tabBarIconStyle:{color: "#fff"},
        tabBarStyle: {
          backgroundColor: "#14213D",
        },
        tabBarIndicatorStyle: { backgroundColor: '#FFA500', height: '5%' }
      }}
    >
      <Tab.Screen name="Orange Money" component={OrangeMoney} />
      <Tab.Screen name="MTN MOMO" component={MobileMoney} />
      <Tab.Screen name="EU Money" component={EUMoney} />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
