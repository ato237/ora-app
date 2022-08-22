import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GlobalContext } from "../context/reducers/Provider";
import { useNavigation } from "@react-navigation/native";

const BuyAirtimeModal = ({ modalVisible, setModalVisible }) => {
  const [data, setData] = useState([]);
  const [click, setClick] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setClick(true);
    console.log("Clicked on empty");
  };

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        presentationStyle="overFullScreen"
      >
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{
            top: Dimensions.get("window").height - 350,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="close-circle-outline" size={55} color="black" />
        </TouchableOpacity>
        {!selected ? (
          <View style={styles.modalView}>
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
            >
              Buy Airtime
            </Text>
            <TouchableOpacity
              onPress={() => setSelected(true)}
              style={{
                backgroundColor: "#14213D",
                padding: 20,
                borderRadius: 12,
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                ORANGE MONEY
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#14213D",
                padding: 20,
                borderRadius: 12,
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                MTN MOBILE MONEY
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={[
              styles.modalView,
              {
                top: Dimensions.get("window").height - 330,
              },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setSelected(false)}>
                <Ionicons name="arrow-back" size={25} />
              </TouchableOpacity>
              <Text style={{ left: 70, fontSize: 20, fontWeight: "bold" }}>
                ORANGE MONEY
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#14213D",
                padding: 20,
                borderRadius: 12,
                marginTop: 15,
              }}
              onPress={() => {
                navigation.navigate("airtime",{
                  operation: 'myself'
                }), setModalVisible(false);
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                For Myself
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("airtime",{
                  operation:'someelse'
                }), setModalVisible(false);
              }}
              style={{
                backgroundColor: "#14213D",
                padding: 20,
                borderRadius: 12,
                marginTop: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                For Someone Else
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </View>
  );
};

export default BuyAirtimeModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    height: "50%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    top: Dimensions.get("window").height - 330,
  },
  pics: {
    borderWidth: 3,
    padding: 20,
    borderRadius: 70,
    height: 90,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#0053C5",
    margin: 30,
  },
});
