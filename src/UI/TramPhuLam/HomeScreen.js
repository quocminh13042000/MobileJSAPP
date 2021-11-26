import React from "react";
import { render } from "react-dom";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import EventScreen from "./EventScreen";

import FloorScreen from "./FloorScreen";
import SettingScreen from "./SettingScreen";
import PanelScreen from "./PanelScreen";



const Tab = createBottomTabNavigator();

export default class HomeScreen extends React.Component {
  render() {
    return (
      <Tab.Navigator
      /* tabBarOptions={{
          activeTintColor: "#228B22",
        }}*/
      >
        <Tab.Screen
          name="Panel"
          component={PanelScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="grid" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Floor"
          component={FloorScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Event"
          component={EventScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }
}
