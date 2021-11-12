import React, { Component, useState } from "react";

import {
  View,
  Text,
  Modal,
  Pressable,
  Alert,
  StyleSheet,
  Picker,
} from "react-native";
import Svg, { Image, G, Rect } from "react-native-svg";
import { WebsocketService } from "../../../services/websocket.service";

import { interval, Subscription } from "rxjs";
import { WebView } from "react-native-webview";
import { CameraService } from "../../../services/camera.service";

var updateSubscription = new Subscription();



function Floor_2_Screen()  {
    var [en_z5, setData_5] = useState(WebsocketService.Area1.Floor[4]);
    var [zone_5, setDataZone5] = useState([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    var [idCam, setIdCam] = useState(CameraService.Camera.zone5);
    const [selectedValue, setSelectedValue] = useState(1);
    updateSubscription = interval(2000).subscribe((val) => {
      setData_5((x) => (x = WebsocketService.Area1.Floor[4]));
      setDataZone5((x) => (x = WebsocketService.Area1_sensor.zone_5));
    });
  const [modalVisible, setModalVisible] = useState(false);
  but = () => {
    setModalVisible(!modalVisible);
  };

  changeCam = (x) => {
    if (x == 1) {
      setIdCam(CameraService.Camera.zone5);
    } else {
      setIdCam(CameraService.Camera.zone1);
    }
    setSelectedValue(x);
  };


    return (
      <View>
        <Svg width="100%" height="100%">
          <Image
            width="100%"
            height="100%"
            xlinkHref={require("./svg/Floor2.png")}
          />
          {zone_5[2] == false ? null : (
            <Image
              x="65%"
              y="83%"
              width="7%"
              height="5%"
              id="zone5_1"
              opacity="0.65"
              xlinkHref={require("./svg/sensor.png")}
            />
          )}
          {zone_5[5] == false ? null : (
            <Image
              x="53%"
              y="83%"
              width="7%"
              height="5%"
              id="zone5_2"
              opacity="0.65"
              xlinkHref={require("./svg/sensor.png")}
            />
          )}
          {zone_5[4] == false ? null : (
            <Image
              x="51%"
              y="70%"
              width="7%"
              height="5%"
              id="zone5_3"
              opacity="0.65"
              xlinkHref={require("./svg/sensor.png")}
            />
          )}
          {zone_5[1] == false ? null : (
            <Image
              x="64%"
              y="71%"
              width="7%"
              height="5%"
              id="zone5_4"
              opacity="0.65"
              xlinkHref={require("./svg/sensor.png")}
            />
          )}
          {zone_5[0] == false ? null : (
            <Image
              x="63%"
              y="59%"
              width="7%"
              height="5%"
              id="zone4_5"
              opacity="0.65"
              xlinkHref={require("./svg/sensor.png")}
            />
          )}
          {zone_5[3] == false ? null : (
            <Image
              x="51%"
              y="59%"
              width="7%"
              height="5%"
              id="zone4_6"
              opacity="0.65"
              xlinkHref={require("./svg/sensor.png")}
            />
          )}
          {zone_5[6] == false ? null : (
            <Image
              x="72%"
              y="59%"
              width="7%"
              height="5%"
              id="zone4_7"
              opacity="0.65"
              xlinkHref={require("./svg/sensor.png")}
            />
          )}
          {zone_5[7] == false ? null : (
            <Image
              x="43%"
              y="81%"
              width="7%"
              height="5%"
              id="zone3_1"
              opacity="0.65"
              xlinkHref={require("./svg/sensor.png")}
            />
          )}
          {en_z5 == true ? (
            <Image
              x="77%"
              y="71%"
              width="15%"
              height="15%"
              id="zone3_1"
              xlinkHref={require("./svg/Enable.png")}
            />
          ) : (
            <Image
              x="77%"
              y="71%"
              width="15%"
              height="15%"
              id=""
              xlinkHref={require("./svg/Disable.png")}
            />
          )}
          <G onPress={() => but()} x="41%" y="60%">
            <Rect
              x="41%"
              y="60%"
              width="38%"
              height="34%"
              fill="violet"
              opacity="0.15"
            ></Rect>
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
                  <Text style={styles.textStyle}> X </Text>
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

export default  Floor_2_Screen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    justifyContent: "flex-end",
    marginLeft: 40,
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
