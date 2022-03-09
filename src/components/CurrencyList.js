import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { memo, useState, useContext } from "react";
import data from "./countries";
import { Avatar } from "react-native-elements";
import { GlobalContext } from "../context/reducers/Provider";
import { useNavigation } from "@react-navigation/native";
import i18n from "../Data/translation";

const Item = ({ name, code, currencyName, flag }) => {
  navigation = useNavigation();

  const datas = useContext(GlobalContext);

  const handleCurrency = () => {
    datas.from
      ? datas.setFromCurrency({ name, code, currencyName, flag })
      : datas.setToCurrency({ name, code, currencyName, flag });

    navigation.navigate(i18n.t("con"));
  };
  return (
    <TouchableOpacity style={styles.entity} onPress={handleCurrency}>
      <Avatar
        rounded
        source={{ uri: `data:image/gif;base64,${flag}` }}
        size="small"
      />
      <Text
        style={{
          fontSize: 25,
          color: "#14213D",
          fontWeight: "bold",
          paddingLeft: 15,
        }}
      >
        {code}
      </Text>
      <Text style={{ fontSize: 18, marginHorizontal: 10, top: 4 }}>
        {" "}
        {name}
      </Text>

      <Text style={{ fontSize: 18, marginHorizontal: -5, top: 4 }}>
        {currencyName}
      </Text>
    </TouchableOpacity>
  );
};

const CurrencyList = () => {
  const [Search, setSearch] = useState("");
  const [filterData, setFilterData] = useState(data);
  const [masterData, setMasterData] = useState(data);
  const datas = useContext(GlobalContext);

  const renderItem = ({ item }) => (
    <Item
      flag={item.flag}
      code={item.currency.code}
      name={item.name}
      currencyName={item.currency.name}
    />
  );

  const ItemSeperator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          borderColor: "grey",
          borderWidth: 0.5,
        }}
      />
    );
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.currency.code
         
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    }
    else{
      setFilterData(masterData);
      setSearch(text);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.TextInputStyle}
        placeholder="Search currency code"
        value={Search}
        underlineColorAndroid="transparent"
        onChangeText={(text) => searchFilter(text)}
      />
      <FlatList
        data={filterData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        maxToRenderPerBatch={15}
        updateCellsBatchingPeriod={20}
        initialNumToRender={15}
        ItemSeparatorComponent={ItemSeperator}
      />
    </View>
  );
};

export default memo(CurrencyList);

const styles = StyleSheet.create({
  entity: {
    padding: 10,
    flexDirection: "row",
  },
  TextInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "white",
  },
});
