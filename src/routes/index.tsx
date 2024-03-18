import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./AuthRoutes";

import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { StatusBar } from "react-native";
import { AppRoutes } from "./AppRoutes";

export const Routes = () => {
 const { getToken, token } = useContext(UserContext);

 



  return (
    

    <NavigationContainer>
    
      {token ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
 
  
  );
};