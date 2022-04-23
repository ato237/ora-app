import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import {
  AttachButton,
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Streami18n,
  useAttachmentPickerContext,
  useChannelPreviewDisplayAvatar,
  useChannelPreviewDisplayName,
  useChannelPreviewDisplayPresence,
  useMessageInputContext,
} from "stream-chat-expo";
import { GlobalContext } from "../context/reducers/Provider";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatHeader = () => {
  const navigation = useNavigation();
  const { channel } = useContext(GlobalContext);
  const [displayName, setDisplayName] = useState(
    channel != null ? useChannelPreviewDisplayName(channel) : "name"
  );
  const [avatar, setAvatar] = useState(
    channel != null
      ? useChannelPreviewDisplayAvatar(channel)
      : [
          {
            id: "",
            image: "",
          },
        ]
  );
  const [statusOnline, setStatusOnline] = useState(
    channel != null ? useChannelPreviewDisplayPresence(channel) : null
  );

  return (
    <SafeAreaView style={{ flexDirection: "row" }}>
      <View
        style={{
          backgroundColor: Platform.OS == "ios" ? "#fff" : "#14213D",
          flexDirection: "row",
          justifyContent: "center",
          padding: 8,
          borderBottomWidth: 0.3,
          borderBottomColor: "#eee",
          alignItems: "center",
        }}
      >
        <View
          style={{
            right: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ paddingHorizontal: 10,left:10 }}
            onPress={() => navigation.navigate("home")}
          >
            <Ionicons
              name="arrow-back-outline"
              color={Platform.OS == "android" ? "white" : "black"}
              size={25}
            />
          </TouchableOpacity>
          <Avatar
            containerStyle={{ marginHorizontal: 10 }}
            size="small"
            rounded
            source={{ uri: avatar.image }}
          />
          <TouchableOpacity style={{ width: 300 }}>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontSize: 15,
                  color: Platform.OS == "ios" ? "black" : "white",
                }}
              >
                {displayName}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={{ right: 60, top: 5 }}>
        <MaterialIcons
          name="request-quote"
          color={Platform.OS == "android" ? "#fff" : "#14213D"}
          size={25}
          //color="#FFA500"
        />
        <Text
          style={{
            color: Platform.OS == "android" ? "#fff" : "#14213D",
            fontSize: 10,
          }}
        >
          Send
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({});
