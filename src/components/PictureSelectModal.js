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

const PictureSelectModal = ({ modalVisible, setModalVisible }) => {
  const [data, setData] = useState([]);
  const datas = useContext(GlobalContext);
  const [click, setClick] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setClick(true);
    console.log("Clicked on empty");
  };

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
          <View style={styles.modalView}>
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
            >
              Transfer Money
            </Text>
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
        </Modal>
       
    </View>
  );
};

export default PictureSelectModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    height: "40%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    top: Dimensions.get("window").height - 330,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
