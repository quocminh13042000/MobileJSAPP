import React from "react";


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Registration from "./ResigComponent";

//import Callscreen from "./CallScreen";
import TakePicture from "./TakePicture";
import CallScreen from "./CallScreen";

const Tab = createBottomTabNavigator();

export default class UserScreen extends React.Component {
  render() {
    return (
      <Tab.Navigator
      /* tabBarOptions={{
                activeTintColor: "#228B22",
              }}*/
      >
        <Tab.Screen
          name="Registration"
          component={Registration}
          options={{
            tabBarLabel: "Registration",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-add-outline" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Call "
          component={CallScreen}
          options={{
            tabBarLabel: "Call",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="call-outline" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Call"
          component={TakePicture}
          options={{
            tabBarLabel: "Take Picture",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="camera-outline"
                color={color}
                size={size}
              />
            ),
            headerShown: false,
          }}
        />
        {/*
        <Tab.Screen
          name="Picture"
          component={TakePicture}
          options={{
            tabBarLabel: "Picture",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="camera-outline" color={color} size={size} />
            ),
          }}
        />*/}
      </Tab.Navigator>
    );
  }
}
