import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { CameraService } from "../../../services/camera.service";
import { useState } from "react";
import { SendData } from "../../../services/websocket.service";
/*
var [cam_1, setCam_1] = useState(CameraService.Camera.zone1);
var [cam_2, setCam_2] = useState(CameraService.Camera.zone2);
var [cam_3, setCam_3] = useState(CameraService.Camera.zone3);
var [cam_4, setCam_4] = useState(CameraService.Camera.zone4);
var [cam_5, setCam_5] = useState(CameraService.Camera.zone5);*/
var cam_1 = CameraService.Camera.zone1;
var cam_2 = CameraService.Camera.zone2;
var cam_3 = CameraService.Camera.zone3;
var cam_4 = CameraService.Camera.zone4;
var cam_5 = CameraService.Camera.zone5;

function CameraID() {
  var [cam_1, setCam_1] = useState(CameraService.Camera.zone1);
  var [cam_2, setCam_2] = useState(CameraService.Camera.zone2);
  var [cam_3, setCam_3] = useState(CameraService.Camera.zone3);
  var [cam_4, setCam_4] = useState(CameraService.Camera.zone4);
  var [cam_5, setCam_5] = useState(CameraService.Camera.zone5);
  const onSave = () => {
    SendData("SetCam", [1, cam_1]);
    SendData("SetCam", [2, cam_2]);
    SendData("SetCam", [3, cam_3]);
    SendData("SetCam", [4, cam_4]);
    SendData("SetCam", [5, cam_5]);
    Alert.alert("Saved");
  };
  const onCancel = () => {
    setCam_1(CameraService.Camera.zone1);
    setCam_2(CameraService.Camera.zone2);
    setCam_3(CameraService.Camera.zone3);
    setCam_4(CameraService.Camera.zone4);
    setCam_5(CameraService.Camera.zone5);
  };

  return (
    <View style={styles.tabView}>
      <View style={styles.controlpanel}>
        <Text style={styles.head}> Set Camera ID </Text>
        <View style={styles.fixToText}>
          <Text style={styles.text}> Camera 1 </Text>
          <TextInput
            style={styles.input}
            value={cam_1}
            onChangeText={(x) => setCam_1(x)}
          />
        </View>
        <View style={styles.fixToText}>
          <Text style={styles.text}> Camera 2 </Text>
          <TextInput
            style={styles.input}
            value={cam_2}
            onChangeText={(x) => setCam_2(x)}
          />
        </View>
        <View style={styles.fixToText}>
          <Text style={styles.text}> Camera 3 </Text>
          <TextInput
            style={styles.input}
            value={cam_3}
            onChangeText={(x) => setCam_3(x)}
          />
        </View>
        <View style={styles.fixToText}>
          <Text style={styles.text}> Camera 4 </Text>
          <TextInput
            style={styles.input}
            value={cam_4}
            onChangeText={(x) => setCam_4(x)}
          />
        </View>
        <View style={styles.fixToText}>
          <Text style={styles.text}> Camera 5 </Text>
          <TextInput
            style={styles.input}
            value={cam_5}
            onChangeText={(x) => setCam_5(x)}
          />
        </View>
        <View style={[styles.fixToText, { justifyContent: "flex-end" }]}>
          <TouchableOpacity
            style={{ backgroundColor: "white", margin: 5 }}
            onPress={() => onCancel()}
          >
            <Text style={[styles.text, { padding: 5 }]}> Cancel </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "white", margin: 5 }}
            onPress={() => onSave()}
          >
            <Text style={[styles.text, { padding: 5 }]}> Save </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default CameraID;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#DDDDDD",
  },
  tabView: {
    padding: 10,
    backgroundColor: "#fff",
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
  text: {
    paddingTop: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "rgba(24, 224, 101,0.4)",
    borderTopWidth: 2,
  },
  input: {
    fontSize: 15,
    height: 30,
    width: "80%",
    backgroundColor: "#fff",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
    width: "23%",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  listSensor: {
    flexDirection: "row",
  },
  flex: {
    flexDirection: "column",
    backgroundColor: "#fff",
    width: "80%",
  },
  title: {
    flexDirection: "row",
    backgroundColor: "rgba(24, 224, 101,0.4)",
    fontSize: 25,
    fontWeight: "bold",
  },
  picker: {
    height: 40,
    backgroundColor: "rgba(24, 224, 101,0.4)",

    width: 150,
  },
  pickeritem: {
    fontSize: 25,
    fontWeight: "bold",
  },
  scrollView: {
    backgroundColor: "#fff",
  },
});
