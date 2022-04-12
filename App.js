import React, { useState, useEffect, useContext } from "react";
import { Text, View, LogBox, ActivityIndicator } from "react-native";
import { useAssets } from "expo-asset";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import Profile from './src/Screens/Profile'
import GlobalProvider, { GlobalContext } from "./src/context/reducers/Provider";
import SignIn from "./src/Screens/SignIn";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { ChannelScreen } from "./src/Screens/ChannelScreen";
import { ChannelListScreen } from "./src/Screens/ChannelListScreen";
import {StreamChat} from 'stream-chat'

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const API_KEY = "n7duuv99yqcx"
const client = StreamChat.getInstance(API_KEY);

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    theme: { colors },
  } = useContext(GlobalContext);
  useEffect( () => {
    
    //return ()  => client.disconnectUser();
  },[]);

  useEffect(() => {
 
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setCurrUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <View style={{justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size="large" color="#00ff00"/>
    </View>;
  }

  return (
    <NavigationContainer>
      {!currUser ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="signIn" component={SignIn} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.foreground,
              shadowOpacity: 0,
              elevation: 0,
            },
            headerTintColor: colors.white,
          }}
        >
          {!currUser.displayName && (
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen
            name="home"
            options={{ title: "Orramo" }}
            component={Home}
          />
          <Stack.Screen
            name="Channel"
            options={{ title: "Brodai" }}
            component={ChannelScreen}
          />         
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
function Home() {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  useEffect(()=>{
    const connectUser = async (username,fullname) =>{
      await client.connectUser({
          id: username,
          name: fullname,
          AccountBalance: 500000,
           image:'https://scontent.fatl1-2.fna.fbcdn.net/v/t1.6435-9/93803824_2688316481388052_6414058165041627136_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=9sPn15HwOd8AX8iM-T_&_nc_ht=scontent.fatl1-2.fna&oh=00_AT99d0tB2a4TyXr7c0llid2yD1m0WQ5wR3lsEes6VXmtCw&oe=6279576B'
      }, client.devToken(username) );
      console.log('user connected')
  
      const channel =  client.channel("messaging", "global", {name: 'Global Room'})
      await channel.watch()
    }
    connectUser("Bradley","Ade")
  },[])
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarLabel: () => {
            if (route.name === "photo") {
              return <Ionicons name="camera" size={20} color={colors.white} />;
            } else {
              return (
                <Text style={{ color: colors.white }}>
                  {route.name.toLocaleUpperCase()}
                </Text>
              );
            }
          },
          tabBarShowIcon: true,
          tabBarLabelStyle: {
            color: colors.white,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.white,
          },
          tabBarStyle: {
            backgroundColor: colors.foreground,
          },
        };
      }}
      initialRouteName="chats"
    >
      <Tab.Screen name="chats" component={ChannelListScreen} />
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
    return <Text>Loading ..</Text>;
  }
  return (
    <GlobalProvider>
      <OverlayProvider>
        <Chat client={client}>
      <App />
      </Chat>
      </OverlayProvider>
    </GlobalProvider>
  );
}

export default Main;
