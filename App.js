import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  LogBox,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  Settings,
} from "react-native";
import { useAssets } from "expo-asset";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
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
import { StatusBar } from "expo-status-bar";
import { Avatar } from "react-native-elements";
import Setting from "./src/Screens/Setting";
import Header from "./src/components/Header";
import WelcomeScreen from "./src/Screens/WelcomeScreen";
import PhoneVerification from "./src/Screens/PhoneVerification";

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
  const {
    theme: { colors },
    setId,
    userData,
    setUserData,
  } = useContext(GlobalContext);
  useEffect(() => {
    //return ()  => client.disconnectUser();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUserData(user);
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
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
            name="verification"
            screenOptions={{ headerShown: false }}
            component={PhoneVerification}
          />
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
          {!userData.displayName && (
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="home"
            options={{
              title: "Orramo",

              headerRight: () => (Platform.OS == "android" ? <Header /> : null),
            }}
            component={Home}
          />
          <Stack.Screen
            name="Channel"
            options={{ title: "Brodai" }}
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
            name="History"
            options={{ headerShown: false }}
            component={History}
          />

          {Platform.OS == "android" && (
            <Stack.Screen
              name="settings"
              options={{ title: "Settings", headerShown: true }}
              component={Setting}
            />
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
function Home({ navigation }) {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  useEffect(() => {
    const connectUser = async (username, fullname) => {
      await client.connectUser(
        {
          id: username,
          name: fullname,
          AccountBalance: 500000,
          image:
            "https://scontent.fatl1-2.fna.fbcdn.net/v/t1.6435-9/93803824_2688316481388052_6414058165041627136_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=9sPn15HwOd8AX8iM-T_&_nc_ht=scontent.fatl1-2.fna&oh=00_AT99d0tB2a4TyXr7c0llid2yD1m0WQ5wR3lsEes6VXmtCw&oe=6279576B",
        },
        client.devToken(username)
      );
      console.log("user connected");

      const channel = client.channel("messaging", "global", {
        name: "Global Room",
      });
      await channel.watch();
    };
    connectUser("Bradley", "Ade");
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarLabel: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "account" || route.name === "Compte") {
              color = focused ? "#14213D" : "grey";
            }
            if (route.name === "chats" || route.name === "Compte") {
              color = focused ? "#14213D" : "grey";
            }
            if (route.name === "settings" || route.name === "Compte") {
              color = focused ? "#14213D" : "grey";
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
            backgroundColor: colors.foreground,
          },
          tabBarStyle: {
            backgroundColor: Platform.OS == "ios" ? colors.white : colors.white,
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
    require("./assets/welcome-img.png")
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
    <GlobalProvider>
      <StatusBar />
      <OverlayProvider>
        <Chat client={client}>
          <App />
        </Chat>
      </OverlayProvider>
    </GlobalProvider>
  );
}

export default Main;
