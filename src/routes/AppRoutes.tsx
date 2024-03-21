import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import User from "../screens/User";
import Home from "../screens/Home";
import { colors } from "../Colors/colors";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();

export const HomeRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerShown: true,
          headerTintColor:'white',
          headerStyle: {
            backgroundColor: colors.cor2, 
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{paddingRight:15}}>
            <Feather name="plus" size={24} color="black" />            
            </TouchableOpacity>
          ),
        })}
        
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

export const AppRoutes = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: colors.cor3,
        tabBarInactiveBackgroundColor: colors.cor2,
      }}
    >
      <Tab.Screen
        name="HomeRoutes"
        component={HomeRoutes}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="home" size={30} color={colors.cor6} />
          ),
          headerTransparent: true,
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="person" size={30} color={colors.cor6} />
          ),
          headerTransparent: true,
        }}
      />
    </Tab.Navigator>
  );
};