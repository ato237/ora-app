import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, {
  useContext,
  useState,
} from "react";
import { TextInput } from "react-native";
import { GlobalContext } from "../context/reducers/Provider";
import { OptimizedFlatList } from "react-native-optimized-flatlist";
import MyList from "../components/MyList";
import { SafeAreaView } from "react-native-safe-area-context";

const Contactss = () => {
  const [loading, isLoading] = useState(false);

  const { loadContacts, contacts, inMemoryContacts, setContacts } =
    useContext(GlobalContext);


  const renderItem = ({ item }) => {
    return <MyList item={item} />;
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
      <View style={{borderRadius:20, paddingTop: 10, paddingHorizontal:10}}>
      <TextInput
        onChangeText={(value) => searchContacts(value)}
        placeholder="Search Contact"
        placeholderTextColor="grey"
        style={{
          backgroundColor: "#fff",
          height: 50,
          fontSize: 15,
          padding: 10,
          color: "black",borderRadius:20
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
        <OptimizedFlatList
          keyExtractor={(item, index) => index.toString()}
          data={contacts}
          initialNumToRender={50}
          renderItem={renderItem}
        
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

export default Contactss;

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
