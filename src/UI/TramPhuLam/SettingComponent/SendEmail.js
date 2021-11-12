import React, { Component } from "react";
import { render } from "react-dom";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  FlatList,
  CheckBox,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { UserServices } from "../../../services/User.service";
import { useState } from "react";
import { SendData } from "../../../services/websocket.service";
/*
var [user, listUser] = useState(UserServices.listEmail);

var [newEmail, setNewEmail] = useState("");
var [listEmailDel, setListEmaildel] = useState([""]);*/
var check;

var user = UserServices.listEmail;
var newEmail = "";
var listEmailDel = [""];

function SendEmail() {
  var [user, listUser] = useState(UserServices.listEmail);

  var [newEmail, setNewEmail] = useState("");
  var [listEmailDel, setListEmaildel] = useState([""]);
  const addEmail = async () => {
    check = false;
    UserServices.listEmail.map((x) => x.Email === newEmail && (check = true));
    if (newEmail == "") check = true;
    if (check) {
      Alert.alert("Email already exist");
    } else {
      SendData("AddEmail", newEmail);
      setNewEmail("");
    }
    SendData("getEmail", "");
    await setTimeout(() => {
      listUser(UserServices.listEmail);
    }, 100);
  };
  const Addlist = (a) => {
    if (listEmailDel.indexOf(a) == -1) {
      setListEmaildel(listEmailDel.concat(a));
    } else {
      setListEmaildel(listEmailDel.filter((index) => index !== a));
    }
  };
  const del = async () => {
    setListEmaildel(
      listEmailDel
        .filter((x, index) => listEmailDel.indexOf(x) === index)
        .filter((index) => index !== "")
    );
    for (let i = 0; i < listEmailDel.length; i++) {
      SendData("DelEmail", listEmailDel[i]);
    }
    setListEmaildel([""]);

    SendData("getEmail", "");
    await setTimeout(() => {
      listUser(UserServices.listEmail);
    }, 100);
  };
  const loadEmail = () => {
    setListEmaildel([""]);
    listUser(UserServices.listEmail);
    Alert.alert("Load all Email");
  };

  return (
    <View style={styles.tabView}>
      <View style={styles.controlpanel}>
        <View style={styles.fixToText}>
          <Text style={styles.text}>New Email</Text>
          <TextInput
            style={styles.input}
            value={newEmail}
            onChangeText={(x) => setNewEmail(x)}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Add Email"
            color="#a7b0a9"
            onPress={() => addEmail()}
          ></Button>
        </View>
      </View>
      <View style={[styles.controlpanel, { marginTop: 5 }]}>
        <Text style={{ fontSize: 20, paddingLeft: 5, fontWeight: "bold" }}>
          List Mail
        </Text>
        <FlatList
          data={user}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <CheckBox
                onValueChange={() => Addlist(item.Email)}
                value={listEmailDel.indexOf(item.Email) == -1 ? false : true}
              ></CheckBox>
              <Text style={styles.item}>{item.Email}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <TouchableOpacity onPress={() => loadEmail()}>
          <Text style={styles.button1}>Load</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => del()}>
          <Text style={styles.button1}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default SendEmail;

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
    width: "79%",
    backgroundColor: "#fff",
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

  scrollView: {
    backgroundColor: "#fff",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  button1: {
    backgroundColor: "#DDDDDD",
    fontSize: 15,
    fontWeight: "bold",
    padding: 5,
    margin: 4,
  },
});
