import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import picture from "../../images/ATO.jpg";
import pic3 from "../../images/Ker.jpg";
import pic2 from "../../images/Oli.jpg";

import Feature from "./Components/Feature";
import { Ionicons } from "react-native-vector-icons";
import { MaterialIcons } from "react-native-vector-icons";
import HomeContactsSection from "./Components/HomeContactsSection";

const Accounts = ({ navigation }) => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#14213D" barStyle="light-content" />

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.amountContainer}>
            <View style={styles.amountTitle}>
              <Text style={{ color: "white", fontSize: 22 }}>Account</Text>
            </View>
            <Text style={{ color: "grey", paddingHorizontal: 10, top: 10 }}>
              Current Balance:
            </Text>

            <View style={styles.amountContent}>
              <Text style={{ fontSize: 25, fontWeight: "bold", width: "75%" }}>
                XAF 5,000,000
              </Text>
              <TouchableOpacity
                style={styles.viewStyle}
                onPress={() => navigation.navigate("History")}
              >
                <Text style={{ fontSize: 22, color: "#fff" }}>View</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 22,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  bottom: 10,
                  color: "#0053C5",
                  fontWeight: "bold",
                }}
              >
                TOP UP ACCOUNT
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 21, paddingHorizontal: 25, top: 15 }}>
            Services
          </Text>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              {/**Send Money Button */}
              <Feature
                title="Charges Calculator"
                icon="calculator"
                sizes={70}
                link="Charges Calculator"
              />
              <Feature
                title="Currency Converter"
                icon="cash"
                sizes={70}
                link="Currency Converter"
              />

              <Feature
                title="Buy Airtime"
                icon="receipt"
                sizes={65}
                link="airtime"
              />
              <Feature
                title="Virtual Cards"
                icon="card"
                sizes={65}
                link="virtualCards"
              />
              {/**Send Money Button */}
            </View>
          </View>
          <View
            style={{
              ...styles.amountContainer,
              ...{ height: Platform.OS == "ios" ? 160 : 180 },
            }}
          >
            <View style={styles.amountTitle}>
              <Text style={{ color: "white", fontSize: 20 }}>Top Chat</Text>
            </View>
            <TouchableOpacity>
              <Text
                style={{
                  color: "#083F91",
                  fontSize: 12,
                  paddingHorizontal: 10,
                  top: 5,
                }}
              >
                10:30 AM
              </Text>

              <View style={styles.chatContainer}>
                <View
                  style={{
                    position: "absolute",
                    flexDirection: "row",
                    right: Dimensions.get("window").width - 165,
                    top: 10,
                  }}
                >
                  <Avatar
                    containerStyle={{ right: 59 }}
                    size="medium"
                    rounded
                    source={pic3}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      paddingHorizontal: 10,
                      left: -5,
                      position: "absolute",
                    }}
                  >
                    KerryAnne
                  </Text>
                </View>
                <Text
                  style={{ fontWeight: "bold", color: "#31A351", bottom: 38 }}
                >
                  <Text style={{ color: "#B0B5BE" }}>Recent: </Text>
                  XAF 15,000,000
                </Text>
              </View>
              <Text style={{ left: 70, bottom: 12 }}>
                I've recieved the money I am so ha...
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.amountContainer,
              ...{ height: Platform.OS == "ios" ? 160 : 180, marginBottom: 20 },
            }}
          >
            <View style={styles.amountTitle}>
              <Text style={{ color: "white", fontSize: 20 }}>Latest Chat</Text>
            </View>
            <TouchableOpacity>
              <Text
                style={{
                  color: "#083F91",
                  fontSize: 12,
                  paddingHorizontal: 10,
                  top: 5,
                }}
              >
                12:30 AM
              </Text>

              <View style={styles.chatContainer}>
                <View
                  style={{
                    position: "absolute",
                    flexDirection: "row",
                    right: Dimensions.get("window").width - 165,
                    top: 10,
                  }}
                >
                  <Avatar
                    containerStyle={{ right: 59 }}
                    size="medium"
                    rounded
                    source={pic2}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      paddingHorizontal: 10,
                      left: -5,
                      position: "absolute",
                    }}
                  >
                    Oliver
                  </Text>
                </View>
                <Text style={{ fontWeight: "bold", color: "blue", bottom: 38 }}>
                  <Text style={{ color: "#B0B5BE" }}>Recent: </Text>
                  XAF 5,000
                </Text>
              </View>
              <Text style={{ left: 70, bottom: 12 }}>
                Yo bro I've sent the money for market...
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  amountContainer: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    backgroundColor: "white",
    marginTop: 20,
    marginHorizontal: 25,
    borderRadius: 10,
    height: Platform.OS == "ios" ? 180 : 200,
  },
  amountTitle: {
    padding: 15,
    backgroundColor: "#14213D",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomWidth: 1,
  },
  amountContent: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
  },
  viewStyle: {
    backgroundColor: "#626B7D",
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
    bottom: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  chatContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    top: 10,
  },
});
