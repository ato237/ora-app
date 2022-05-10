import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { GlobalContext } from '../../context/reducers/Provider';
import { Modal } from 'react-native-paper';

const SendMoneyModal = () => {
    const { setModalVisible, modalVisible } = useContext(GlobalContext);

  return (
    <View style={styles.container}>
    <Modal
      animationType="fade"
      presentationStyle="overFullScreen"
      visible={true}
      onRequestClose={() => {
        setModalVisible(modalVisible);
      }}
    >
      <View
        style={{
          //padding: 50,
          zIndex: 9999,
          position: "absolute",
          bottom: 45,
          right: 35,
        }}
      >
        
      </View>
    </Modal>
  </View>
  )
}

export default SendMoneyModal

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
    },
    modalView: {
      paddingHorizontal: 25,
      paddingVertical: 15,
      top: Dimensions.get("window").height - 670,
      right: 20,
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
  });