import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Dimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import { FlatList } from "react-native";
import ChatTexts from "./ChatTexts";
import { MaterialIcons } from "react-native-vector-icons";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { chatData } from "../ChatData";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { GlobalContext } from "../../../context/reducers/Provider";
import { Avatar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatRoom = ({ navigation }) => {
  const datas = useContext(GlobalContext);
  const renderItem = ({ item }) => {
    return (
      <ChatTexts
        id={item.id}
        name={item.name}
        chat={item.chat}
        seen={item.seen}
        time={item.time}
      />
    );
  };
  const [message, setMessage] = useState("");

  const [recieved, setRecieved] = useState([
    {
      id: 2,
      name: "Oliver",
      chat: "Yesailo brosolo je suis la dosai",
      seen: true,
    },
  ]);

  const [pressed, setPressed] = useState(false);
  const [pressed2, setPressed2] = useState(false);

  const onConnected = () => {
    datas.setUserData({ ...userData, connected: true });
    stompClient.subscribbe;
  };

  return (
    <View style={{ backgroundColor: "#DDDEE2", flex: 1 }}>

      <View
        style={{
          backgroundColor: "#14213D",
          padding: 15,
          flexDirection: "row",
          paddingTop:Platform.OS == "ios"? 31:11
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            size={20}
            color="#fff"
            style={{ top: 8 }}
          />
        </TouchableOpacity>
        <Avatar
          containerStyle={{ marginHorizontal: 10 }}
          size="small"
          rounded
          source={require("../../../images/Ker.jpg")}
        />
        <Text style={{ fontSize: 18, color: "white", top: 5 }}>
          {datas.title}
        </Text>
      </View>
      <View style={{ marginBottom: Platform.OS =="ios"? 150:130 }}>
        <FlatList
          inverted
          data={[...datas.dataChat].reverse()}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
            Platform.select({
               ios: () => 0,
               android: () => 200
            })()
          }
        style={{ width: "100%", position: "absolute", bottom: 0 }}
      >
        <View style={styles.container}>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInput}
              value={message}
              onChangeText={(message) => setMessage(message)}
              multiline
              placeholder={"Type a message"}
            />
            <TouchableOpacity
              style={{ alignItems: "center", top: 10, right: 10 }}
            >
              <View>
                <MaterialIcons name="attach-money" size={30} color="#31A351" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ alignItems: "center", top: 10, right: 5 }}
            >
              <View>
                <MaterialIcons name="attachment" size={30} color="#5F6368" />
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#0053C5",
              borderRadius: 50,
              justifyContent: "center",
              width: 50,
              alignItems: "center",
            }}
          >
            <MaterialIcons name="send" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    backgroundColor: "white",
  },
  inputBox: {
    backgroundColor: "#eee",
    borderRadius: 50,
    width: "82%",
    height: 50,
    marginHorizontal: 5,
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS == "ios" ? 10 : 0,
  },
  pressedEffect: {
    backgroundColor: "#CDDCF1",
    borderRadius: 100,
  },
  header: {
    backgroundColor: "#14213D",
    padding: 20,
    top: 0,
  },
});
