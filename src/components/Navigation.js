import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import CurrencyList from "./CurrencyList";
import i18n from "../Data/translation";
import { GlobalContext } from "../context/reducers/Provider";
import { useContext, useEffect } from "react";
import SignIn from "../Screens/Authentication/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import { Text } from "react-native";
import { auth } from "../firebase";
import Profile from "../Screens/user/Profile";
import Home from "../Screens/user/Home";
import Contacts from "../Screens/user/Contacts";
import ChatHeader from "./ChatHeader";
import Chat from "../Screens/user/Chat";

export default function Navigaton() {
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  const Stack = createNativeStackNavigator();
  const datas = useContext(GlobalContext);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      datas.setAppLoading(false);
      if (user) {
        datas.setCurrentUser(user);
      }
    });
    return () => unsubscribe();
  }, []);
  if (datas.apploading) {
    return <Text>Loading ...</Text>;
  }
  return (
    <NavigationContainer>
      {!datas.currentUser ? (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerStyle: {
          backgroundColor:colors.foreground,
          shadowOpacity: 0,
          elavation:0
        },
        headerTintColor: colors.white
         }}>
          {!datas.currentUser.displayName && (
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{ headerShown: true }}
            />
          )}
          <Stack.Screen
            name="home"
            options={{ title: "Orramo", headerShown: true }}
            component={Home}
          />
             <Stack.Screen
            name="contacts"
            options={{ title: "Select Contact", headerShown: true }}
            component={Contacts}
          />
              <Stack.Screen
            name="chat"
            options={{ headerTitle: (props) => <ChatHeader {...props}/>, headerShown: true }}
            component={Chat}
          />
          <Stack.Screen
            name="BottomTab"
            component={BottomTab}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            options={{
              title: i18n.t("currency"),
              headerStyle: {
                backgroundColor: "#14213D",
                justifyContent: "center",
                alignItems: "center",
              },
              headerTintColor: "#fff",
            }}
            name="currency"
            component={CurrencyList}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
