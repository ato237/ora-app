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
import { GlobalContext } from "../../context/reducers/Provider";
import { useNavigation } from "@react-navigation/native";

const Details = () => {
  const [data, setData] = useState([]);
  const datas = useContext(GlobalContext);
  const [click, setClick] = useState(false);
  const navigation = useNavigation()

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
          style={{ top: Dimensions.get("window").height - 480 , justifyContent:"center", alignItems:"center"}}
        >
          <Ionicons name="close-circle-outline" size={55} color="black" />
        </TouchableOpacity>
          <View style={styles.modalView}>
           <TouchableOpacity onPress={()=>{navigation.navigate('sendcrypto');datas.setModalVisible(false);}} style={{justifyContent:'center',alignItems:'center',borderColor:'blue',paddingVertical:40, borderRadius:20, borderWidth:1}}>
             <Text style={{color:'black', fontSize:18, fontWeight:'bold'}}>Send To Orramo Wallet</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>{navigation.navigate('sendcrypto');datas.setModalVisible(false)}}  style={{justifyContent:'center',alignItems:'center',borderColor:'blue',paddingVertical:40, borderRadius:20, borderWidth:1, marginTop:15}}>
             <Text style={{color:'black', fontSize:18, fontWeight:'bold'}}>Send To Different Wallet</Text>
           </TouchableOpacity>
          </View>
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
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    top: Dimensions.get("window").height - 500,
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
