import Navigaton from "./src/components/Navigation";
import GlobalProvider from "./src/context/reducers/Provider";
import React from 'react';




export default function App() {
  return (
    <GlobalProvider>
    <Navigaton/>
    </GlobalProvider>
  );
}
;
