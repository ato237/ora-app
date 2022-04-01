import { Dimensions, Platform, Settings, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeCalculator from "../Screens/Calculators/HomeCalculator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Currency from "../Screens/Calculators/CurrencyConverter";
import i18n from "../Data/translation";
import Setting from "../Screens/Main/Setting";
import Accounts from "../Screens/Main/Accounts";
import ChatSend from "../Screens/Main/ChatSend";
import Settingss from "../Screens/Main/Setting";
import { GlobalContext } from "../context/reducers/Provider";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const datas = useContext(GlobalContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Account" || route.name === "Compte") {
            iconName = focused ? "wallet" : "wallet-outline";
            color = focused ? "#fff" : "#D3D3D3";
          } else if (
            route.name === "Chat & Send" ||
            route.name === "Discutez & Envoyez"
          ) {

            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
            color = focused ? "#fff" : "#D3D3D3";
          } else if (route.name === "Me" || route.name === "Moi") {

            iconName = focused ? "person" : "person-outline";
            color = focused ? "#fff" : "#D3D3D3";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={31} color={color} />;
        },
        headerShown:false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#D3D3D3",
        tabBarStyle: {
          backgroundColor: "#14213D",

        },
        headerStyle: {
          backgroundColor: "#14213D",
        },
        headerTitleStyle: {
          color: "white",
        },
      })}
    >
      <Tab.Screen name="Account" component={Accounts} />
      <Tab.Screen name="Chat & Send" component={ChatSend} />
      <Tab.Screen name="Me" component={Settingss} />

      {/* <Tab.Screen name={i18n.t('settings')} component={Setting} />*/}
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
