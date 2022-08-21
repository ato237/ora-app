import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  LogBox,
  ActivityIndicator,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import { useAssets } from "expo-asset";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Profile from "./src/Screens/Profile";
import GlobalProvider, { GlobalContext } from "./src/context/reducers/Provider";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeCalculator from "./src/Screens/Calculator/HomeCalculator";
import CurrencyConverter from "./src/Screens/Calculator/CurrencyConverter";
import Setting from "./src/Screens/Setting";
import PhoneVerification from "./src/Screens/PhoneVerification";
import { doc, getDoc } from "firebase/firestore";
import Contactss from "./src/Screens/Contacts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./src/Screens/LoadingScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ConnectedContacts from "./src/Screens/ConnectedContacts";
import Payments from "./src/Screens/Payments";
import BuyAirtime from "./src/Screens/BuyAirtime";
import History from "./src/Screens/History";
import VirtualCards from "./src/Screens/VirtualCards";
import NewWelcome from "./src/Screens/NewWelcome";
import Signup from "./src/Screens/Signup";
import Login from "./src/Screens/Login";
import HomeCrypto from "./src/Screens/HomeCrypto";
import Services from "./src/Screens/Services";
import { TouchableOpacity } from "react-native-gesture-handler";
import CurrencyPage from "./src/Screens/CurrencyPage";
import AvailableCurrencypage from "./src/Screens/AvailableCurrencypage";
import Cards from "./src/Screens/Cards";
import Wallets from "./src/Screens/Wallets";
import Withdraw from "./src/Screens/Withdraw";
import SendCrypto from "./src/Screens/SendCrypto";
import Recieve from "./src/Screens/Recieve";
import BuyCrypto from "./src/Screens/BuyCrypto";
import CurrencyList from "./src/components/CurrencyList";
import Transfer from "./src/Screens/Transfer";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [loading, setLoading] = useState(true);
  const {
    theme: { colors },
    userData,
    setUserData,
    setLoadingData,
    loadContacts,
    channel,
    setContacts,
    setMemoryContacts,
  } = useContext(GlobalContext);

  useEffect(async () => {
    const value = await AsyncStorage.getItem("userData");

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // console.log(user);
      setUserData(JSON.stringify(value));
      setLoading(false);
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(userSnap.data())
          );
          setLoadingData(true);
        }
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(async () => {
    loadContacts();
    const value = await AsyncStorage.getItem("userContacts");
    setContacts(JSON.parse(value));
    setMemoryContacts(JSON.parse(value));
  }, []);
  if (loading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!userData ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="welcome"
            screenOptions={{ headerShown: false }}
            component={NewWelcome}
          />
          <Stack.Screen
            screenOptions={{ headerShown: false }}
            name="login"
            component={Login}
          />
          <Stack.Screen
            screenOptions={{ headerShown: false }}
            name="signup"
            component={Signup}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            //animationEnabled: false,
            headerStyle: {
              backgroundColor: colors.white,
              shadowOpacity: 0,
              elevation: 0,
            },
          }}
        >
          {userData.displayName == null ? (
            <>
              <Stack.Screen
                name="loading"
                component={LoadingScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="profile"
                component={Profile}
                options={{ headerShown: false }}
              />
            </>
          ) : null}
          {userData.verified == false ? (
            <Stack.Screen
              name="verification"
              screenOptions={{ headerShown: false }}
              component={PhoneVerification}
            />
          ) : (
            <>
              <Stack.Screen
                name="home"
                options={{ headerShown: false }}
                component={Home}
              />
              <Stack.Screen
              name="Transfer Money"
              options={{headerShown: true}}
              component={Transfer}
              />
              <Stack.Screen
                name="Charges Calculator"
                options={{ headerShown: false }}
                component={HomeCalculator}
              />
              <Stack.Screen
                name="Available Currency Page"
                options={{ headerShown: false }}
                component={AvailableCurrencypage}
              />
              <Stack.Screen
                name="Currency Converter"
                options={{ headerShown: false }}
                component={CurrencyConverter}
              />
              <Stack.Screen
                name="contacts"
                options={{ headerShown: false }}
                component={Contactss}
              />
              <Stack.Screen
                name="history"
                options={{ headerShown: true, title: "History" }}
                component={History}
              />
              <Stack.Screen
                name="wallets"
                options={{ headerShown: true, title: "Wallets" }}
                component={Wallets}
              />
              <Stack.Screen
                name="withdraw"
                options={{ headerShown: true, title: "Withdraw" }}
                component={Withdraw}
              />
              <Stack.Screen
                name="sendcrypto"
                options={{ headerShown: true, title: "Send" }}
                component={SendCrypto}
              />
              <Stack.Screen
                name="recieve"
                options={{ headerShown: true, title: "Recieve" }}
                component={Recieve}
              />
              <Stack.Screen
                name="buy"
                options={{ headerShown: true, title: "Buy" }}
                component={BuyCrypto}
              />

              <Stack.Screen
                name="Currency Page"
                options={{ headerShown: true, title: "Wallet" }}
                component={CurrencyPage}
              />
              <Stack.Screen
                name="airtime"
                options={{ headerShown: true, title: "Airtime" }}
                component={BuyAirtime}
              />
              <Stack.Screen
                name="payments"
                options={{ headerShown: true, title: "payments" }}
                component={Payments}
              />
              <Stack.Screen
                name="virtualCards"
                options={{ headerShown: true, title: "Virtual Cards" }}
                component={VirtualCards}
              />
              <Stack.Screen
                name="mycontacts"
                options={{ headerShown: false }}
                component={ConnectedContacts}
              />
             <Stack.Screen
          options={{
            title:'Currency',
            headerStyle: {
              backgroundColor: "#F4F7FD",
            },
            headerTintColor: "#000",
          }}
          name="currency"
          component={CurrencyList}
        />
            </>
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
function Home() {
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  function isIphoneWithNotch() {
    const dimen = Dimensions.get("window");
    return (
      Platform.OS === "ios" &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (dimen.height === 780 ||
        dimen.width === 780 ||
        dimen.height === 812 ||
        dimen.width === 812 ||
        dimen.height === 844 ||
        dimen.width === 844 ||
        dimen.height === 896 ||
        dimen.width === 896 ||
        dimen.height === 926 ||
        dimen.width === 926)
    );
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarLabel: ({ focused, color, size }) => {
            let iconName;
            color = focused ? "#0053C5" : "#000";

            return (
              <Text style={{ color: color, fontSize: 11, bottom: 12 }}>
                {route.name}
              </Text>
            );
          },
          tabBarStyle: {
            backgroundColor: colors.white,
            height: isIphoneWithNotch() ? 95 : 70,
            //position: "absolute"
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home" || route.name === "Compte") {
              iconName = focused ? "home" : "home-outline";
              color = focused ? "#0053C5" : "#000";
            } else if (
              route.name === "Service" ||
              route.name === "Discutez & Envoyez"
            ) {
              iconName = focused ? "server" : "server-outline";
              color = focused ? "#0053C5" : "#000";
            } else if (route.name === "Cards" || route.name === "parametre") {
              iconName = focused ? "card" : "card-outline";
              color = focused ? "#0053C5" : "#000";
            } else if (
              route.name === "Settings" ||
              route.name === "parametre"
            ) {
              iconName = focused ? "cog" : "cog-outline";
              color = focused ? "#0053C5" : "#000";
            }
            return <Ionicons name={iconName} size={24} color={color} />;
          },
        };
      }}
      initialRouteName="chats"
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeCrypto}
      />
      <Tab.Screen
        name="Service"
        options={{ headerShown: true }}
        component={Services}
      />
      <Tab.Screen
        name="Pay"
        component={PlusComponent}
        options={{
          tabBarButton: () => (
            <View
              style={{
                borderRadius: 50,
                padding: 12,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#14213D",
                  height: 55,
                  width: 55,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="add-outline" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      <Tab.Screen
        options={{ headerShown: true }}
        name="Cards"
        component={Cards}
      />
      <Tab.Screen
        name="Settings"
        options={{ headerShown: true }}
        component={Setting}
      />
    </Tab.Navigator>
  );
}
const PlusComponent = () => {
  return null;
};
function Main() {
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png"),
    require("./assets/icon-square.png"),
    require("./assets/adaptive-icon.png"),
    require("./assets/BTC.png"),
    require("./assets/opengraph.png")
  );
  if (!assets) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <GlobalProvider>
        {Platform.OS == "ios" ? (
          <StatusBar
            animated={true}
            backgroundColor="#F4F7FD"
            barStyle="dark-content"
          />
        ) : (
          <StatusBar
            animated={true}
            backgroundColor="#F4F7FD"
            barStyle="dark-content"
          />
        )}
        <App />
      </GlobalProvider>
    </SafeAreaProvider>
  );
}

export default Main;
