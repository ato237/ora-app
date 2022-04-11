import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import CurrencyList from "./CurrencyList";
import i18n from "../Data/translation";
import { GlobalContext } from "../context/reducers/Provider";
import { useContext, useEffect, useState } from "react";
import SignIn from "../Screens/Authentication/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import { Text, View } from "react-native";
import { auth } from "../../firebase";
import Profile from "../Screens/user/Profile";
import Home from "../Screens/user/Home";
import Contacts from "../Screens/user/Contacts";
import ChatHeader from "./ChatHeader";
import Chat from "../Screens/user/Chat";
import Avatar from "./Avatar";

export default function Navigaton() {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    theme: { colors },
  } = useContext(GlobalContext);

  const Stack = createNativeStackNavigator();
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
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      {!currUser ? (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.foreground,
              shadowOpacity: 0,
              elavation: 0,
            },
            headerTintColor: colors.white,
          }}
        >
          {!currUser.displayName && (
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
            component={Chat}
            options={({ route }) => ({
              headerTitle: () => (
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Avatar size={40} user={route.params.user} />
                  </View>
                  <View
                    style={{
                      marginLeft: 15,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: colors.white, fontSize: 18 }}>
                      {route.params.user.contactName ||
                        route.params.user.displayName}
                    </Text>
                  </View>
                </View>
              ),
            })}
          />
          <Stack.Screen name="BottomTab" component={BottomTab} />
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
