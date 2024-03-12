import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import User from "../screens/User";
import Home from "../screens/Home";
import { colors } from "../Colors/colors";

const Stack = createNativeStackNavigator();

export const HomeRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
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
        tabBarActiveBackgroundColor: colors.corPrincipal,
        tabBarInactiveBackgroundColor: colors.corPrincipal,
      }}
    >
      <Tab.Screen
        name="HomeRoutes"
        component={HomeRoutes}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="home" size={30} color="white" />
          ),
          headerTransparent: true,
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="person" size={30} color="white" />
          ),
          headerTransparent: true,
        }}
      />
    </Tab.Navigator>
  );
};