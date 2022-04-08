import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import { DataSnapshot } from "firebase/database";
import { GlobalContext } from "../../../context/reducers/Provider";
import { MaterialIcons } from "react-native-vector-icons";

const GiftedChatRoom = ({ route, navigation }) => {
  const [messages, setMessages] = useState([]);
  const { idP, nameP, photoP } = route.params;
  const datas = useContext(GlobalContext);

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            size={20}
            color="#fff"
            style={{ top: 1 }}
          />
          <Avatar
            containerStyle={{ marginHorizontal: 10 }}
            size="medium"
            rounded
            source={{ uri: photoP }}
          />
        </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              marginRight: 10,
            }}
          >
              <View style={{}}>
            <Text style={{color:'white', fontSize:20}}>{nameP}</Text>
            <Text style={{color:'white', fontSize:12}}>Online</Text>
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default GiftedChatRoom;

const styles = StyleSheet.create({});
