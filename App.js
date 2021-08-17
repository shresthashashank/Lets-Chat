import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);

//Importing stack navigator to move between screens
//createNativeStackNavigator is a function that returns an object
//containing 2 properties: Screen and Navigator. Both of them are React components used for configuring the navigator.
//The Navigator should contain Screen elements as its children to define the configuration for routes.
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native"; //Navigation container to wrap all the screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import ChatScreenPrivate from "./screens/ChatScreenPrivate";

// Instance of stacknavigator to call Stack.Navigation
const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2C6BED" },
  headerTitleStyle: { color: "#FFFFFF" },
  headerTintColor: "white",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="ChatPrivate" component={ChatScreenPrivate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
