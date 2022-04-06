import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import { TextInput } from "react-native-paper";
import { FontAwesome } from "react-native-vector-icons";
import { Ionicons } from "react-native-vector-icons";
import * as Haptics from "expo-haptics";
import axios from "axios";
import { GlobalContext } from "../../context/reducers/Provider";
import { Avatar } from "react-native-elements";
import i18n from "../../Data/translation";
import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";
import * as Device from "expo-device";
import numbro from "numbro";
import DetailsCurrency from "./Modals/DetailsCurrency";
import { ScrollView } from "react-native-web";

const CurrencyConverter = ({ navigation }) => {
  const datas = useContext(GlobalContext);
  const [amount, setAmount] = useState("1.0");
  const [data, setData] = useState([]);
  const [change, setChange] = useState(false);

  const [count, setCount] = useState(1);

  let testId = "ca-app-pub-3940256099942544/6300978111";
  let testIdIn = "ca-app-pub-3940256099942544/8691691433";

  let BannerAppId = Platform.select({
    ios: "ca-app-pub-7148038859151468/3128708138", //ca-app-pub-7148038859151468/2619719471
    android: "ca-app-pub-7148038859151468/4290279394", //ca-app-pub-7148038859151468/2236576097
  });

  let AppId = Platform.select({
    //ca-app-pub-3940256099942544/8691691433
    ios: "ca-app-pub-7148038859151468/2619719471", //ca-app-pub-7148038859151468/2619719471
    android: "ca-app-pub-7148038859151468/2236576097", //ca-app-pub-7148038859151468/2236576097
  });

 /* let loadAd = async () => {
    await AdMobInterstitial.setAdUnitID(AppId);
    await AdMobInterstitial.requestAdAsync();
  };*/

  /*AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () => {
    loadAd();
  });*/

  //Handles the calculate operation
  const handleConvert = () => {
    datas.isLoading(true);
    datas.isPressed(true);
    if (!amount.trim()) {
      alert(i18n.t("enter"));
      datas.isLoading(false);
      datas.isPressed(true);
      return;
    }
    axios
      .post(
        `https://orramo-backend2.herokuapp.com/api/converter/convert/${amount}/${datas.fromCurrency.code}/${datas.toCurrency.code}`
      )
      .then((response) => {
        setData(response.data);
        datas.isLoading(false);
        datas.isCalc(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setCount(count + 1);
        //count % 4 == 0 ? AdMobInterstitial.showAdAsync() : null;
        //setError(false)
        data.map((item) => datas.setUpdate(item.update));
        //console.log(error)
        count % 4 == 0 ? setChange(!change) : null;
      });
  };

  const swapCurrent = () => {
    datas.isCalc(false);
    datas.isLoading(false);
    datas.isPressed(false);
    datas.setFromCurrency(datas.toCurrency);
    datas.setToCurrency(datas.fromCurrency);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const decimalCount = (num) => {
    // Convert to String
    const numStr = String(num);
    // String Contains Decimal
    if (numStr.includes(".")) {
      return numStr.split(".")[1].length;
    }
    // String Does Not Contain Decimal
    return 0;
  };

  useEffect(() => {
   // loadAd();
  }, [change]);
  return (
    <View style={styles.container}>
      <View style={styles.calculatorArea}>
        <Text style={styles.amountFrom}>
          {!amount.trim()
            ? null
            : numbro(amount).format({
                thousandSeparated: true,
                mantissa: 2, // number of decimals displayed
              })}{" "}
          {!amount.trim()
            ? "0.0 " + datas.fromCurrency.code
            : datas.fromCurrency.code + " ="}
        </Text>
        <View style={styles.resultBox}>
          {datas.pressed == false ? (
            <Text style={{ color: "grey" }}>{i18n.t("pressCalc")}</Text>
          ) : null}
          <TouchableOpacity onPress={() => datas.setModalVisible2(true)}>
            {data.map((item, id) =>
              datas.cal && !datas.loading ? (
                <Text key={id} style={styles.result}>
                  <Ionicons
                    name="information-circle-outline"
                    size={15}
                    color="white"
                  />
                  {numbro(item.results).format({
                    thousandSeparated: true,
                    mantissa: decimalCount(item.results) > 3 ? 4 : 2, // number of decimals displayed
                  })}{" "}
                  <Text style={{ fontSize: 18 }}>{datas.toCurrency.code}</Text>
                </Text>
              ) : null
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputArea}>
        <Text style={{ color: "#000" }}>Amount</Text>
        <TextInput
          value={amount}
          onChangeText={(amount) => setAmount(String(amount))}
          style={styles.input}
          placeholderStyle={{ fontSize: 20 }}
          keyboardType="numeric"
          clearButtonMode="while-editing"
          enablesReturnKeyAutomatically={true}
          returnKeyType="done"
          onEndEditing={handleConvert}
          underlineColor="transparent"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <Text style={{ color: "#000", marginTop: 10 }}>From</Text>
          <View
            style={{
              marginHorizontal: Dimensions.get("window").width / 2 - 90,
            }}
          ></View>
          <Text style={{ color: "#000", marginTop: 10 }}>To</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          {/**To Button For Countries */}

          <View style={{}}>
            <TouchableOpacity
              style={styles.currencyOptions}
              onPress={() => {
                navigation.navigate("currency");
                datas.setFrom(true);
              }}
            >
              <Avatar
                rounded
                source={{
                  uri: `data:image/gif;base64,${datas.fromCurrency.flag}`,
                }}
                size="small"
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  top: Platform.OS == "ios" ? 5 : 2,
                  paddingLeft: 15,
                }}
              >
                {datas.fromCurrency.code}
              </Text>
              {/**This is the Arrow beside the 1st currency */}
              <Ionicons
                style={{ left: 5, top: 10 }}
                name="caret-down-outline"
                size={10}
                color="#000"
              />
            </TouchableOpacity>
          </View>
          {/**Inverter Button */}
          <View
            style={{
              marginHorizontal: Dimensions.get("window").width / 2 - 172,
              top: 10,
            }}
          >
            <TouchableOpacity style={styles.changeButton} onPress={swapCurrent}>
              <FontAwesome name="exchange" size={30} color="#000" />
            </TouchableOpacity>
          </View>
          {/**From Button For Countries */}

          <View style={{}}>
            <TouchableOpacity
              style={styles.currencyOptions}
              onPress={() => {
                navigation.navigate("currency");
                datas.setFrom(false);
              }}
            >
              <Avatar
                rounded
                source={{
                  uri: `data:image/gif;base64,${datas.toCurrency.flag}`,
                }}
                size="small"
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  top: Platform.OS == "ios" ? 5 : 2,
                  paddingLeft: 15,
                }}
              >
                {datas.toCurrency.code}
              </Text>
              {/**This is the Arrow beside the 2nd currency */}

              <Ionicons
                style={{ left: 5, top: 10 }}
                name="caret-down-outline"
                size={10}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/**Convert Button */}
        <TouchableOpacity style={styles.button} onPress={handleConvert}>
          <Text style={styles.buttonText}>
            {datas.loading ? (
              <View>
                <ActivityIndicator
                  style={
                    Platform.OS == "ios" ? { top: 10, left: 10 } : { top: 0 }
                  }
                  size="small"
                  color="#fff"
                  animating={true}
                />
              </View>
            ) : (
              i18n.t("conve")
            )}
          </Text>
        </TouchableOpacity>
        {/**Telling the user to press the calulate button */}
        <Text style={{ color: "grey", textAlign: "center" }}>
          {i18n.t("instr2")}
        </Text>
        <AdMobBanner
          bannerSize="banner"
          adUnitID={BannerAppId}
          serverPersonalizedAds={false}
        />
      </View>
      <DetailsCurrency />

    </View>
  );
};

export default CurrencyConverter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    marginTop: 8,
    height: 50,
    borderWidth: 0.5,
    padding: 2,
    backgroundColor: "#fff",
    color: "white",
    borderRadius: 0,
  },
  calculatorArea: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#14213D",
    paddingTop:
      Platform.OS == "ios" && Dimensions.get("window").height > 895 ? 5 : 5,
  },
  inputArea: {
    marginTop: 5,
    padding: 20,
  },
  currencyOptions: {
    backgroundColor: "#fff",
    width: 137,
    paddingVertical: 12,
    borderWidth: 0.5,
    flexDirection: "row",
    justifyContent: "center",
  },
  amountFrom: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#14213D",
  },
  resultBox: {
    marginTop: 15,
    minHeight: 85,
    maxHeight: 250,
    backgroundColor: "#14213D",
    marginBottom: 5,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: "row",
    marginTop: 10,
    borderRadius: 8,
    zIndex: -99,
    justifyContent: "center",
    //shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.3,
    //shadowRadius: 1,
    //elevation: 5,
  },
  result: {
    fontSize: 45,
    fontWeight: "bold",
    color: "#fff",
    bottom: 15,
    left: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#0053C5",
    alignItems: "center",
    alignContent: "center",
    marginTop: 30,
    borderRadius: 4,
  },
});
