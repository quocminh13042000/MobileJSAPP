import React, { Component } from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useState } from "react";
import CameraID from "./SettingComponent/CameraId";
import SendEmail from "./SettingComponent/SendEmail";
import Sensor from "./SettingComponent/SetSensor";
const Tab = createMaterialTopTabNavigator();
export default class SettingScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Camera ID" component={CameraID} />
        <Tab.Screen name="Send Email" component={SendEmail} />
        <Tab.Screen name="Sensor" component={Sensor} />
      </Tab.Navigator>
    );
  }
}
