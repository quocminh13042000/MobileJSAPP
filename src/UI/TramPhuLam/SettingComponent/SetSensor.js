import React, { useState } from "react";


import {
  View,
  Text,
  StyleSheet,
  CheckBox,
  ScrollView,
  Picker,
  TouchableOpacity,
  Alert,
} from "react-native";

import { SensorService } from "../../../services/sensor.service";
import { SendData } from "../../../services/websocket.service";




function Sensor() {
      const [selectedValue, setSelectedValue] = useState("0");
      var [listSensor, setListSensor] = useState([Number]);

      var [Sensor_z1, SetSensor_z1] = useState(SensorService.sensorZone_1);
      var [Sensor_z2, SetSensor_z2] = useState(SensorService.sensorZone_2);
      var [Sensor_z3, SetSensor_z3] = useState(SensorService.sensorZone_3);
      var [Sensor_z4, SetSensor_z4] = useState(SensorService.sensorZone_4);
      var [Sensor_z5, SetSensor_z5] = useState(SensorService.sensorZone_5);

  const changeSensor = (e, zone) => {
    if (listSensor.indexOf(e) == -1) {
      setListSensor(listSensor.concat(e));
    } else {
      setListSensor(listSensor.filter((index) => index !== e));
    }
    switch (zone) {
      case 1:
        Sensor_z1.map(
          (x) =>
            x.ID === e &&
            (x.CamId != selectedValue
              ? (x.CamId = selectedValue)
              : (x.CamId = "0"))
        );
        SetSensor_z1([...Sensor_z1]);
        break;
      case 2:
        Sensor_z2.map(
          (x) =>
            x.ID === e &&
            (x.CamId != selectedValue
              ? (x.CamId = selectedValue)
              : (x.CamId = "0"))
        );
        SetSensor_z2([...Sensor_z2]);
        break;
      case 3:
        Sensor_z3.map(
          (x) =>
            x.ID === e &&
            (x.CamId != selectedValue
              ? (x.CamId = selectedValue)
              : (x.CamId = "0"))
        );
        SetSensor_z3([...Sensor_z3]);
        break;
      case 4:
        Sensor_z4.map(
          (x) =>
            x.ID === e &&
            (x.CamId != selectedValue
              ? (x.CamId = selectedValue)
              : (x.CamId = "0"))
        );
        SetSensor_z4([...Sensor_z4]);
        break;
      case 5:
        Sensor_z5.map(
          (x) =>
            x.ID === e &&
            (x.CamId != selectedValue
              ? (x.CamId = selectedValue)
              : (x.CamId = "0"))
        );
        SetSensor_z5([...Sensor_z5]);
        break;
    }
  };

  const onSave = () => {
    if (selectedValue == "0") {
      Alert.alert("Choose Camera");
      return;
    }
    if (listSensor.length == 0) {
      Alert.alert("Choose new sensor");
      return;
    }
    for (let i = 0; i < listSensor.length; i++) {
      SendData("AddCamSensor", [listSensor[i], selectedValue]);
    }
    Alert.alert("Updated");
    SendData("LoadSensor", "");
    setSelectedValue("0");
  };

  const onchooseCam = (item) => {
    setListSensor([]);
    setSelectedValue(item);
  };

    return (
      <View style={styles.tabView}>
        <View style={styles.controlpanel}>
          <View style={styles.title}>
            <Text style={styles.head}> Set Sensor </Text>
            <Picker
              selectedValue={selectedValue}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => onchooseCam(itemValue)}
              itemStyle={styles.pickeritem}
              mode="dialog"
            >
              <Picker.Item label="Choose Cam" value="0" />
              <Picker.Item label="Camera 1" value="1" />
              <Picker.Item label="Camera 2" value="2" />
              <Picker.Item label="Camera 3" value="3" />
              <Picker.Item label="Camera 4" value="4" />
              <Picker.Item label="Camera 5" value="5" />
            </Picker>
            <TouchableOpacity onPress={() => onSave()}>
              <Text
                style={[
                  styles.head,
                  styles.picker,
                  {
                    fontSize: 15,
                    width: 60,
                    paddingLeft: 10,
                    padding: 10,
                    margin: 5,
                    backgroundColor: "#fff",
                  },
                ]}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
          {selectedValue == "0" ? null : (
            <ScrollView>
              <View style={styles.fixToText}>
                <Text style={styles.text}> Zone 1 </Text>
                <View style={styles.flex}>
                  <View style={styles.listSensor}>
                    
                    {Sensor_z1.slice(0, 4).map((item, index) => (
                      <View style={styles.checkboxContainer} key={index}>
                        <CheckBox
                          value={item.CamId == selectedValue ? true : false}
                          onValueChange={() => changeSensor(item.ID, 1)}
                          style={styles.checkbox}
                        />
                        <Text style={styles.label}> S {item.ID} </Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.listSensor}>
                    
                    {Sensor_z1.slice(4, 8).map((item, index) => (
                      <View style={styles.checkboxContainer} key={index}>
                        <CheckBox
                          value={item.CamId == selectedValue ? true : false}
                          onValueChange={() => changeSensor(item.ID, 1)}
                          style={styles.checkbox}
                        />
                        <Text style={styles.label}> S {item.ID} </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.fixToText}>
                <Text style={styles.text}> Zone 2 </Text>
                <View style={styles.flex}>
                  <View style={styles.listSensor}>
                    
                    {Sensor_z2.slice(0, 4).map((item, index) => (
                      <View style={styles.checkboxContainer} key={index}>
                        <CheckBox
                          value={item.CamId == selectedValue ? true : false}
                          onValueChange={() => changeSensor(item.ID, 2)}
                          style={styles.checkbox}
                        />
                        <Text style={styles.label}> S {item.ID} </Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.listSensor}>
                    
                    {Sensor_z2.slice(4, 8).map((item, index) => (
                      <View style={styles.checkboxContainer} key={index}>
                        <CheckBox
                          value={item.CamId == selectedValue ? true : false}
                          onValueChange={() => changeSensor(item.ID, 2)}
                          style={styles.checkbox}
                        />
                        <Text style={styles.label}> S {item.ID} </Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.listSensor}>
                    
                    {Sensor_z2.slice(8, 12).map((item, index) => (
                      <View style={styles.checkboxContainer} key={index}>
                        <CheckBox
                          value={item.CamId == selectedValue ? true : false}
                          onValueChange={() => changeSensor(item.ID, 2)}
                          style={styles.checkbox}
                        />
                        <Text style={styles.label}> S {item.ID} </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.fixToText}>
                <Text style={styles.text}> Zone 3 </Text>
                <View style={styles.flex}>
                  <View style={styles.listSensor}>
                    
                    {Sensor_z3.map((item, index) => (
                      <View style={styles.checkboxContainer} key={index}>
                        <CheckBox
                          value={item.CamId == selectedValue ? true : false}
                          onValueChange={() => changeSensor(item.ID, 3)}
                          style={styles.checkbox}
                        />
                        <Text style={styles.label}> S {item.ID} </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.fixToText}>
                <Text style={styles.text}> Zone 4 </Text>
                <View style={styles.flex}>
                  <View style={styles.listSensor}>
                    
                    {Sensor_z4.slice(0, 4).map((item, index) => (
                      <View style={styles.checkboxContainer} key={index}>
                        <CheckBox
                          value={item.CamId == selectedValue ? true : false}
                          onValueChange={() => changeSensor(item.ID, 4)}
                          style={styles.checkbox}
                        />
                        <Text style={styles.label}> S {item.ID} </Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.listSensor}>
                    
                    {Sensor_z4.slice(4, 8).map((item, index) => (
                      <View style={styles.checkboxContainer} key={index}>
                        <CheckBox
                          value={item.CamId == selectedValue ? true : false}
                          onValueChange={() => changeSensor(item.ID, 4)}
                          style={styles.checkbox}
                        />
                        <Text style={styles.label}> S {item.ID} </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
              <View style={styles.fixToText}>
                <Text style={styles.text}> Zone 5 </Text>
                <View style={styles.flex}>
                  <View style={styles.listSensor}>
                    
                    {Sensor_z5.slice(0, 4).map((item, index) => (
                      <View style={styles.checkboxContainer} key={index}>
                        <CheckBox
                          value={item.CamId == selectedValue ? true : false}
                          onValueChange={() => changeSensor(item.ID, 5)}
                          style={styles.checkbox}
                        />
                        <Text style={styles.label}> S {item.ID} </Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.listSensor}>
                    
                    {Sensor_z5.slice(4, 8).map((item, index) => (
                      <View style={styles.checkboxContainer} key={index}>
                        <CheckBox
                          value={item.CamId == selectedValue ? true : false}
                          onValueChange={() => changeSensor(item.ID, 5)}
                          style={styles.checkbox}
                        />
                        <Text style={styles.label}> S {item.ID} </Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
export default  Sensor;

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
    marginTop: 5,
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
    width: "70%",
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
    justifyContent: "space-between",
    backgroundColor: "rgba(24, 224, 101,0.4)",
    borderWidth: 4,
    width: 150,
    paddingLeft: 50,
  },
  pickeritem: {
    fontSize: 25,
    fontWeight: "bold",
  },
  scrollView: {
    backgroundColor: "#fff",
  },
});
