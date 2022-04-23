import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { TextInput } from "react-native";

import { FlatList } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements";
import { GlobalContext } from "../context/reducers/Provider";
import { OptimizedFlatList } from "react-native-optimized-flatlist";
import { StatusBar } from "expo-status-bar";
import MyList from "../components/MyList";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import MyConnectedList from "../components/MyConnectedList";
import { StreamChat } from "stream-chat";
import { useChatContext } from "stream-chat-expo";

const ConnectedContacts = ({ navigation }) => {
  const [loading, isLoading] = useState(false);
  const [connectedContacts, setConnectedContacts] = useState([]);
  const [inMemoryContacts, setMemoryContacts] = useState([]);
  const [firebaseContacts, setFirebaseContacts] = useState([]);
  const {
    setContacts,
  } = useContext(GlobalContext);

  useEffect(() => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("phoneNumber", "!=", null));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length) {
        snapshot.docs.map((doc) => {
          //console.log(doc.data())
          const userDoc = doc.data();

          setConnectedContacts((prevUser) => [...prevUser, userDoc]);
        });
      }
    });

    return () => unsubscribe;
  }, []);


  const renderItem = ({ item }) => {
    return <MyConnectedList item={item}  />;
  };

  const searchContacts = (value) => {
    const filteredConacts = inMemoryContacts.filter((contact) => {
      let contactToLowerCase = (
        contact.firstName +
        " " +
        contact.lastName
      ).toLowerCase();

      let searchTermLowerCase = value.toLowerCase();

      return contactToLowerCase.indexOf(searchTermLowerCase) > -1;
    });

    setContacts(filteredConacts);
  };
  const getItemLayout = (data, index) => ({
    length: 50,
    offset: 20 * index,
    index,
  });
  return (
    <View style={{ flex: 1 }}>
     

      <SafeAreaView style={{ backgroundColor: "#fff" }} />
      <View style={{ borderRadius: 20, paddingTop: 10, paddingHorizontal: 10 }}>
        <TextInput
          onChangeText={(value) => searchContacts(value)}
          placeholder="Search Contact"
          placeholderTextColor="grey"
          style={{
            backgroundColor: "#fff",
            height: 50,
            fontSize: 15,
            padding: 10,
            color: "black",
            borderRadius: 20,
          }}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {loading ? (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" color="#FFA500" />
          </View>
        ) : null}
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={connectedContacts}
          renderItem={renderItem}
          initialNumToRender={50}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                marginTop: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#14213D" }}>No Contacts Found</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ConnectedContacts;

const styles = {
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#00a1f1",
  },
  containerGridLeft: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ffbb00",
  },
  containerGridRight: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#7cbb00",
  },
};
