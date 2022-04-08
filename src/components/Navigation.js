import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import CurrencyList from "./CurrencyList";
import i18n from "../Data/translation";
import Details from "../Screens/Calculators/Modals/Details";
import WelcomeScreen from "../Screens/Authentication/WelcomeScreen";
import Login from "../Screens/Authentication/Login";
import Signup from "../Screens/Authentication/Signup";
import UsernameSingup from "../Screens/Authentication/UsernameSingup";
import PhoneSignup from "../Screens/Authentication/PhoneSignup";
import Accounts from "../Screens/Main/Accounts";
import ChatSend from "../Screens/Main/ChatSend";
import Setting from "../Screens/Main/Setting";
import AirtimeScreen from "../Screens/Utility/AirtimeScreen";
import Transfer from "../Screens/Utility/Transfer";
import VirtualCards from "../Screens/Utility/VirtualCards";
import AccountHistory from "../Screens/Utility/AccountHistory";
import CurrencyConverter from "../Screens/Calculators/CurrencyConverter";
import HomeCalculator from "../Screens/Calculators/HomeCalculator";
import { useContext } from "react";
import { GlobalContext } from "../context/reducers/Provider";
import ChatRoom from "../Screens/Main/Components/ChatRoom";
import { isReadyRef, navigationRef } from "../RootNavigation";
import AddImage from "../Screens/Main/AddImage";
import GiftedChatRoom from "../Screens/Main/Components/GiftedChatRoom";

export default function Navigaton(ref) {
  const Stack = createNativeStackNavigator();
  const datas = useContext(GlobalContext);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="welcome"
          component={WelcomeScreen}
        />

        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{
            title: "Orramo",
            headerBackVisible: false,
            headerShown: false,
            headerStyle: {
              backgroundColor: "#14213D",
              justifyContent: "center",
              alignItems: "center",
            },
            headerTintColor: "#EEB40A",
          }}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="signup"
          component={Signup}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="usernamesignup"
          component={UsernameSingup}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="phonesignup"
          component={PhoneSignup}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="account"
          component={Accounts}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddImage"
          component={AddImage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ChatSend"
          component={ChatSend}
        />
        <Stack.Screen
          options={ ({ route }) =>({
            title:"",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#14213D",
              justifyContent: "center",
              alignItems: "center",
            },
            headerTitleStyle: {
              color: "#fff",
              fontSize: 20,
            },
            headerTintColor: "#fff",
          })}
          name="ChatSendGifted"
          component={GiftedChatRoom}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="setting"
          component={Setting}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="airtime"
          component={AirtimeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="transfer"
          component={Transfer}
        />
        <Stack.Screen
          options={({ route }) => ({
            headerShown: false,
            headerStyle: {
              backgroundColor: "#14213D",
              justifyContent: "center",
              alignItems: "center",
            },
            headerTitleStyle: {
              color: "#fff",
              fontSize: 20,
            },
            headerTintColor: "#fff",
          })}
          name="chatRoom"
          component={ChatRoom}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="virtualCards"
          component={VirtualCards}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#14213D",
              justifyContent: "center",
              alignItems: "center",
            },
            headerTitleStyle: {
              color: "#B0B5BE",
              fontSize: 15,
            },
            headerTintColor: "#fff",
          }}
          name="Currency Converter"
          component={CurrencyConverter}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#14213D",
              justifyContent: "center",
              alignItems: "center",
            },
            headerTitleStyle: {
              color: "#B0B5BE",
              fontSize: 15,
            },
            headerTintColor: "#fff",
          }}
          name="Charges Calculator"
          component={HomeCalculator}
        />
        <Stack.Screen
          name="History"
          component={AccountHistory}
          options={{
            title: "History",
            headerStyle: {
              backgroundColor: "#14213D",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
            },

            headerTintColor: "#fff",
          }}
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
          name={"currency"}
          component={CurrencyList}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
