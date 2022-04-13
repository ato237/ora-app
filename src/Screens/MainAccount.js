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
  import React, { useContext, useEffect } from "react";
  import { TouchableOpacity } from "react-native";
  import { Avatar } from "react-native-elements";
  import Feature from "../components/Feature";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import numbro from "numbro";
import { GlobalContext } from "../context/reducers/Provider";
import { useNavigation } from "@react-navigation/native";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { setUserDataAsync } from "expo-facebook";
  
  const MainAccount = () => {
    navigation = useNavigation();
    const datas = useContext(GlobalContext);
    const {
        theme: { colors },
        userData,setUserData,id
      } = useContext(GlobalContext);

      useEffect(async () => {
        const unsubscribe = onSnapshot(doc(db, "users", userData.uid), (querySnapshot) => {
            setUserData(querySnapshot.data());
        });
        return () => unsubscribe();
      }, []);
    return (
      <View style={{flex:1, backgroundColor:"white"}}>
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
                  {numbro(userData.AccountBalance).format({
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
          </View>
        </ScrollView>
      </View>
    );
  };
  
  export default MainAccount;
  
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