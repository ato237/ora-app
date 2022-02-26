import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import i18n from 'i18n-js';
import { StyleSheet } from "react-native";
import BottomTab from "./src/components/BottomTab";



export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {/*<Stack.Navigator>
        <Stack.Screen
          options={{ title: "Orramo", headerStyle:{
            backgroundColor:"#14213D",
            justifyContent:'center',
            alignItems:'center'
          },
        headerTintColor:"#fff" }}
          name="Orramo"
          component={OrangeMoney}
        />
        </Stack.Navigator>*/}
       <BottomTab/>
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
