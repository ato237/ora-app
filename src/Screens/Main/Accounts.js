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
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import picture from "../../images/ATO.jpg";
import pic3 from "../../images/Ker.jpg";
import pic2 from "../../images/Oli.jpg";
import Feature from "./Components/Feature";
import { GlobalContext } from "../../context/reducers/Provider";
import Ionicons from "react-native-vector-icons/Ionicons";
import numbro from "numbro";

const Accounts = ({ navigation }) => {
  const datas = useContext(GlobalContext);

  return (
    <View>
     <View
        style={{
          backgroundColor: "#14213D",
          padding: Platform.OS == "ios" ? 25 : 15,
          justifyContent: "center",
          alignItems: "center",
          flexDirection:'row'
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            top: Platform.OS == "ios" ? 10 : 0,
          }}
        >
          Orramo
        </Text>
        <TouchableOpacity
          style={{
            borderRadius: 1000,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            zIndex: 999,
            top: Platform.OS == "ios" ? 10 : -8,
            right: 0,
            margin: 20,
          }}
        >
          <Ionicons name="add-circle-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginBottom:50}}>
        <View style={styles.container}>
          <View style={styles.amountContainer}>
            <View style={styles.amountTitle}>
              <Text style={{ color: "white", fontSize: 22 }}>Overview</Text>
            </View>
            <Text style={{ color: "grey", paddingHorizontal: 10, top: 10 }}>
              Current Balance:
            </Text>

            <View style={styles.amountContent}>
              <Text style={{ fontSize: 25, fontWeight: "bold", width: "75%" }}>
                {numbro(datas.userData.AccountBalance).format({
                thousandSeparated: true,
                mantissa: 0, // number of decimals displayed
              })} XAF
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
                color ="#5662F6"
              />
              <Feature
                title="Currency Converter"
                icon="cash"
                sizes={70}
                link="Currency Converter"
                color ="#FFA500"

              />

              <Feature
                title="Buy Airtime"
                icon="receipt"
                sizes={65}
                link="airtime"
                color ="#0053C5"

              />
              <Feature
                title="Virtual Cards"
                icon="card"
                sizes={65}
                link="virtualCards"
                color ="#FF0101"

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
                    source={{ uri: datas.userData.picture }}
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
                    {datas.userData.firstName}
                  </Text>
                </View>
                <Text
                  style={{ fontWeight: "bold", color: "#0053C5", bottom: 38 }}
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
                <Text
                  style={{ fontWeight: "bold", color: "#0053C5", bottom: 38 }}
                >
                  <Text style={{ color: "#B0B5BE" }}>Recent: </Text>
                  XAF 10,000,000
                </Text>
              </View>
              <Text style={{ left: 70, bottom: 12 }}>
                Yo ATO you are the best thanks for the ...
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
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