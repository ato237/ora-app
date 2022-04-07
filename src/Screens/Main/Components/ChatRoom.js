import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Dimensions,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
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
import { push, set } from "firebase/database";

const ChatRoom = ({ route, navigation }) => {
  const { idP, nameP, photoP } = route.params;

  const datas = useContext(GlobalContext);
  const flatlistRef = useRef();
  const onPressFunction = () => {
    flatlistRef.current.scrollToEnd({ animating: true });
  };
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
  useEffect(() => {
    onPressFunction();
  }, []);
  const [newMessage, setNewMessage] = useState([
    {
      currentUser: true,
      id: 1,
      message: "Yo bro how are you",
      time: "10:30Am",
    },
    {
      currentUser: true,
      id: 3,
      message: "Yo bro how are you",
      time: "08:30Am",
    },

    {
      currentUser: false,
      id: 2,
      message: "I am fine bro yesailo",
      time: "09:30Am",
    },
  ]);
  const [message, setMessage] = useState(newMessage);
  const [id, setId] = useState(4);
  const handleMessageSend = () => {
    setText("");
    setId(id + 1);
    var newArr = [
      ...newMessage,
      {
        currentUser: true,
        id: id,
        message: text,
        time: "09:30Am",
      },
    ];
    setMessage(newArr);
    setNewMessage(newArr);
  };


  const [text, setText] = useState("");
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
          size="medium"
          rounded
          source={{uri:photoP}}
        />
        <TouchableOpacity style={{ width: 300 }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 18, color: "white" }}>{nameP}</Text>
            <Text style={{ color: "#EEEEEE", top: 1, fontSize: 15 }}>
              Online
            </Text>
          </View>
        </TouchableOpacity>
      </View>


      <View style={{ marginBottom: Platform.OS == "ios" ? 150 : 130 }}>
        <FlatList
          onContentSizeChange={() => flatlistRef.current.scrollToEnd()}
          ref={flatlistRef}
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
              onChangeText={(text) => setText(text)}
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
            onPress={() => {
              text !== "" ? handleMessageSend() : null;
              onPressFunction();
            }}
            style={{
              backgroundColor: "#14213D",
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
