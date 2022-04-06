import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "react-native-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatTexts = ({ id, name, chat, seen, time, photo, currentUser }) => {
  const [curreesgntUser, setCurrentUser] = useState("false");
  return (
    <View style={styles.container}>
      <View key={id} style={currentUser ? styles.chatArea : styles.chatArea2}>
        <View style={currentUser ? styles.senderArea : styles.recieverArea}>
            <Text
              style={
                currentUser
                  ? { color: "white" }
                  : { color: "black" }
              }
            >
              {currentUser ? chat : chat}
            </Text>
            <View style={{ flexDirection: "row",justifyContent:"flex-end" }}>

            <Text
              style={{
                color: currentUser ? "#D3D3D3" : "grey",
                fontSize: 12,
              }}
            >
              {time}
            </Text>
            {currentUser ? (
              <MaterialIcons
                name={seen ? "done-all" : "done"}
                size={15}
                color="#fff"
              />
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatTexts;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "column", // inner items will be added vertically
    flexGrow: 1, // all the available vertical space will be occupied by it
  },
  typeArea: {},
  chatArea: {
    alignItems: "flex-end",
  },
  chatArea2: {
    alignItems: "flex-start",
  },
  senderArea: {
    marginTop: 10,
    backgroundColor: "#14213D",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: 300,
    borderTopRightRadius: 0,
  },
  recieverArea: {
    marginTop: 10,

    backgroundColor: "#EEEEEE",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: 300,
    borderTopLeftRadius: 0,
  },
});
