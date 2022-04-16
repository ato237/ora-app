import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";

const MyList = ({ item }) => {
  const handleChannel = () => {
    console.log("clicked");
  };
  return (
    <View>
      <TouchableOpacity
        onPress={handleChannel}
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
              {item.firstName == null
                ? item.phoneNumbers &&
                  item.phoneNumbers[0] &&
                  item.phoneNumbers[0].number
                : item.firstName + " "}
              {item.lastName}
            </Text>
            <Text
              style={{
                color: "grey",
                fontWeight: "bold",
                fontSize: 15,
                marginHorizontal: 15,
              }}
            >
              {item.firstName &&
                item.phoneNumbers &&
                item.phoneNumbers[0] &&
                item.phoneNumbers[0].number}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(MyList);

const styles = StyleSheet.create({});
