import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "react-native-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatTexts = ({ id, name, chat, seen, time, photo }) => {
  return (
    <View style={styles.container}>
      <View key={id} style={name == "me" ? styles.chatArea : styles.chatArea2}>
        <View style={name == "me" ? styles.senderArea : styles.recieverArea}>
          <Text style={name == "me" ? { color: "white" } : { color: "black" }}>
            {chat}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 8 }}>
            {name == "me" ? (
              <MaterialIcons
                name={seen ? "done-all" : "done"}
                size={15}
                color="#fff"
                style={{ width: 50 }}
              />
            ) : null}
            <Text
              style={{ color: name == "me" ? "#B0B5BE" : "grey", fontSize: 12 }}
            >
              10:30Am
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatTexts;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
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
    backgroundColor: "#083F91",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: 300,
    shadowColor: "#171717",
    borderBottomRightRadius: 0,
  },
  recieverArea: {
    marginTop: 10,
 
    backgroundColor: "#CDDCF1",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: 300,
    shadowColor: "#171717",

    borderTopLeftRadius: 0,

  },
});
