import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const data2 = [
  {
    key: 1,
    coin: "Bitcoin",
    symbol: "BTC",
    wallet: "$36,050",
    image: require("../../assets/opengraph.png"),
    transaction: "Buy",
  },
  {
    key: 2,

    coin: "Ethereum",
    symbol: "ETH",
    wallet: "$2,780",
    image: require("../../assets/etherum.jpg"),
    transaction: "Buy",
  },
  {
    key: 3,

    coin: "USDTTether",
    symbol: "BTC",
    wallet: "$1.00",
    image: require("../../assets/825.png"),
    sign: "+",
    transaction: "Sell",
  },

  {
    key: 4,

    coin: "Orange Money",
    symbol: "OM",
    wallet: "XAF 250,000",
    image: require("../../assets/orangemoney.png"),
    sign: "+",
    transaction: "Withdraw",
  },

  {
    key: 5,

    coin: "MTN MOMO",
    symbol: "BTC",
    wallet: "XAF 150,000",
    image: require("../../assets/mtnmomo.png"),
    transaction: "Withdraw",
  },

  {
    key: 6,

    coin: "USDTTether",
    symbol: "BTC",
    wallet: "$1.00",
    image: require("../../assets/825.png"),
    transaction: "Withdraw",
  },

  {
    key: 7,

    coin: "USDTTether",
    symbol: "BTC",
    wallet: "$1.00",
    image: require("../../assets/825.png"),
    transaction: "Withdraw",
  },

  {
    key: 8,

    coin: "USDTTether",
    symbol: "BTC",
    wallet: "$1.00",
    image: require("../../assets/825.png"),
    transaction: "Withdraw",
  },

  {
    key: 9,

    coin: "USDTTether",
    symbol: "BTC",
    wallet: "$1.00",
    image: require("../../assets/825.png"),
    transaction: "Withdraw",
  },
];
const History = () => {
  return (
    <>
      <ScrollView style={{ backgroundColor: "#F8F8FF" }}>
        {data2.map((item) => (
          <TouchableOpacity key={item.key}>
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
                    backgroundColor:
                      item.transaction == "Withdraw"
                        ? "#FFF7E8"
                        : item.transaction == "Buy"
                        ? "#E5F1FF"
                        : "#EBFFF3",
                    borderRadius: 40,
                    width: item.transaction == "Withdraw" ? 80 : 50,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 30,
                  }}
                >
                  <Text style={{ fontSize: 13, color: "#626B7D" }}>
                    {item.transaction}
                  </Text>
                </View>

                <View style={{ marginHorizontal: 5 }}>
                  <Text style={{ fontSize: 18 }}>{item.wallet}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

export default History;
const styles = StyleSheet.create({});
