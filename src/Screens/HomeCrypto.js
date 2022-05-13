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
import { color } from "react-native-reanimated";
import Coins from "./Coins";
import { GlobalContext } from "../context/reducers/Provider";
import { Ionicons } from "@expo/vector-icons";

const HomeCrypto = ({navigation}) => {
  const { userData } = useContext(GlobalContext);
  const [displayName, setDisplayName] = useState("");
  useEffect(() => {
    setDisplayName(userData.displayName);
  }, []);
  
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: "#F4F7FD",
        flex: 1,
      }}
    >
      <View>
        <Text style={{ fontSize: 27, fontWeight: "bold" }}>{displayName}</Text>
        <Text style={{ fontSize: 15, marginTop: 5 }}>Welcome Back</Text>
      </View>
      <View
        style={{
          backgroundColor: "#14213D",
          borderRadius: 20,
          height: 150,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <View>
          <Text style={{ color: "white", textAlign: "center" }}>
            Total Crypto Balance
          </Text>
          <Text style={{ color: "white", fontSize: 25 }}>XAF 250,000</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              paddingHorizontal: 20,
              paddingVertical: 3,
              marginHorizontal: 8,
            }}
          >
            <Text style={{ color: "black" }}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#FFA500",
              paddingHorizontal: 20,
              paddingVertical: 3,
              marginHorizontal: 8,
            }}
          >
            <Text style={{ color: "black" }}>Recieve</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('history')}>
          <Text style={{color:'#eee',fontSize:15,marginTop:10}} >View Transactions</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ marginTop: 20 }}>My Wallets</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('wallets')}>
            <View style={{backgroundColor:'white', borderRadius:10,height:80,justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingHorizontal:10,marginTop:10 }}>
                <View style={{flexDirection:'row'}}>
                <Image style={{width:40,height:40}} source={require('../../assets/etherum.jpg')}/>
                  <Image style={{width:40,height:40,right:20}} source={require('../../assets/opengraph.png')}/>
                  <Image style={{width:40,height:40,right:29}} source={require('../../assets/825.png')}/>
                </View>
                <View style={{flexDirection:'column',right:25}}>
                  <Text style={{fontSize:20}}>XAF 250,000</Text>
                  <Text style={{textAlign:'right',color:'grey'}}>$455</Text>
                </View>
            </View>
            </TouchableOpacity>
       

        <Text style={{ marginTop: 20 }}>Available Crypto Currencies</Text>

        <Coins />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeCrypto;

const styles = StyleSheet.create({});
