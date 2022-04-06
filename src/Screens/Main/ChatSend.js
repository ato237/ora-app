import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import pic3 from "../../images/Ker.jpg";
import { chatData } from "./ChatData";
import { FlatList } from "react-native";
import Chats from "./Components/Chats";
import { GlobalContext } from "../../context/reducers/Provider";
import Ionicons from "react-native-vector-icons/Ionicons";

const ChatSend = () => {
  const datas = useContext(GlobalContext);

  const renderItem = ({ item }) => {
    return (
      <Chats
        id={item.id}
        name={item.name}
        chat={item.chat}
        unreadMessages={item.unreadMessages}
        recentAmount={item.recentAmount}
        recentCurrency={item.recentCurrency}
        time={item.time}
        photo={item.photo}
      />
    );
  };

  return (
    <View style={styles.contain}>
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
          Chat & Send
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

      <View style={{ marginBottom: Platform.OS =="ios"? 150:120 }}>
        <FlatList
          data={datas.dataChat}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default ChatSend;

const styles = StyleSheet.create({
  contain: {},
});
