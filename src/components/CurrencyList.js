import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { memo, useState, useContext } from "react";
import AppLoading from 'expo-app-loading';
import data from "./countries";
import { Avatar } from "react-native-elements";
import { GlobalContext } from "../context/reducers/Provider";
import { useNavigation } from "@react-navigation/native";
import i18n from "../Data/translation";
import SearchBar from "./SearchBar";
import cacheImages from "./Cache/cacheImages";

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
  const [clicked, setClicked] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [filterData, setFilterData] = useState(data);
  const [masterData, setMasterData] = useState(data);
  const[ready, isReady] = useState(false)
  const datas = useContext(GlobalContext);
  const[Search,setSearch] = useState("")

  const renderItem = ({ item }) => {
    if (searchPhrase === "") {
      return (
        <Item
          flag={item.flag}
          code={item.currency.code}
          name={item.name}
          currencyName={item.currency.name}
        />
      );
    }
    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Item
          flag={item.flag}
          code={item.currency.code}
          name={item.name}
          currencyName={item.currency.name}
        />
      );
    }
    if (
      item.currency.code
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Item
          flag={item.flag}
          code={item.currency.code}
          name={item.name}
          currencyName={item.currency.name}
        />
      );
    }
    if (
      item.currency.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <Item
          flag={item.flag}
          code={item.currency.code}
          name={item.name}
          currencyName={item.currency.name}
        />
      );
    }
  };


  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        if(item.currency.code
          .toUpperCase()
          .includes(text.toUpperCase().trim().replace(/\s/g, ""))){
        const itemData = item.currency.code
          ? item.currency.code.toUpperCase()
          : "".toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
        }
          if( item.name
          .toUpperCase()
          .includes(text.toUpperCase().trim().replace(/\s/g, ""))){
            const itemData = item.name
            ? item.name.toUpperCase()
            : "".toUpperCase();
  
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
          }
          if( item.currency.name
            .toUpperCase()
            .includes(text.toUpperCase().trim().replace(/\s/g, ""))){
              const itemData = item.name
              ? item.currency.name.toUpperCase()
              : "".toUpperCase();
    
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
            }
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData);
      setSearch(text);
    }
  };

  const _loadAssetsAsync = async()=>{
    const imageAssets = cacheImages(data.flag)
    await Promise.all([...imageAssets]);

  }

  return (
    <View
      onStartShouldSetResponder={() => {
        setClicked(false);
      }}
    >
       <TextInput
        style={styles.TextInputStyle}
        placeholder={i18n.t('search')}
        value={Search}
        underlineColorAndroid="transparent"
        onChangeText={(text) => searchFilter(text)}
  />
  {/*
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      */}
      <FlatList
        data={filterData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        maxToRenderPerBatch={15}
        updateCellsBatchingPeriod={20}
        initialNumToRender={15}
      />
      {!ready?  <AppLoading
          startAsync={_loadAssetsAsync}
          onFinish={() => isReady(true)}
          onError={console.warn}
        />
      : null}
 
    </View>
    
  );
};

export default CurrencyList;

const styles = StyleSheet.create({
  entity: {
    padding: 10,
    flexDirection: "row",
  },
  TextInputStyle: {
    height: 50,
    paddingLeft: 20,
    margin: 5,
    backgroundColor: "white",
  },
  errStyle: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "red",
  },
});
