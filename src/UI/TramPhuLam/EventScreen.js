import React, { Component } from "react";
import { render } from "react-dom";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  FlatList,
  Alert,
  Platform,
  Picker,
  TextInput,
} from "react-native";
import { WebsocketService, SendData } from "../../services/websocket.service";
import { useState } from "react";

import { DataTable } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

function EventScreen() {
  var [listData, setList] = useState(WebsocketService.eventAlarm);

  const [modalVisible, setModalVisible] = useState(false);
  var [filterText, setFiterText] = useState("");

  //Set From Date-----------------------------------------------------------
  var fromDate;
  const [dateFrom, setDateFrom] = useState(new Date());
  const [showFrom, setShowFrom] = useState(false);
  var toDate;
  const [dateTo, setDateTo] = useState(new Date());
  const [showTo, setShowTo] = useState(false);
  const [selectedValue, setSelectedValue] = useState("All Event");
  const onsetFrom = (event, selectedDate) => {
    fromDate = selectedDate || dateFrom;
    setShowFrom(Platform.OS === "ios");
    setDateFrom(fromDate);
  };
  const showFromMode = (currentMode) => {
    setShowFrom(true);
  };

  const onsetTo = (event, selectedDate) => {
    toDate = selectedDate || dateTo;
    setShowTo(Platform.OS === "ios");
    setDateTo(toDate);
  };
  const showToMode = (currentMode) => {
    setShowTo(true);
  };
  const filter = () => {
    setModalVisible(!modalVisible);
    setFilter();
  };

  const onCancel = () => {
    setSelectedValue("All Event");
    setDateFrom(new Date());
    setDateTo(new Date());
    setFiterText("");
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.controlpanel}>
        <View style={styles.fixToText}>
          <Text style={styles.header}> Event </Text>
          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                justifyContent: "space-between",
                alignSelf: "center",
                color: "white",
              }}
            >
              Filter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.table}>
        <DataTable>
          <DataTable.Header style={styles.tableTitle}>
            <DataTable.Title style={{ width: "40%" }}> Time </DataTable.Title>
            <DataTable.Title style={{ width: "5%" }}> Status </DataTable.Title>
            <DataTable.Title style={{ width: "35%" }}> Area </DataTable.Title>
            <DataTable.Title style={{ width: "10%" }} numeric>
              Zone
            </DataTable.Title>
            <DataTable.Title
              style={{ width: "10%" }}
              sortDirection="descending"
              numeric
            >
              Sensor
            </DataTable.Title>
          </DataTable.Header>
          <FlatList
            data={listData}
            renderItem={({ item }) => (
              <DataTable.Row style={{ paddingLeft: 5 }}>
                <DataTable.Cell style={{ width: "40%", paddingLeft: 5 }}>
                  
                  {item.Time}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: "5%", paddingLeft: 5 }}>
                  
                  {item.Status}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: "35%", paddingLeft: 5 }}>
                  
                  {item.Name}
                </DataTable.Cell>
                <DataTable.Cell
                  style={{ width: "10%", paddingLeft: 5 }}
                  numeric
                >
                  {item.Zone}
                </DataTable.Cell>
                <DataTable.Cell
                  style={{ width: "10%", paddingLeft: 5 }}
                  numeric
                >
                  {item.Sensor}
                </DataTable.Cell>
              </DataTable.Row>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </DataTable>
      </View>
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
              <Text style={styles.modalText}> Filter </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                paddingTop: 5,
              }}
            >
              <Picker
                selectedValue={selectedValue}
                style={[
                  styles.text,
                  {
                    height: 50,
                    borderRadius: 3,
                    borderStyle: "solid",
                    borderWidth: 4,
                  },
                ]}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item label="All Event" value="0" />
                <Picker.Item label="Today" value="1" />
                <Picker.Item label="Last Week" value="2" />
                <Picker.Item label="Last Month" value="3" />
                <Picker.Item label="Last Quarter" value="4" />
                <Picker.Item label="Last Year" value="5" />
                <Picker.Item label="Custom" value="6" />
              </Picker>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 5,
                }}
              >
                <Text style={styles.text}> Filter Name </Text>
                <TextInput
                  style={{ width: "50%", backgroundColor: "white" }}
                  value={filterText}
                  onChangeText={(text) => setFiterText(text)}
                />
              </View>
              {selectedValue != "6" ? null : (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingTop: 20,
                    }}
                  >
                    <Text style={styles.text}>
                      
                      {dateFrom.toString().slice(0, 15)}
                    </Text>
                    <Button
                      onPress={showFromMode}
                      title="From"
                      color="rgb(24, 224, 101)"
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingTop: 5,
                    }}
                  >
                    <Text style={styles.text}>
                      
                      {dateTo.toString().slice(0, 15)}
                    </Text>
                    <Button
                      onPress={showToMode}
                      title="To"
                      color="rgb(24, 224, 101)"
                    />
                  </View>
                </View>
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 20,
                }}
              >
                <Pressable
                  style={[styles.button1, styles.buttonClose, { width: 100 }]}
                  onPress={() => onCancel()}
                >
                  <Text style={styles.textStyle}> Cancel </Text>
                </Pressable>
                <Pressable
                  style={[styles.button1, styles.buttonClose, { width: 100 }]}
                  onPress={() => filter()}
                >
                  <Text style={styles.textStyle}> Filter </Text>
                </Pressable>
              </View>
            </View>
            {showFrom && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateFrom}
                is24Hour={true}
                display="default"
                onChange={onsetFrom}
              />
            )}
            {showTo && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dateTo}
                is24Hour={true}
                display="default"
                onChange={onsetTo}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default EventScreen;

function setFilter() {
  var query = ["", "", ""];
  var checkData = false;

  var a = new Date();
  switch (selectedValue) {
    case "0":
      break;
    case "1":
      query[2] = a.toJSON().slice(0, 10).replace(/-/g, "/").toString();
      query[1] = a.toJSON().slice(0, 10).replace(/-/g, "/").toString();
      checkData = true;
      console.log(query);
      break;
    case "2":
      let lastweek = new Date(a.getFullYear(), a.getMonth(), a.getDate() - 6);
      query[2] = lastweek.toJSON().slice(0, 10).replace(/-/g, "/").toString();
      query[1] = a.toJSON().slice(0, 10).replace(/-/g, "/").toString();
      checkData = true;
      console.log(query);
      break;
    case "3":
      let lastMonth = new Date(a.getFullYear(), a.getMonth() - 1, a.getDate());
      query[2] = lastMonth.toJSON().slice(0, 10).replace(/-/g, "/").toString();
      query[1] = a.toJSON().slice(0, 10).replace(/-/g, "/").toString();
      checkData = true;
      console.log(query);
      break;
    case "4":
      var startMonth = Math.floor(a.getMonth() / 3);
      switch (startMonth) {
        case 0:
          startMonth = 0;
          break;
        case 1:
          startMonth = 3;
          break;
        case 2:
          startMonth = 6;
          break;
        case 3:
          startMonth = 9;
          break;
      }
      var endMonth = startMonth + 3;
      var start = new Date(a.getFullYear(), startMonth, 2);
      var end = new Date(a.getFullYear(), endMonth);
      query[2] = start.toJSON().toString().slice(0, 10).replace(/-/g, "/");
      query[1] = end.toJSON().toString().slice(0, 10).replace(/-/g, "/");
      console.log(start + " " + end);
      console.log(query);
      break;
    case "5":
      let lastYear = new Date(a.getFullYear() - 1, a.getMonth(), a.getDate());
      query[2] = lastYear.toJSON().slice(0, 10).replace(/-/g, "/").toString();
      query[1] = a.toJSON().slice(0, 10).replace(/-/g, "/").toString();
      checkData = true;
      console.log(query);
      break;
    case "6":
      query[2] = dateFrom.toJSON().slice(0, 10).replace(/-/g, "/").toString();
      query[1] = dateTo.toJSON().slice(0, 10).replace(/-/g, "/").toString();
      checkData = true;
      console.log(query);
      break;
  }

  if (filterText != "") {
    query[0] = filterText;
    setFiterText("");
    checkData = true;
  }
  if (checkData) {
    SendData("Filter", query);
  } else {
    SendData("Filter", "");
  }

  setTimeout(() => {
    setList((x) => (x = WebsocketService.eventAlarm));
  }, 1000);
  setSelectedValue("All Event");
  setDateFrom(new Date());
  setDateTo(new Date());
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  controlpanel: {
    borderWidth: 4,
    borderRadius: 6,
  },
  header: {
    backgroundColor: "rgba(24, 224, 101,0.4)",
    fontSize: 25,
    fontWeight: "bold",
    paddingLeft: 20,
    justifyContent: "center",
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
    backgroundColor: "rgb(128, 235, 160)",
  },
  function: {
    borderWidth: 4,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonSearch: {
    width: 200,
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "black",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  table: {
    width: "100%",
    marginTop: 5,
    padding: "1%",
    backgroundColor: "white",
  },
  tableTitle: {
    paddingLeft: 5,
    backgroundColor: "#7C7C7C",
    fontWeight: "bold",
    fontSize: 15,
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  tableRow: {
    paddingLeft: 5,
    fontWeight: "bold",
    fontSize: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "rgb(128, 235, 160)",
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
  button1: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "rgb(24, 224, 101)",
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
});
