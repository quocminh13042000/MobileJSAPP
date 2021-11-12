import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Loading from "../Loading";
import { useState } from "react";
import { SendData } from "../../services/websocket.service";
import { UserServices } from "../../services/User.service";
import Ionicons from "react-native-vector-icons/Ionicons";

/*
    var [oldPW, setOldPW] = useState('');
    var [newPW, setNewPw] = useState('');
    var [reenter, setReEnter] = useState('');
    var [err, setErr] = useState('')
    var [load, SetLoad] = useState(false)
    var [hide1, setHide1] = useState(true);
    var [hide2, setHide2] = useState(true);
    var [hide3, setHide3] = useState(true);*/

var oldPW = "";
var newPW = "";
var reenter = "";
var err = "";
var load = false;
var hide1 = true;
var hide2 = true;
var hide3 = true;

export default class Registration extends React.Component {
  resetPW = async () => {
    console.log(UserServices.Password);
    setErr("");
    if (oldPW === "" || newPW === "" || reenter === "") {
      setErr("Missing input");
      return;
    }
    if (oldPW != UserServices.Password) {
      setErr("Old password is incorrect");
      return;
    }
    if (newPW.length < 6) {
      setErr("Password length must be more than 6");
      return;
    }
    if (newPW != reenter) {
      setErr("Re-enter incorrect password");
      return;
    }
    SetLoad(true);
    SendData("changePW", [UserServices.USername, newPW]);
    await setTimeout(() => {
      SetLoad(false);
      UserServices.Password = newPW;
      Alert.alert("Change password");
      setOldPW("");
      setNewPw(""), setReEnter("");
    }, 1000);
  };
  view = (x) => {
    switch (x) {
      case 1:
        setHide1(!hide1);
        break;
      case 2:
        setHide2(!hide2);
        break;
      case 3:
        setHide3(!hide3);
        break;
    }
  };

  render() {
    return (
      <View>
        {load ? (
          <View style={[loadingStyle.container, loadingStyle.horizontal]}>
            <Loading />
          </View>
        ) : (
          <View style={styles.tabView}>
            <View style={styles.controlpanel}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  paddingLeft: 15,
                  marginBottom: 10,
                }}
              >
                Resigter
              </Text>
              <Text style={{ paddingLeft: 10 }}>
                You do not have permission to register
              </Text>
            </View>
            <View style={[styles.controlpanel, { marginTop: 15 }]}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  paddingLeft: 15,
                  marginBottom: 10,
                }}
              >
                Change Password
              </Text>
              <View style={styles.inputText}>
                <TextInput
                  placeholder="Old password"
                  secureTextEntry={hide1}
                  style={[styles.username, { fontSize: 17 }]}
                  value={oldPW}
                  onChangeText={(user) => setOldPW(user)}
                />
                <TouchableOpacity
                  style={styles.buttonHide}
                  onPress={() => view(1)}
                >
                  {hide1 ? (
                    <Ionicons
                      name={"eye-outline"}
                      color={"black"}
                      size={25}
                      style={{
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "space-between",
                      }}
                    ></Ionicons>
                  ) : (
                    <Ionicons
                      name={"eye-off-outline"}
                      color={"black"}
                      size={25}
                      style={{
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "space-between",
                      }}
                    ></Ionicons>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.inputText}>
                <TextInput
                  placeholder="New password"
                  secureTextEntry={hide2}
                  style={[styles.username, { fontSize: 17 }]}
                  value={newPW}
                  onChangeText={(user) => setNewPw(user)}
                />
                <TouchableOpacity
                  style={styles.buttonHide}
                  onPress={() => view(2)}
                >
                  {hide2 ? (
                    <Ionicons
                      name={"eye-outline"}
                      color={"black"}
                      size={25}
                      style={{
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "space-between",
                      }}
                    ></Ionicons>
                  ) : (
                    <Ionicons
                      name={"eye-off-outline"}
                      color={"black"}
                      size={25}
                      style={{
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "space-between",
                      }}
                    ></Ionicons>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.inputText}>
                <TextInput
                  placeholder="Re-enter"
                  secureTextEntry={hide3}
                  style={[styles.username, { fontSize: 17 }]}
                  value={reenter}
                  onChangeText={(user) => setReEnter(user)}
                />
                <TouchableOpacity
                  style={styles.buttonHide}
                  onPress={() => view(3)}
                >
                  {hide3 ? (
                    <Ionicons
                      name={"eye-outline"}
                      color={"black"}
                      size={25}
                      style={{
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "space-between",
                      }}
                    ></Ionicons>
                  ) : (
                    <Ionicons
                      name={"eye-off-outline"}
                      color={"black"}
                      size={25}
                      style={{
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "space-between",
                      }}
                    ></Ionicons>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  paddingLeft: 30,
                  backgroundColor: "rgb(128, 235, 160)",
                  width: "40%",
                  margin: 10,
                  padding: 5,
                  borderRadius: 5,
                }}
                onPress={() => resetPW()}
              >
                <Text
                  style={[
                    styles.textButton,
                    {
                      fontSize: 15,
                      color: "black",
                      justifyContent: "flex-start",
                      alignSelf: "flex-start",
                    },
                  ]}
                >
                  Change password
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  paddingLeft: 15,
                  marginBottom: 10,
                }}
              >
                {err}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    padding: 10,
    backgroundColor: "#fff",
  },
  username: {
    backgroundColor: "white",
    width: "85%",
    justifyContent: "space-between",
    alignSelf: "center",
    borderStyle: "dotted",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 4,
    paddingRight: 0,
    margin: 4,
    marginRight: 0,
    height: 35,
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  controlpanel: {
    borderWidth: 4,
    borderRadius: 6,
    backgroundColor: "rgba(128, 235, 160,0.4)",
  },
  inputText: {
    flexDirection: "row",

    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonHide: {
    backgroundColor: "white",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    fontSize: 17,
    height: 35,
  },
});

const loadingStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "flex-end",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    padding: "50%",
  },
});
