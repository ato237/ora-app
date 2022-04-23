import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import i18n from "../Data/translation";
import { GlobalContext } from "../context/reducers/Provider";

const PictureSelectModal = ({ cameraSubmit, imageSubmit }) => {
  const [data, setData] = useState([]);
  const datas = useContext(GlobalContext);
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(true);
    console.log("Clicked on empty");
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={datas.modalVisible}
        onRequestClose={() => {
          datas.setModalVisible(!datas.modalVisible);
        }}
        presentationStyle="overFullScreen"
      >
        <TouchableOpacity
          onPress={() => datas.setModalVisible(false)}
          style={{
            top: Dimensions.get("window").height - 300,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="close-circle-outline" size={55} color="black" />
        </TouchableOpacity>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.pics} onPress={cameraSubmit}>
            <Ionicons name="camera-outline" size={40} color="#0053C5" />
          </TouchableOpacity>
          <Text>       </Text>
          <TouchableOpacity style={styles.pics} onPress={imageSubmit}>
            <Ionicons name="image-outline" size={40} color="#0053C5" />
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
    height: "100%",
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    top: Dimensions.get("window").height - 320,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
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
