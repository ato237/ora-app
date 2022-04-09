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
  import { GlobalContext } from "../../../context/reducers/Provider";
  import Ionicons from "react-native-vector-icons/Ionicons";
  import i18n from "../../../Data/translation";
  
  
  const DetailsCurrency = () => {
    const datas = useContext(GlobalContext);
  
    const handleClick = () => {
      setClick(true);
      console.log("Clicked on empty");
    };

    useEffect(()=>{
        axios
        .post(
          `https://orramo-backend2.herokuapp.com/api/converter/convert/1/${datas.fromCurrency.code}/${datas.toCurrency.code}`
        )
        .then((response) => {
            datas.setData2(response.data)
        })
    },[datas.fromCurrency.code,datas.toCurrency.code])
  
    return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={datas.modalVisible2}
          onRequestClose={() => {
            datas.setModalVisible2(!datas.modalVisible2);
          }}
          presentationStyle="overFullScreen"
        >
          <TouchableOpacity
          onPress={() => datas.setModalVisible2(false)}
            style={{ top: Dimensions.get("window").height - 220 , justifyContent:"center", alignItems:"center"}}
          >
            <Ionicons name="close-circle-outline" size={55} color="black" />
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={() => datas.setModalVisible2(false)}>
            <View style={styles.modalView}>
                <Text style={{color: '#C36FAB', bottom: 10}}>Conversion Rates:</Text>
              {datas.data2.map((item) => (
                <Text key={5} style={{ fontSize: 22, color: "#fff", fontWeight: "bold" }}>
                 {item.amount}{" "}{datas.fromCurrency.code} = {item.results}{" "}{datas.toCurrency.code}
                </Text>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  };
  
  export default DetailsCurrency;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    modalView: {
      height: 168,
      marginTop: 20,
      backgroundColor: "#14213D",
      borderRadius: 20,
      padding: 35,
      top: Dimensions.get("window").height - 240,
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
  