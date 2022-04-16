import {
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useContext } from "react";
import { GlobalContext } from "../context/reducers/Provider";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OptionModal = () => {
  const navigation = useNavigation();
  const { setModalVisible, modalVisible } = useContext(GlobalContext);

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        visible={modalVisible}
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
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{
              backgroundColor: "#14213D",
              borderRadius: 100,
              alignItems: "center",
              width: 65,
              height: 65,
              justifyContent: "center",
              elevation: 10,
            }}
          >
            <MaterialIcons name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
            marginTop: 22,
            height: 50,
          }}
        >
          <TouchableOpacity style={styles.modalView}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  //textAlign: "center",
                  fontSize: 18,
                  bottom: 10,
                  marginHorizontal: 10,
                  top: 1,
                }}
              >
                Send Money
              </Text>
              <View>
                <MaterialIcons name="monetization-on" size={35} color="green" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalView}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  //textAlign: "center",
                  fontSize: 18,
                  bottom: 10,
                  marginHorizontal: 10,
                  top: 1,
                }}
              >
                New Group
              </Text>
              <View>
                <Ionicons
                  name="people-circle-outline"
                  size={35}
                  color="#14213D"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalView}
            onPress={() => {
              navigation.navigate("mycontacts");
              setModalVisible(false);
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  //textAlign: "center",
                  fontSize: 18,
                  bottom: 10,
                  marginHorizontal: 10,
                  top: 1,
                }}
              >
                New Message
              </Text>
              <View>
                <Ionicons name="chatbubbles" size={35} color="#14213D" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("contacts");
              setModalVisible(false);
            }}
            style={styles.modalView}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  //textAlign: "center",
                  fontSize: 18,
                  bottom: 10,
                  marginHorizontal: 10,
                  top: 1,
                }}
              >
                Invite Contacts
              </Text>
              <View>
                <Ionicons
                  name="person-circle-outline"
                  size={35}
                  color="#14213D"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default OptionModal;

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
