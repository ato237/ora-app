import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

const VirtualCards = () => {
  const[click, isClicked] = useState(false);
  const[cardNumber, setCardNumber] = useState("")
  return (
    <View>
      <View>
        <TouchableHighlight>
          <Text>Tap on the plus button to create your card</Text>
          <Text>{cardNumber}</Text>
        </TouchableHighlight>o
        <View>
          <TouchableOpacity 
          onPress={()=>newToaou()}
          >
            <Text>Button</Text>
            <Feather name="activity" size={25}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VirtualCards;

const styles = StyleSheet.create({});
