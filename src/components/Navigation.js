import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import i18n from 'i18n-js';
import { StyleSheet } from "react-native";
import BottomTab from "./BottomTab";
import CurrencyList from "./CurrencyList";



export default function Navigaton() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name = "BottomTab"
        component={BottomTab}
        options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{ title: "Currencies", headerStyle:{
            backgroundColor:"#14213D",
            justifyContent:'center',
            alignItems:'center'
          },
        headerTintColor:"#fff" }}
          name="currency"
          component={CurrencyList}
        />
     
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
