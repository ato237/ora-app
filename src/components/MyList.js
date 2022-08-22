import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../context/reducers/Provider";

const MyList = ({ item }) => {
  navigation = useNavigation();
  const {setNumber} = useContext(GlobalContext)
  const handleChannel = () => {
   item.phoneNumbers.map(num => {
    if(Platform.OS === "ios")
    setNumber(num.digits);
    else
    setNumber(num.number);
   })
   navigation.goBack("Transfer Money");

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
