import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  TouchableOpacity,
  Keyboard,
  LogBox,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { Dropdown } from "sharingan-rn-modal-dropdown";
import axios from "axios";
import * as Haptics from "expo-haptics";
import i18n from "../Data/translation"
import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";
import { GlobalContext } from "../context/reducers/Provider"
import numbro from "numbro";
import Ionicons from "react-native-vector-icons/Ionicons";
import Details from "./Modals/Details";

//This array contains the different service names along with their images
export const services = [
  {
    value: "orange",
    label: "Orange Money",
    avatarSource: require("../images/orange.png"),
  },
  {
    value: "mtn",
    label: "MTN Momo",
    avatarSource: require("../images/mtn.png"),
  },
  {
    value: "eumoney",
    label: "EU Money",
    avatarSource: require("../images/eu.png"),
  },
];

export const chargeMtnType = [
  {
    value: "withdraw",
    //English translation found in translation.js document
    label: i18n.t("retM"),
  },
  {
    value: "send",
    //English translation found in translation.js document
    label: i18n.t("trans"),
  },
  {
    value: "sendnone",
    //English translation found in translation.js document

    label: i18n.t("nonTrans"),
  },
];
export const chargeOrangeType = [
  {
    value: "withdraw",
    //French translation found in translation.js document

    label: i18n.t("retO"),
  },
  {
    value: "send",
    //French translation found in translation.js document

    label: i18n.t("trans2"),
  },
  {
    value: "sendnone",
    //French translation found in translation.js document

    label: i18n.t("nonTrans2"),
  },
];
export const chargeEuType = [
  {
    value: "withdraw",
    label: i18n.t("retEU"),
  },
  {
    value: "send",
    label: i18n.t("trans3"),
  },
  {
    value: "sendnone",
    label: i18n.t("nonTrans3"),
  },
];

const HomeCalculator = ({ navigation }) => {
  LogBox.ignoreAllLogs(true);
  const [values, setValues] = useState("10000"); //The amount entered by the user
  const [service, setSevirce] = useState("orange"); //Handles the services
  const [type, setType] = useState("withdraw"); //Handles the operation
  const [error, setError] = useState(false); //miscellaneous
  const [changed, isChanged] = useState(false); //I used this variable to check if a new service is selected
  const [loading, isLoading] = useState(false); //This is a boolean used to tell whether the api has given out a response
  const [pressed, isPressed] = useState(false);
  const [count, setCount] = useState(1);
  const [change, setChange] = useState(false);
  const datas = useContext(GlobalContext);
  let testId = "ca-app-pub-3940256099942544/6300978111";
  let testIdIn = "ca-app-pub-3940256099942544/1033173712";

  let BannerAppId = Platform.select({
    ios: "ca-app-pub-7148038859151468/3128708138", //ca-app-pub-7148038859151468/2619719471
    android: "ca-app-pub-7148038859151468/4290279394", //ca-app-pub-7148038859151468/2236576097
  });
  let AppId = Platform.select({
    ios: "ca-app-pub-7148038859151468/2619719471", //ca-app-pub-7148038859151468/2619719471
    android: "ca-app-pub-7148038859151468/2236576097", //ca-app-pub-7148038859151468/2236576097
  });

  let loadAd = async () => {
    await AdMobInterstitial.setAdUnitID(AppId);
    await AdMobInterstitial.requestAdAsync();
  };

  AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () => {
    loadAd();
  });

  //Handles the service dropdown
  const onChangeService = (value) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    isLoading(false);
    isChanged(true);
    setSevirce(value);
    Keyboard.dismiss();
  };

  //Handles the operation dropdown
  const onChangeType = (value) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    isLoading(false);
    isChanged(true);
    setType(value);
    Keyboard.dismiss();
  };

  //Handles the calculate operation
  const handleCalculate = () => {
    isPressed(true);
    isLoading(true);
    isChanged(false);
    Keyboard.dismiss();

    if (!values.trim()) {
      alert(i18n.t("enter"));
      isLoading(false);
      isPressed(true);
      return;
    }
    if (values % 1 != 0) {
      alert(i18n.t("dec"));
    }

    axios
      .post(
        `https://orramo-backend2.herokuapp.com/api/calculate/${service}/${values}/${type}`
      )
      .catch((error) => setError(true))
      .then((response) => {
        datas.setData(response.data);
        isLoading(false);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setCount(count + 1);
        datas.setSevirce(service);
        datas.setValues(values);
        datas.setType(type);

        count % 4 == 0 ? setChange(!change) : null;
        // setError(false)
        //console.log(service)
        //console.log(type)
        //console.log(error)
      });
  };
  //loadAd();

  useEffect(() => {
   // AdMobInterstitial.showAdAsync() 

  }, []);
  return (
    <View style={styles.container}>
      {/**Status Bar */}
      <StatusBar backgroundColor="#14213D" barStyle="light-content" />

      <View style={styles.amountBox}>
        <Text style={styles.amountStyle}>
          {i18n.t("charge")}{" "}
          {!values.trim()
            ? null
            : numbro(values).format({
                thousandSeparated: true,
                mantissa: 0, // number of decimals displayed
              })}
          {!values.trim() ? null : " XAF ="}
        </Text>
        {/** Calculation Results */}

        <View style={styles.resultBox}>
          {!pressed ? (
            <Text style={{ color: "grey" }}>{i18n.t("press")}</Text>
          ) : null}
          <TouchableOpacity onPress={() => datas.setModalVisible(true)}>
            {datas.data.map((datum) =>
              service == "orange" && !changed ? (
                <Text key={1} style={styles.result}>
                  <Ionicons
                    name="information-circle-outline"
                    size={15}
                    color="white"
                  />
                  {numbro(datum.orangeCharge).format({
                    thousandSeparated: true,
                    mantissa: 0, // number of decimals displayed
                  })}{" "}
                  <Text style={{ fontSize: 14 }}>XAF</Text>
                </Text>
              ) : service == "mtn" && !changed ? (
                <Text key={3} style={styles.result}>
                  <Ionicons
                    name="information-circle-outline"
                    size={15}
                    color="white"
                  />
                  {numbro(datum.mtnCharge).format({
                    thousandSeparated: true,
                    mantissa: 0, // number of decimals displayed
                  })}{" "}
                  <Text style={{ fontSize: 14 }}>XAF</Text>
                </Text>
              ) : service == "eumoney" && !changed ? (
                <Text key={2} style={styles.result}>
                  <Ionicons
                    name="information-circle-outline"
                    size={15}
                    color="white"
                  />
                  {numbro(datum.euCharge).format({
                    thousandSeparated: true,
                    mantissa: 0, // number of decimals displayed
                  })}{" "}
                  <Text style={{ fontSize: 14 }}>XAF</Text>
                </Text>
              ) : (
                <Text style={{ color: "grey" }}>{i18n.t("press")}</Text>
              )
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.values}>
        {/**Amount Input */}
        <Text style={{ color: "black", opacity: 0.9 }}>{i18n.t("amnt")}</Text>
        <TextInput
          style={styles.input}
          value={values}
          onChangeText={(values) => {
            const validated = values.match(/^(\d*\.{0,1}\d{0,2}$)/)
    if (validated) {
      setValues(String(values));
      datas.setValues(values);
    }
           
          }}
          placeholder={i18n.t("enter")}
          placeholderStyle={{ fontSize: 20 }}
          keyboardType="numeric"
          clearButtonMode="while-editing"
          enablesReturnKeyAutomatically={true}
          returnKeyType="done"
          onEndEditing={handleCalculate}
          underlineColor="transparent"
        />
        <View
          style={{
            flexDirection: "column",
            height: "100%",
            backgroundColor: "#fff",
          }}
        >
          {/**First Dropdown option */}
          <View style={styles.options}>
            <Dropdown
              key={5}
              label={i18n.t("ser")}
              data={services}
              value={service}
              onChange={onChangeService}
              enableAvatar
              underlineColor
              selectedItemTextStyle={{ color: "red" }}
            />
          </View>
          <View style={styles.options}>
            {/**Second DropDown Option */}
            <Dropdown
              key={5}
              label={i18n.t("opr")}
              data={
                service == "mtn"
                  ? chargeMtnType
                  : service == "orange"
                  ? chargeOrangeType
                  : service == "eumoney"
                  ? chargeEuType
                  : null
              }
              value={type}
              onChange={onChangeType}
              selectedItemTextStyle={{ color: "red" }}
              underlineColor
            />
          </View>
          {/** Calculate Button */}
          <TouchableOpacity onPress={handleCalculate} style={styles.button}>
            <Text style={styles.buttonText}>
              {loading ? (
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
                i18n.t("calc")
              )}
            </Text>
          </TouchableOpacity>
          <Text style={{ color: "grey", textAlign: "center" }}>
            {i18n.t("instr")}
          </Text>
          <AdMobBanner
            bannerSize="banner"
            adUnitID={BannerAppId}
            serverPersonalizedAds={false}
          />
        </View>
      </View>
      <Details />
      {/**Adds goes here */}
    </View>
  );
};

export default HomeCalculator;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  amountBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#14213D",
    paddingTop:50
   
  },
  amountStyle: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#14213D",
  },
  resultBox: {
    marginTop: 15,
    height: 85,
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
  input: {
    marginTop: 8,
    height: 50,
    borderWidth: 0.5,
    padding: 2,
    backgroundColor: "#fff",
    color: "white",
  },
  values: {
    padding: 20,
  },
  options: {
    flexDirection: "row",
    borderWidth: 0.6,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0053C5",
    alignItems: "center",
    alignContent: "center",
    marginTop: 15,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    alignContent: "center",
  },
});
