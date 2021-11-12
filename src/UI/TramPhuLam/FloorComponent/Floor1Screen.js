import React, { Component, useState } from "react";
import { render } from "react-dom";

import {
  View,
  StyleSheet,
  Text,
  Alert,
  Modal,
  Pressable,
  TouchableOpacity,
  
  Picker,
} from "react-native";

import Svg, { Image, G, Rect } from "react-native-svg";
import { WebsocketService } from "../../../services/websocket.service";

import { interval, Subscription } from "rxjs";
import { WebView } from "react-native-webview";
import { CameraService } from "../../../services/camera.service";

function Floor_1_Screen() {
  var cam = CameraService.Camera;
    var zone_1 = [false, false, false, false, false, false];
    var zone_2 = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    var zone_3 = [false, false, false];
    var zone_4 = [false, false, false, false, false, false, false];
  var [idCam, setIdCam] = useState(cam.zone1);
  var [id, setID] = useState(0);
  var [en_z1, setData_1] = useState(WebsocketService.Area1.Floor[0]);
  var [en_z2, setData_2] = useState(WebsocketService.Area1.Floor[1]);
  var [en_z3, setData_3] = useState(WebsocketService.Area1.Floor[2]);
  var [en_z4, setData_4] = useState(WebsocketService.Area1.Floor[3]);
  const [selectedValue, setSelectedValue] = useState(1);
  var updateSubscription = new Subscription();
   const [modalVisible, setModalVisible] = useState(false);
   
  updateSubscription = interval(1000).subscribe((val) => {
    setData_1((x) => (x = WebsocketService.Area1.Floor[0]));
    setData_2((x) => (x = WebsocketService.Area1.Floor[1]));
    setData_3((x) => (x = WebsocketService.Area1.Floor[2]));
    setData_4((x) => (x = WebsocketService.Area1.Floor[3]));
  });
  but = (idzone) => {
    setModalVisible(!modalVisible);
    addIdCam(idzone);
    setID(idzone);
  };

  addIdCam = (idzone) => {
    switch (idzone) {
      case 1:
        setIdCam(cam.zone1);
        break;
      case 2:
        setIdCam(cam.zone2);
        break;
      case 3:
        setIdCam(cam.zone3);
        break;
      case 4:
        setIdCam(cam.zone4);
        break;
    }
  };

  changeCam = (x) => {
    if (x == 1) {
      addIdCam(id);
    } else {
      setIdCam(cam.zone5);
    }
    setSelectedValue(x);
  };

  return (
    <View>
      <Svg width="100%" height="100%">
        <Image
          width="100%"
          height="100%"
          xlinkHref={require("./svg/Floor1.png")}
        />
        {zone_4[0] == false ? null : (
          <Image
            id="zone4_1"
            x="69%"
            y="15%"
            width="7%"
            height="5%"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_4[1] == false ? null : (
          <Image
            x="62%"
            y="25%"
            width="7%"
            height="5%"
            id="zone4_2"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_4[4] == false ? null : (
          <Image
            x="45%"
            y="25%"
            width="7%"
            height="5%"
            id="zone4_3"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_4[3] == false ? null : (
          <Image
            x="45%"
            y="14%"
            width="7%"
            height="5%"
            id="zone4_4"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_4[6] == false ? null : (
          <Image
            x="46%"
            y="10%"
            width="7%"
            height="5%"
            id="zone4_5"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_4[2] == false ? null : (
          <Image
            x="29%"
            y="13%"
            width="7%"
            height="5%"
            id="zone4_6"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_4[5] == false ? null : (
          <Image
            x="29%"
            y="26%"
            width="7%"
            height="5%"
            id="zone4_7"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_3[1] == false ? null : (
          <Image
            x="61%"
            y="33%"
            width="7%"
            height="5%"
            id="zone3_1"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_3[2] == false ? null : (
          <Image
            x="52%"
            y="45%"
            width="7%"
            height="5%"
            id="zone3_2"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_3[0] == false ? null : (
          <Image
            x="71%"
            y="45%"
            width="7%"
            height="5%"
            id="zone3_3"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_2[8] == false ? null : (
          <Image
            x="40%"
            y="31%"
            width="7%"
            height="5%"
            id="zone2_1"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_2[2] == false ? null : (
          <Image
            x="38%"
            y="37%"
            width="7%"
            height="5%"
            id="zone2_2"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_2[5] == false ? null : (
          <Image
            x="21%"
            y="37%"
            width="7%"
            height="5%"
            id="zone2_3"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_2[6] == false ? null : (
          <Image
            x="21%"
            y="54%"
            width="7%"
            height="5%"
            id="zone2_4"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_2[7] == false ? null : (
          <Image
            x="21%"
            y="73%"
            width="7%"
            height="5%"
            id="zone2_5"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_2[3] == false ? null : (
          <Image
            x="37%"
            y="54%"
            width="7%"
            height="5%"
            id="zone2_6"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_2[4] == false ? null : (
          <Image
            x="37%"
            y="73%"
            width="7%"
            height="5%"
            id="zone2_7"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_2[10] == false ? null : (
          <Image
            x="32%"
            y="79%"
            width="7%"
            height="5%"
            id="zone2_8"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_2[9] == false ? null : (
          <Image
            x="47%"
            y="57%"
            width="7%"
            height="5%"
            id="zone2_9"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_2[1] == false ? null : (
          <Image
            x="52%"
            y="59%"
            width="7%"
            height="5%"
            id="zone2_10"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_2[0] == false ? null : (
          <Image
            x="71%"
            y="59%"
            width="7%"
            height="5%"
            id="zone2_11"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_1[1] == false ? null : (
          <Image
            x="53%"
            y="76%"
            width="7%"
            height="5%"
            id="zone1_1"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_1[3] == false ? null : (
          <Image
            x="34%"
            y="83%"
            width="7%"
            height="5%"
            id="zone1_2"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_1[5] == false ? null : (
          <Image
            x="29%"
            y="83%"
            width="7%"
            height="5%"
            id="zone1_3"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_1[0] == false ? null : (
          <Image
            x="69%"
            y="87%"
            width="7%"
            height="5%"
            id="zone1_4"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_1[4] == false ? null : (
          <Image
            x="54%"
            y="94%"
            width="7%"
            height="5%"
            id="zone1_5"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {zone_1[2] == false ? null : (
          <Image
            x="54%"
            y="88%"
            width="7%"
            height="5%"
            id="zone1_6"
            opacity="0.65"
            xlinkHref={require("./svg/sensor.png")}
          />
        )}
        {en_z1 == true ? (
          <Image
            x="80%"
            y="80%"
            width="15%"
            height="15%"
            id=""
            xlinkHref={require("./svg/Enable.png")}
          />
        ) : (
          <Image
            x="80%"
            y="80%"
            width="15%"
            height="15%"
            id=""
            xlinkHref={require("./svg/Disable.png")}
          />
        )}
        {en_z2 == true ? (
          <Image
            x="80%"
            y="55%"
            width="15%"
            height="15%"
            id=""
            xlinkHref={require("./svg/Enable.png")}
          />
        ) : (
          <Image
            x="80%"
            y="55%"
            width="15%"
            height="15%"
            id=""
            xlinkHref={require("./svg/Disable.png")}
          />
        )}
        {en_z3 == true ? (
          <Image
            x="80%"
            y="35%"
            width="15%"
            height="15%"
            id=""
            xlinkHref={require("./svg/Enable.png")}
          />
        ) : (
          <Image
            x="80%"
            y="35%"
            width="15%"
            height="15%"
            id=""
            xlinkHref={require("./svg/Disable.png")}
          />
        )}
        {en_z4 == true ? (
          <Image
            x="80%"
            y="15%"
            width="15%"
            height="15%"
            id=""
            xlinkHref={require("./svg/Enable.png")}
          />
        ) : (
          <Image
            x="80%"
            y="15%"
            width="15%"
            height="15%"
            id=""
            xlinkHref={require("./svg/Disable.png")}
          />
        )}
        <G onPress={() => but(4)} x="20%" y="12%">
          <Rect
            x="20%"
            y="12%"
            width="58%"
            height="19%"
            strokeWidth="3"
            opacity="0.1"
          ></Rect>
        </G>
        <G onPress={() => but(3)} x="49%" y="32%">
          <Rect
            x="50%"
            y="32%"
            width="29%"
            height="19%"
            strokeWidth="3"
            opacity="0.15"
          ></Rect>
        </G>
        <G onPress={() => but(2)} x="20%" y="32%">
          <Rect x="20%" y="32%" width="28%" height="50%" opacity="0.15"></Rect>
        </G>
        <G onPress={() => but(2)} x="50%" y="32%">
          <Rect x="48%" y="52%" width="30%" height="19%" opacity="0.15"></Rect>
        </G>
        <G onPress={() => but(1)} x="50%" y="72%">
          <Rect x="49%" y="72%" width="30%" height="12%" opacity="0.15"></Rect>
        </G>
        <G onPress={() => but(1)} x="50%" y="84%">
          <Rect x="29%" y="83%" width="50%" height="15%" opacity="0.15"></Rect>
        </G>
      </Svg>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        style={{ height: 200 }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.modalText}> List Camera of Zone </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}> Close </Text>
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "rgb(24, 224, 101)",
              }}
            >
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => changeCam(itemValue)}
                mode="dialog"
                itemStyle={styles.pickeritem}
                style={styles.picker}
              >
                <Picker.Item label="Camera 1" value="1" />
                <Picker.Item label="Camera 2" value="2" />
              </Picker>
            </View>
            <View
              style={{
                width: "100%",
                height: 250,
                marginTop: 20,
                borderWidth: 2,
              }}
            >
              <WebView
                style={{ height: 400, width: 350 }}
                source={{ uri: idCam }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Floor_1_Screen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 50,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "lightgray",
    justifyContent: "flex-end",
    marginLeft: 60,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    color: "#000",
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  picker: {
    justifyContent: "space-between",
    backgroundColor: "rgb(24, 224, 101)",
    borderWidth: 4,
    width: 150,
    paddingLeft: 50,
  },
  pickeritem: {
    fontSize: 25,
    backgroundColor: "rgb(24, 224, 101)",
    fontWeight: "bold",
  },
});
