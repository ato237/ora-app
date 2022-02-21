import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./Home";
import Ionicons from "react-native-vector-icons/Ionicons";
import History from "../Screens/History";
import Share from "../Screens/Share";

const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;


          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            color = focused ? "#fff" : "gray"
          } else if (route.name === "History") {
            iconName = focused ? "list" : "list-outline";
            color = focused ? "#fff" : "gray"
          } else if (route.name === "Share") {
            iconName = focused ? "share-social" : "share-social-outline";
            color = focused ? "#fff" : "gray"

          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={20} color={color}/>;
        },
      
      })}

      initialRouteName="Home"
      activeColor="#fff"
      inactiveColor="gray"
      barStyle={{ backgroundColor: '#14213D' }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Share" component={Share} />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
