import { StyleSheet, Text, View, Dimensions, ScrollView, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../../../context/reducers/Provider";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "react-native-elements/dist/config";
import { child, push,ref, set } from "firebase/database";
import { database, db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";

const Chats = ({
  id,
  name,
  chat,
  unreadMessages,
  recentAmount,
  recentCurrency,
  time,
  photo,
}) => {
  navigation = useNavigation();
  const auth = getAuth();

  const [pressed, setPressed] = useState(false);
  const datas = useContext(GlobalContext);

  


useEffect(()=>{


},[])
  return (
    <View style={styles.contain}>
      <View
        key={id}
        style={{
          ...styles.amountContainer,
          ...{ height: Platform.OS == "ios" ? 85 : 95 },
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setPressed(false)}
          onPressIn={() => setPressed(true)}
          onPress={() => {
            navigation.navigate("ChatSendGifted", {
              idP:id,
              nameP: name,
              photoP: photo,
            });
          }}
        >
          <View style={{ backgroundColor: pressed ? "#CDDCF1" : "#fff" }}>
            <Text
              style={{
                fontWeight: "bold",
                color: "#0053C5",
                top: 18,
                left: 80,
                fontSize: 12,
              }}
            >
              <Text style={{ color: "#B0B5BE" }}>Total: </Text>
              <Text>{recentCurrency}</Text> {recentAmount}
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
                <Image
                 style={{ right: 95, bottom: 15,width: 60, height: 60, borderRadius: 60/ 2 }}
                
                  source={{uri: photo}}
                />
                <Text
                  style={{
                    fontSize: 17,
                    paddingHorizontal: 10,
                    left: -35,
                    position: "absolute",
                    color: "#000",
                    top:-2
                  }}
                >
                  {name}
                </Text>
              </View>

              <Text
                style={{
                  color: "#083F91",
                  fontSize: 12,
                  paddingHorizontal: 10,
                  bottom: 20,
                }}
              >
                {time}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  left: 80,
                  bottom: 13,
                  color: "#5F6368",
                }}
              >
                {chat.length > 41 ? chat.substring(0, 41 - 3) + "..." : chat}
              </Text>
              {unreadMessages > 0 ? (
                <View
                  style={{
                    backgroundColor: "#083F91",
                    color: "white",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center",
                    fontSize: 14,
                    borderRadius: 1500,
                    width: 23,
                    height: 23,
                    left: Dimensions.get("window").width - 50,
                    bottom: 15,
                    position: "absolute",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 11 }}>
                    {unreadMessages}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  contain: { flex: 1, backgroundColor: "white" },
  chatContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    top: 10,
  },
  amountContainer: {
    backgroundColor: "white",
    height: Platform.OS == "ios" ? 180 : 200,
    borderBottomColor: "#EFEFEF",
    borderBottomWidth: 1,
  },
  amountTitle: {
    padding: 15,
    backgroundColor: "#14213D",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomWidth: 1,
  },
});
