import React, { useState, useEffect, useContext, Suspense } from "react";
import {
  Text,
  View,
  LogBox,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Settings,
  StatusBar,
} from "react-native";
import { useAssets } from "expo-asset";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import Profile from "./src/Screens/Profile";
import GlobalProvider, { GlobalContext } from "./src/context/reducers/Provider";
import SignIn from "./src/Screens/SignIn";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { ChannelScreen } from "./src/Screens/ChannelScreen";
import { ChannelListScreen } from "./src/Screens/ChannelListScreen";
import { StreamChat } from "stream-chat";
import MainAccount from "./src/Screens/MainAccount";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeCalculator from "./src/Screens/Calculator/HomeCalculator";
import CurrencyConverter from "./src/Screens/Calculator/CurrencyConverter";
import History from "./src/Screens/History";
import { Avatar } from "react-native-elements";
import Setting from "./src/Screens/Setting";
import Header from "./src/components/Header";
import WelcomeScreen from "./src/Screens/WelcomeScreen";
import PhoneVerification from "./src/Screens/PhoneVerification";
import { doc, getDoc } from "firebase/firestore";
import OptionModal from "./src/components/OptionModal";
import Contactss from "./src/Screens/Contacts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./src/Screens/LoadingScreen";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ConnectedContacts from "./src/Screens/ConnectedContacts";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const Stack = createStackNavigator();
const Tab =
  Platform.OS == "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();
const API_KEY = "n7duuv99yqcx";
const client = StreamChat.getInstance(API_KEY);

function App() {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
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
  useEffect(() => {
    //return ()  => client.disconnectUser();
  }, []);
  useEffect(async () => {
    const value = await AsyncStorage.getItem("userData");

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
            component={WelcomeScreen}
          />
          <Stack.Screen
            screenOptions={{ headerShown: false }}
            name="signIn"
            component={SignIn}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            //animationEnabled: false,
            headerStyle: {
              backgroundColor:
                Platform.OS == "ios" ? colors.white : colors.white,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTintColor:
              Platform.OS == "ios" ? colors.foreground : colors.foreground,
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
                options={{
                  title: "Orramo",
                  headerRight: () =>
                    Platform.OS == "android" ? (
                      <Header />
                    ) : (
                      <StatusBar
                        animated={true}
                        backgroundColor="#14213D"
                        barStyle="light-content"
                      />
                    ),
                  headerStyle: {
                    backgroundColor: "#14213D",
                  },
                  headerTintColor: "#fff",
                }}
                component={Home}
              />
              <Stack.Screen
                name="Channel"
                options={{
                  title: channel?.data?.name,
                  headerBackTitle: "Back",
                  headerStyle: { backgroundColor: "#14213D" },
                  headerTintColor: "#fff",
                }}
                component={ChannelScreen}
              />
              <Stack.Screen
                name="Charges Calculator"
                options={{ headerShown: false }}
                component={HomeCalculator}
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
                name="mycontacts"
                options={{ headerShown: false }}
                component={ConnectedContacts}
              />
              {Platform.OS == "android" && (
                <Stack.Screen
                  name="settings"
                  options={{ title: "Settings", headerShown: true }}
                  component={Setting}
                />
              )}
            </>
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
function Home({ navigation }) {
  const {
    theme: { colors },
    userData,
  } = useContext(GlobalContext);
  useEffect(() => {
    const connectUser = async () => {
      await client.connectUser(
        {
          id: userData.uid,
          name: userData.displayName,
          phoneNumber: userData.phoneNumber,
          email: userData.email,
          token: userData.token,
          image: userData.photoURL,
        },
        userData.token
      );

      //  await channel.watch();
    };
    if (!client.userID) {
      connectUser();
    }
  }, [userData]);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarLabel: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "account" || route.name === "Compte") {
              if (Platform.OS == "ios") {
                color = focused ? "#000" : "#75787E";
              } else {
                color = focused ? "#fff" : "#D3D3D3";
              }
            }
            if (route.name === "chats" || route.name === "Compte") {
              if (Platform.OS == "ios") {
                color = focused ? "#000" : "#75787E";
              } else {
                color = focused ? "#fff" : "#D3D3D3";
              }
            }
            if (route.name === "settings" || route.name === "Compte") {
              if (Platform.OS == "ios") {
                color = focused ? "#000" : "#75787E";
              } else {
                color = focused ? "#fff" : "#D3D3D3";
              }
            }
            return (
              <Text
                style={
                  Platform.OS == "ios"
                    ? { color: color, fontSize: 10 }
                    : { color: color, fontSize: 13 }
                }
              >
                {route.name.toLocaleUpperCase()}
              </Text>
            );
          },

          tabBarShowIcon: false,
          tabBarLabelStyle: {
            color: colors.foreground,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.white,
          },
          tabBarStyle: {
            backgroundColor:
              Platform.OS == "ios" ? colors.white : colors.foreground,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "account" || route.name === "Compte") {
              iconName = focused ? "wallet" : "wallet-outline";
              color = focused ? "#14213D" : "grey";
            } else if (
              route.name === "chats" ||
              route.name === "Discutez & Envoyez"
            ) {
              iconName = focused ? "chatbubbles" : "chatbubbles-outline";
              color = focused ? "#14213D" : "grey";
            } else if (
              route.name === "settings" ||
              route.name === "parametre"
            ) {
              iconName = focused ? "cog" : "cog-outline";
              color = focused ? "#14213D" : "grey";
            }
            return <Ionicons name={iconName} size={31} color={color} />;
          },
        };
      }}
      initialRouteName="chats"
    >
      <Tab.Screen
        name="chats"
        options={{ headerShown: false }}
        component={ChannelListScreen}
      />

      <Tab.Screen
        options={{ headerShown: false }}
        name="account"
        component={MainAccount}
      />
      {Platform.OS == "ios" && (
        <Tab.Screen
          name="settings"
          options={{ headerShown: false }}
          component={Setting}
        />
      )}
    </Tab.Navigator>
  );
}

function Main() {
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png"),
    require("./assets/icon-square.png")
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
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar />
          <OverlayProvider>
            <Chat client={client}>
              <App />
            </Chat>
          </OverlayProvider>
        </GestureHandlerRootView>
      </GlobalProvider>
    </SafeAreaProvider>
  );
}

export default Main;
