import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { Avatar } from "react-native-elements";
import { useChatContext } from "stream-chat-expo";
import { GlobalContext } from "../context/reducers/Provider";

const MyConnectedList = ({ item }) => {
  const { client } = useChatContext();
  const { userData, setChannel } = useContext(GlobalContext);

  const handleChannel = async (id) => {
    console.log(id);
    console.log(userData.uid);
    const channel = client.channel("messaging", {
      members: [id, userData.uid],
    });
    setChannel(channel);
    await channel.watch();
    navigation.navigate("Channel");
  };
  return (
    <View>
      <TouchableOpacity
        onPress={()=>handleChannel(item.uid)}
        style={{ padding: 10, backgroundColor: "#F1F2F3" }}
      >
        <View style={{ flexDirection: "row" }}>
          <Avatar
            rounded
            size="medium"
            source={require("../../assets/icon-square.png")}
          />
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                color: "#000",
                fontWeight: "bold",
                fontSize: 15,
                marginHorizontal: 15,
              }}
            >
              {item.displayName}
            </Text>
            <Text
              style={{
                color: "grey",
                fontWeight: "bold",
                fontSize: 15,
                marginHorizontal: 15,
              }}
            >
              {item.phoneNumber}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(MyConnectedList);

const styles = StyleSheet.create({});
