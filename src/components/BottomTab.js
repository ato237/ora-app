import { Settings, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeCalculator from "../Screens/HomeCalculator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Currency from "../Screens/CurrencyConverter";
import i18n from "../Data/translation";
import Setting from "../Screens/Setting";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;


          if (route.name === "Charges Calculator"||route.name === "Calculatrice de frais") {
            iconName = focused ? "calculator" : "calculator-outline";
            color = focused ? "#fff" : "gray"
          } else if (route.name === "Currency Converter"||route.name === "Convertisseur de Devise") {
            iconName = focused ? "cash" : "cash-outline";
            color = focused ? "#fff" : "gray"
          } else if (route.name === "Settings"||route.name === "Réglages") {
            iconName = focused ? "cog" : "cog-outline";
            color = focused ? "#fff" : "gray"

          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={25} color={color}/>;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: "#14213D",
        },
        headerStyle:{
          backgroundColor:'#14213D',
        },
        headerTitleStyle:{
          color: "white"
        },
        headerShown:false
       

      })}

    >
      <Tab.Screen name={i18n.t('tittle')} component={HomeCalculator} />
      <Tab.Screen name={i18n.t('con')} component={Currency} />
     {/* <Tab.Screen name={i18n.t('settings')} component={Setting} />*/}

    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
