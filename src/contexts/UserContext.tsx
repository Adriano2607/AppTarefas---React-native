import axios from "axios";
import { ReactNode, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDTO } from "../types/User";
import Toast from "react-native-root-toast";
import userJSON from "../utils/user.json"

type UserContextProps = {
  token: string;
  setToken: (token: string) => void;
  getToken: () => void;
  user: UserDTO | null;
  setUser: (user: UserDTO) => void;
  getUser: () => void;
  login: (username: string, password: string) => void;
  logout: () => void;

};

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

export const UserContextProvider = ({ children }: UserProviderProps) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UserDTO | null>(null);

  const storeToken = async (value: string) => {
    try {
      await AsyncStorage.setItem("@token", value);
    } catch (error) {
      Toast.show("Não foi possível salvar o token", {
        duration: 3000,
        position: Toast.positions.BOTTOM,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "red",
      });
    }
  };

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("@token");

      if (value !== null) {
        setToken(value);
      }
    } catch (error) {
      Toast.show("Não foi possível recuperar o token", {
        duration: 3000,
        position: Toast.positions.BOTTOM,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "red",
      });
    }
  };

  const storeUser = async (value: UserDTO) => {
    try {
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem("@user", jsonValue);
    } catch (error) {
      Toast.show("Não foi possível salvar os dados do usuário", {
        duration: 3000,
        position: Toast.positions.BOTTOM,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "red",
      });
    }
  };

  const getUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@user");
      const userData = jsonValue !== null ? JSON.parse(jsonValue) : null;

      setUser(userData);
    } catch (error) {
      Toast.show("Não foi possível recuperar o usuário", {
        duration: 3000,
        position: Toast.positions.BOTTOM,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "red",
      });
    }
  };

  const login = async (username: string, password: string) => {
    try {
    
      if(username !== userJSON.user.username && userJSON.user.password !== password)
        return


      setUser(userJSON.user);
      storeUser(userJSON.user);
      setToken(userJSON.user.token);
      storeToken(userJSON.user.token);
    } catch (error) {
      Toast.show("Não foi possível realizar o login", {
        duration: 3000,
        position: Toast.positions.BOTTOM,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "red",
      });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@user");
    setToken("");
    await AsyncStorage.removeItem("@cart");
  };

 

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        getToken,
        user,
        setUser,
        getUser,
        login,
        logout, 
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
};