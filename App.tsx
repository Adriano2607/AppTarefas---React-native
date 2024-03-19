import { RootSiblingParent } from "react-native-root-siblings";
import { Routes } from "./src/routes";
import { UserContextProvider } from "./src/contexts/UserContext";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDatabase } from "./src/utils/db";

export default function App() {


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootSiblingParent>
        <UserContextProvider>
        <StatusBar backgroundColor="black" style="light"/>
        
          <Routes />
        </UserContextProvider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
}
