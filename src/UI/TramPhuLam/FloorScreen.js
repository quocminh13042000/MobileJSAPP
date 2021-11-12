import React, { Component } from "react";
import { render } from "react-dom";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Floor_2_Screen from "./FloorComponent/Floor2Screen";
import Floor_1_Screen from "./FloorComponent/Floor1Screen";
const Tab = createMaterialTopTabNavigator();

export default class FloorScreen extends React.Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Floor 1" component={Floor_1_Screen} />

        <Tab.Screen name="Floor 2" component={Floor_2_Screen} />
      </Tab.Navigator>
    );
  }
}
