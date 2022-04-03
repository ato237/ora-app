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
import { GlobalContext } from "../../context/reducers/Provider";
import Ionicons from "react-native-vector-icons/Ionicons";
import i18n from "../../Data/translation";

const Details = () => {
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
          style={{ top: Dimensions.get("window").height - 300 , justifyContent:"center", alignItems:"center"}}
        >
          <Ionicons name="close-circle-outline" size={55} color="black" />
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => datas.setModalVisible(false)}>
          <View style={styles.modalView}>
            {datas.data.map((item) => (
              <Text key={5} style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>
                {datas.service == "orange"
                  ? i18n.t('orangeWithdrawal') + item.orangeCharge
                  : datas.service == "mtn"
                  ? i18n.t('mtnWithdrawal') + item.mtnCharge
                  : datas.service == "eumoney"
                  ? i18n.t('eumoneyWithdrawal') + item.euCharge
                  : null}
                {" XAF "}
              </Text>
            ))}
            {datas.data.map((item) => (
              <Text
              key={5}
                style={{
                  fontSize: 18,
                  color: "#C36FAB",
                  fontWeight: "bold",
                  marginTop: 15,
                }}
              >
                
                {i18n.t('totalToHave')}
                {datas.service == "orange"
                  ? item.orangeTotal
                  : datas.service == "mtn"
                  ? item.mtnTotal
                  : datas.service == "eumoney"
                  ? item.euTotal
                  : null}
                {" XAF "}
              </Text>
            ))}
            {datas.data.map((item) => (
              <Text
              key={5}
                style={{
                  fontSize: 18,
                  color: "#C36FAB",
                  fontWeight: "bold",
                  marginTop: 15,
                }}
              >
                Tax:{" "}
                {datas.service == "orange"
                  ? item.orangeTax
                  : datas.service == "mtn"
                  ? item.mtnTax
                  : datas.service == "eumoney"
                  ? item.euTax
                  : null}
                {" XAF "}
              </Text>
            ))}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Details;

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
    backgroundColor: "#14213D",
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
  },
});
