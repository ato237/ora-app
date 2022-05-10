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

const data = [
  {
    key: 1,
    coin: "Bitcoin",
    symbol: "BTC",
    wallet: "$5,000",
    image: require("../../assets/opengraph.png"),
  },
  {
    key: 2,

    coin: "Ethereum",
    symbol: "ETH",
    wallet: "$2,100",
    image: require("../../assets/etherum.jpg"),
  },
  {
    key: 3,

    coin: "USDTTether",
    symbol: "BTC",
    wallet: "$1,000",
    image: require("../../assets/825.png"),
  },
];

const HomeCrypto = () => {
  const { userData } = useContext(GlobalContext);
  const [displayName, setDisplayName] = useState("");
  useEffect(() => {
    setDisplayName(userData.displayName);
  }, []);
  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View
        style={{
          marginTop: 15,
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: 20,
          paddingVertical: 23,
          paddingHorizontal: 15,
          width: 160,
          marginRight: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0.5 },
          shadowOpacity: 0.1,
          shadowRadius: 0.5,
        }}
      >
        <View>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>{item.coin}</Text>
          <Text style={{ fontSize: 15, color: "grey" }}>{item.symbol}</Text>
          <Text style={{ marginTop: 18, fontSize: 18 }}>{item.wallet}</Text>
        </View>
        <View
          style={{
            marginHorizontal:
              item.coin == "Bitcoin" ? 35 : item.coin == "Ethereum" ? 20 : 7,
          }}
        >
          <Image style={{ width: 33, height: 33 }} source={item.image} />
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: "#F8F8FF",
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
          <Text style={{ color: "white", fontSize: 25 }}>XAF 250,000,000</Text>
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
            <Text style={{ color: "black" }}>Buy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#FFA500",
              paddingHorizontal: 20,
              paddingVertical: 3,
              marginHorizontal: 8,
            }}
          >
            <Text style={{ color: "black" }}>Sell</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ marginTop: 20 }}>My Portfolio</Text>

        <FlatList
          horizontal={true}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />

        <Text style={{ marginTop: 20 }}>Available Crypto Currencies</Text>

        <Coins />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeCrypto;

const styles = StyleSheet.create({});
