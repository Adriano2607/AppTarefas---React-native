import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./AuthRoutes";

import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { StatusBar } from "react-native";
import { AppRoutes } from "./AppRoutes";
import { createDatabase } from "../utils/db";
import { dbExport as db } from "../utils/db";

export const Routes = () => {
 const { getToken, token } = useContext(UserContext);

 createDatabase()

 db.transaction((tx) => {
  tx.executeSql(
      "INSERT INTO users (name, username, password, image, token) VALUES (?, ?, ?, ?, ?)",
      ["admin", "admin", "admin", "https://imgs.search.brave.com/qHK_KwLkO7hVDKCQWllqHadzpt-WmGOzNr9add37mQI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDc2MzM0/MzEuanBn", "1a2b3c4d"]
  );
});

db.transaction((tx) => {
  tx.executeSql(`SELECT * FROM users;`, [], (_, { rows: { _array } }) => {
    console.log("array users setados: ", _array[0]);
  });
});

db.transaction((tx) => {
  tx.executeSql(
    `SELECT * FROM users;`,
    [],
    (_, { rows: { _array } }) => {
      console.log("todos os logins:",_array)
      
    }
  );
});




  return (

    <NavigationContainer>
    
      {token ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};