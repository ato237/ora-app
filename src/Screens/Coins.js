import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const data2 = [
  {
    key: 1,
    coin: "Bitcoin",
    symbol: "BTC",
    wallet: "$36,050",
    image: require("../../assets/opengraph.png"),
    sign: "+",
    percentage: "1.15",
  },
  {
    key: 2,

    coin: "Ethereum",
    symbol: "ETH",
    wallet: "$2,780",
    image: require("../../assets/etherum.jpg"),
    sign: "-",
    percentage: "2.15",
  },
  {
    key: 3,

    coin: "USDTTether",
    symbol: "USDT",
    wallet: "$1.00",
    image: require("../../assets/825.png"),
    sign: "+",
    percentage: "0.00",
  },
];
const Coins = () => {
  const navigation = useNavigation();
  return (
    <>
      {data2.map((item) => (
        <TouchableOpacity key={item.key} onPress={()=>navigation.navigate('Available Currency Page',{
          coin: item.coin,
          symbol: item.symbol,
          wallet: item.wallet,
          image:item.image
        })}>
          <View
            style={{
              backgroundColor: "white",
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
            <View>
              <Image style={{ width: 33, height: 33 }} source={item.image} />
            </View>
            <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {item.coin}
                </Text>
                <Text style={{ color: "grey" }}>{item.symbol}</Text>
              </View>
              <View
                style={{
                  width:
                    item.symbol == "BTC"
                      ? "50%"
                      : item.symbol == "ETH"
                      ? "48%"
                      : "45%",
                }}
              ></View>
              <View
                style={{ alignItems: "flex-end", alignContent: "flex-end" }}
              >
                <Text style={{ fontSize: 18 }}>{item.wallet}</Text>
                <Text
                  style={
                    item.sign == "+" ? { color: "blue" } : { color: "red" }
                  }
                >
                  {item.sign}
                  {item.percentage}%
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default Coins;
const styles = StyleSheet.create({});
