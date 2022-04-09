import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "react-native-vector-icons";

import React, { useContext } from "react";
import Photo from "./Photo";
import Chats from "./Chats";
import { GlobalContext } from "../../context/reducers/Provider";

const Home = () => {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarLabel: () => {
            if (route.name == "photo") {
              return <Ionicons name="camera" size={20} color={colors.white} />;
            } else {
              return (
                <Text style={{ color: colors.white }}>
                  {route.name.toLocaleUpperCase()}
                </Text>
              );
            }
          },
          tabBarShowIcon: true,
          tabBarLabelStyle:{
              color: colors.white
          }, tabBarIndicatorStyle:{
              backgroundColor:colors.white
          },
          tabBarStyle:{
              backgroundColor:colors.foreground
          }
        };
      }}

      initialRouteName="chats"
    >
      <Tab.Screen name="photo" component={Photo} />
      <Tab.Screen name="chats" component={Chats} />
    </Tab.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
