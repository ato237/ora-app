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
import { GlobalContext } from "../context/reducers/Provider";
import { Avatar } from "react-native-elements";
import i18n from "../Data/translation";
import { AdMobBanner, AdMobInterstitial } from "expo-ads-admob";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import numbro from "numbro";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const CurrencyConverter = ({ navigation }) => {
  const datas = useContext(GlobalContext);
  const [amount, setAmount] = useState("10000.0");
  const [pressed, isPressed] = useState(false);
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);
  const [cal, isCalc] = useState(false);
  const [count, setCount] = useState(1);

  const [androidAppId, setandroidAppId] = useState(
    "ca-app-pub-7148038859151468/4290279394"
    //Android banner: ca-app-pub-7148038859151468/4290279394
    //ios banner:  ca-app-pub-7148038859151468/3128708138
  );
  const [iosAppId, setIosAppId] = useState(//ca-app-pub-3940256099942544/6300978111
    "ca-app-pub-7148038859151468/3128708138"

    //Android banner: ca-app-pub-7148038859151468/4290279394
    //ios banner:  ca-app-pub-7148038859151468/3128708138
  );

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  let AppId = Platform.select({//ca-app-pub-3940256099942544/8691691433
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

  //Handles the calculate operation
  const handleConvert = () => {
    isLoading(true);
    isPressed(true);
    if (!amount.trim()) {
      alert(i18n.t("enter"));
      isLoading(false);
      isPressed(true);
      return;
    }

    axios
      .post(
        `https://orramo-backend2.herokuapp.com/api/converter/convert/${amount}/${datas.fromCurrency.code}/${datas.toCurrency.code}`
      )
      .then((response) => {
        setData(response.data);
        isLoading(false);
        isCalc(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setCount(count + 1);
        count % 6 == 0 ? AdMobInterstitial.showAdAsync() : null;
        //setError(false)
        data.map((item) => datas.setUpdate(item.update));
        //console.log(error)
      });

    count == 3 ? datas.setUpdatedCount(1) : null;

    datas.update && datas.udatedCount == 0
      ? sendPushNotification(expoPushToken)
      : null;
  };

  const swapCurrent = () => {
    isCalc(false);
    isLoading(false);
    isPressed(false);
    datas.setFromCurrency(datas.toCurrency);
    datas.setToCurrency(datas.fromCurrency);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  loadAd();

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
          {pressed == false ? (
            <Text style={{ color: "grey" }}>{i18n.t("pressCalc")}</Text>
          ) : null}
          {data.map((item, id) =>
            cal && !loading ? (
              <Text key={id} style={styles.result}>
                {numbro(item.results).format({
                  thousandSeparated: true,
                  mantissa: 2, // number of decimals displayed
                })}{" "}
                <Text style={{ fontSize: 18 }}>{datas.toCurrency.code}</Text>
              </Text>
            ) : null
          )}
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
                  top: 2,
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
                  top: 2,
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
              i18n.t("conve")
            )}
          </Text>
        </TouchableOpacity>
        {/**Telling the user to press the calulate button */}
        <Text style={{ color: "grey", textAlign: "center" }}>
          {i18n.t("instr2")}
        </Text>
        {Platform.OS == "ios" ? (
          <AdMobBanner
            style={
              Platform.OS == "ios" && Dimensions.get("window").height > 895
                ? { top: 220 }
                : { top: 60 }
            }
            bannerSize="banner"
            adUnitID={androidAppId}
            serverPersonalizedAds={false}
          />
        ) : (
          <AdMobBanner
            style={{ top: 200 }}
            bannerSize="banner"
            adUnitID={iosAppId}
            serverPersonalizedAds={false}
          />
        )}
      </View>
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
      Platform.OS == "ios" && Dimensions.get("window").height > 895 ? 80 : 50,
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
    color: "#000",
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#FFA500",
    alignItems: "center",
    alignContent: "center",
    marginTop: 30,
    borderRadius: 4,
  },
});

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Update Available",
    body: "Update Orramo from the appstore!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
