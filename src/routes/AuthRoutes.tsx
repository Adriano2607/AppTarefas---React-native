import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import { Button } from "react-native";
import { colors } from "../Colors/colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export const AuthRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={({ navigation }) => ({
          headerShown: true,
          headerTintColor:'white',
          headerStyle: {
            backgroundColor: colors.cor2, 
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{paddingRight:15}}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};
