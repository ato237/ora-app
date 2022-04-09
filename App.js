import Navigaton from "./src/components/Navigation";
import GlobalProvider from "./src/context/reducers/Provider";
import React, { useContext, useEffect, useState } from "react";
import { useAssets } from "expo-asset";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase";
import { Text, LogBox } from "react-native";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from",
]);
export default function App() {
  return (
    <GlobalProvider>
      <Navigaton />
    </GlobalProvider>
  );
}
function Main() {
  const [assets] = useAssets(
    require("./assets/adaptive-icon.png"),
    require("./assets/icon.png")
  );
}
