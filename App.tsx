import { RootSiblingParent } from "react-native-root-siblings";
import { Routes } from "./src/routes";
import { UserContextProvider } from "./src/contexts/UserContext";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createDatabase } from "./src/utils/db";
import { TaskContextProvider } from "./src/contexts/TaskContext";

export default function App() {


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootSiblingParent>
        <UserContextProvider>
          <TaskContextProvider>
          <StatusBar backgroundColor="black" style="light"/>
        
        <Routes />
          </TaskContextProvider>
        </UserContextProvider>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
}
