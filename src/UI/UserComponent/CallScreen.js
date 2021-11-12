import React from "react";

import Ionicons from "react-native-vector-icons/Ionicons";

import { createStackNavigator } from "@react-navigation/stack";

import Home from "./CallComponent/Home";
import Call from "./CallComponent/Call";

const Stack = createStackNavigator();

function CallScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Call"
        component={Call}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default CallScreen;
