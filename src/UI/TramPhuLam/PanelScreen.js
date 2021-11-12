import React, { Component } from "react";
import { render } from "react-dom";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Picker,
  Button,
} from "react-native";
import {
  WebsocketService,
  Disable as webDisable,
  SendData as webSendData,
  ResetAllData as webResetAllData,
} from "../../services/websocket.service";
import { useState } from "react";



function PanelScreen() {
  var setEnable = WebsocketService.Area1.Floor;

  var [zone_1, setText_1] = useState(setEnable[0]);
  var [zone_2, setText_2] = useState(setEnable[1]);
  var [zone_3, setText_3] = useState(setEnable[2]);
  var [zone_4, setText_4] = useState(setEnable[3]);
  var [zone_5, setText_5] = useState(setEnable[4]);
  const onPress = (zoneset) => {
    switch (zoneset) {
      case 0:
        if (zone_1) {
          setText_1((zone) => (zone = false));
          Disable(0);
        } else {
          setText_1((zone) => (zone = true));
          Enable(0);
        }
        break;
      case 1:
        if (zone_2 == true) {
          setText_2((zone) => (zone = false));
          Disable(1);
        } else {
          setText_2((zone) => (zone = true));
          Enable(1);
        }
        break;
      case 2:
        if (zone_3 == true) {
          setText_3((zone) => (zone = false));
          Disable(2);
        } else {
          setText_3((zone) => (zone = true));
          Enable(2);
        }
        break;
      case 3:
        if (zone_4 == true) {
          setText_4((zone) => (zone = false));
          Disable(3);
        } else {
          setText_4((zone) => (zone = true));
          Enable(3);
        }
        break;
      case 4:
        if (zone_5 == true) {
          setText_5((zone) => (zone = false));
          Disable(4);
        } else {
          setText_5((zone) => (zone = true));
          Enable(4);
        }

        break;
    }
  };

  const Disable = (id) => {
    webDisable(id);
    webSendData("Send", "010_R0" + (id + 1) + "_99");
    webSendData("Send", "010_R04_05");
    webSendData("Send", "010_R03_07");
  };

   const Enable = (id) => {
     webDisable(id);
     webSendData("Send", "010_R0" + (id + 1) + "_00");
     webSendData("Send", "010_R04_05");
   };

   const Reset = () => {
     webResetAllData();
     setEnable = WebsocketService.Area1.Floor;
     webSendData("Send", "010_R04_05");
     webSendData("Send", "010_R03_07");
     Alert.alert("Sending Reset");
   };
  const Mute = () => {
    webResetAllData();
    webSendData("Send", "010_R03_07");
    Alert.alert("Sending Mute");
  };

  return (
    <View style={styles.container}>
      <View style={styles.controlpanel}>
        <Text style={styles.head}> Control Panel </Text>
        <View style={styles.fixToText}>
          <Text style={styles.text}> Reset </Text>
          <View style={styles.button}>
            <Button
              title="Reset"
              color="#a7b0a9"
              onPress={() => Reset()}
            ></Button>
          </View>
        </View>
        <View style={styles.fixToText}>
          <Text style={styles.text}> Mute </Text>
          <View style={styles.button}>
            <Button
              title="Mute"
              color="#a7b0a9"
              onPress={() => Mute()}
            ></Button>
          </View>
        </View>
      </View>
      <View style={styles.function}>
        <Text style={styles.head}> Function </Text>
        <View style={styles.fixToText}>
          <Text style={styles.text}> Zone 1 </Text>
          <TouchableOpacity
            style={[
              styles.buttonTouch,
              { backgroundColor: zone_1 == true ? "green" : "red" },
            ]}
            onPress={() => onPress(0)}
          >
            <Text style={styles.textButton}>
              
              {zone_1 == true ? "OFF" : "ON"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fixToText}>
          <Text style={styles.text}> Zone 2 </Text>
          <TouchableOpacity
            style={[
              styles.buttonTouch,
              { backgroundColor: zone_2 == true ? "green" : "red" },
            ]}
            onPress={() => onPress(1)}
          >
            <Text style={styles.textButton}>
              
              {zone_2 == true ? "OFF" : "ON"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fixToText}>
          <Text style={styles.text}> Zone 3 </Text>
          <TouchableOpacity
            style={[
              styles.buttonTouch,
              { backgroundColor: zone_3 == true ? "green" : "red" },
            ]}
            onPress={() => onPress(2)}
          >
            <Text style={styles.textButton}>
              
              {zone_3 == true ? "OFF" : "ON"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fixToText}>
          <Text style={styles.text}> Zone 4 </Text>
          <TouchableOpacity
            style={[
              styles.buttonTouch,
              { backgroundColor: zone_4 == true ? "green" : "red" },
            ]}
            onPress={() => onPress(3)}
          >
            <Text style={styles.textButton}>
              
              {zone_4 == true ? "OFF" : "ON"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fixToText}>
          <Text style={styles.text}> Zone 5 </Text>
          <TouchableOpacity
            style={[
              styles.buttonTouch,
              { backgroundColor: zone_5 == true ? "green" : "red" },
            ]}
            onPress={() => onPress(4)}
          >
            <Text style={styles.textButton}>
              
              {zone_5 == true ? "OFF" : "ON"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default PanelScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 5,
  },
  controlpanel: {
    borderWidth: 4,
    borderRadius: 6,
  },

  head: {
    height: 40,
    backgroundColor: "rgba(24, 224, 101,0.4)",
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 20,
  },

  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "rgba(24, 224, 101,0.4)",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  button: {
    width: 200,
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "rgb(24, 224, 101)",
  },
  buttonTouch: {
    width: 200,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "green",
  },
  function: {
    borderWidth: 4,
    borderRadius: 6,
    marginTop: 10,
  },
  textButton: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
