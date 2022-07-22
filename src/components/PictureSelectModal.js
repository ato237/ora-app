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
            top: !selected
              ? Dimensions.get("window").height - 350
              : Dimensions.get("window").height - 400,
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
              Transfer Money
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
                top: !selected
                  ? Dimensions.get("window").height - 330
                  : Dimensions.get("window").height - 390,
              },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setSelected(false)}>
                <Ionicons name="arrow-back" size={25} />
              </TouchableOpacity>
              <Text style={{ left: 70, fontSize: 20, fontWeight: "bold" }}>
                Orange Money
              </Text>
            </View>

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
                Vers Client Orange
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
                Vers Client Non-Orange
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
                Vers Autres Reseau
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
