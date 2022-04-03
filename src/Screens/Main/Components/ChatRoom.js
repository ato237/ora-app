import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
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
import {
  GiftedChat,
  InputToolbar,
  SystemMessage,
} from "react-native-gifted-chat";

const ChatRoom = ({ navigation }) => {
  const datas = useContext(GlobalContext);
  const renderItem = ({ item }) => {
    return (
      <ChatTexts
        id={item.id}
        name={item.name}
        chat={item.message}
        seen={item.seen}
        time={item.time}
        currentUser={item.currentUser}
      />
    );
  };
  const [message, setMessage] = useState([
    { currentUser: true, id: 1, message: "Yo bro how are you" },
    { currentUser: false, id: 2, message: "I am fine bro yesailo" },
  ]);
  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderTopColor: "#E8E8E8",
          borderTopWidth: 0,
          padding: 0,
        }}
      />
    );
  };
  const customSystemMessage = (props) => {
    return (
      <View style={styles.ChatMessageSytemMessageContainer}>
        <Icon name="lock" color="#9d9d9d" size={16} />
        <Text style={styles.ChatMessageSystemMessageText}>
          Your chat is secured. Remember to be cautious about what you share
          with others.
        </Text>
      </View>
    );
  };
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View
        style={{
          backgroundColor: "#14213D",
          padding: 15,
          flexDirection: "row",
          paddingTop: Platform.OS == "ios" ? 31 : 11,
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
          source={datas.chatDatas.photos}
        />
        {datas.chatDatas.map((item) => {
          <Text style={{ fontSize: 18, color: "white", top: 5 }}>
            {item.names}
          </Text>
        })}
      </View>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderInputToolbar={(props) => customtInputToolbar(props)}
      />
      {/*<View
        style={{
          backgroundColor: "#14213D",
          padding: 15,
          flexDirection: "row",
          paddingTop: Platform.OS == "ios" ? 31 : 11,
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
      <View style={{ marginBottom: Platform.OS == "ios" ? 150 : 130 }}>
        <FlatList
          inverted
          data={message}
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
        keyboardVerticalOffset={Platform.select({
          ios: () => 0,
          android: () => 200,
        })()}
        style={{ width: "100%", position: "absolute", bottom: 0 }}
      >
        <View style={styles.container}>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textInput}
              value={text}
              onChangeText={(text) => setMessage(text)}
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
          </KeyboardAvoidingView>*/}
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
