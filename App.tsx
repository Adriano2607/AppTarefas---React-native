import { RootSiblingParent } from "react-native-root-siblings";
import { Routes } from "./src/routes";
import { UserContextProvider } from "./src/contexts/UserContext";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";




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
