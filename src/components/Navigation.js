import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import CurrencyList from "./CurrencyList";
import i18n from "../Data/translation";

export default function Navigaton() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{ headerShown: false }}
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
    </NavigationContainer>
  );
}
