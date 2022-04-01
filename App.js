import Navigaton from "./src/components/Navigation";
import GlobalProvider, { GlobalContext } from "./src/context/reducers/Provider";
import React, { useContext, useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isReadyRef, navigationRef } from "./src/RootNavigation";
import * as RootNavigation from "./src/RootNavigation";

export default function App({ navigation }) {
  const datas = useContext(GlobalContext);
  const [ready, isReady] = useState(false);
  const [logged, isLogged] = useState(false);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("userToken");
      if (value !== null) {
        // We have data!!
        isLogged(true);
      }
      else{
        isLogged(false);
      }
    } catch (error) {
      console.log("Something went wrong", error);

      // Error retrieving data
    }
  };
  useEffect(() => {
    retrieveData();
    console.log(logged);
   logged? RootNavigation.navigate('BottomTab'): RootNavigation.navigate('welcome')
    return () => {
      isReadyRef.current = false;
    };
  }, [logged]);
  return (
    <GlobalProvider>
      <Navigaton
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}
      />
    </GlobalProvider>
  );
}
