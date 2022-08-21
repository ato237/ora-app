import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const AvailableCurrencypage = ({ route, navigation }) => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let fullDate = `${day}.${month}.${year}`;

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#fff", padding: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginBottom: 20 }}
        >
          <Ionicons name="arrow-back-outline" size={25} />
        </TouchableOpacity>
        <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              style={{ width: 30, height: 30 }}
              source={route.params.image}
            />

            <Text
              style={{
                fontSize: 15,
                marginTop: 8,
                marginHorizontal: 10,
                color: "grey",
              }}
            >
              {route.params.symbol}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              marginTop: 15,
              color: "#14213D",
            }}
          >
            {route.params.wallet}
          </Text>
          <View>
            <Text
              style={{
                alignItems: "flex-end",
                justifyContent: "flex-end",
                marginTop: 5,
              }}
            >
              {fullDate}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#000",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 70, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 50, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <View style={{ paddingTop: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Statics</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ paddingTop: 25 }}>Current Price</Text>
            <Text style={{ paddingTop: 25 }}>{route.params.wallet}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ paddingTop: 25 }}>Market Price</Text>
            <Text style={{ paddingTop: 25 }}>$1,400</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ paddingTop: 25 }}>Volume Cap</Text>
            <Text style={{ paddingTop: 25 }}>$1,424,242,242</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ paddingTop: 25 }}>Available Supply</Text>
            <Text style={{ paddingTop: 25 }}>$17,422,242</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ paddingTop: 25 }}>Max Supply</Text>
            <Text style={{ paddingTop: 25 }}>$2,232,242,424</Text>
          </View>

          <View style={{ paddingTop: 20, justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#3D5BD7",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 150,
                paddingVertical: 15,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  width: 100,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Buy {route.params.symbol}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AvailableCurrencypage;

const styles = StyleSheet.create({});
