import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { UserServices } from "../../services/User.service";

function forgotPWComponent({ navigation }) {
  if (UserServices.Login == true) {
    navigation.goBack();
  }
  var [account, setAccount] = useState("");

  var [err, setErr] = useState("");
  var checkAccount = async () => {
    setErr("");

    SendData("checkAccount", account);
    await setTimeout(() => {
      if (UserServices.checkAcount == 1) {
        Alert.alert("Send new password to your phone, please check. ");
        navigation.goBack();
      } else {
        setErr("Can not find your account");
      }
    }, 300);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          height: 50,
          backgroundColor: "green",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Logout")}
        >
          <Ionicons
            name="arrow-back-outline"
            color={"white"}
            size={40}
          ></Ionicons>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
            paddingLeft: 30,
            justifyContent: "space-between",
            alignSelf: "center",
          }}
        >
          Reset Password
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 15, fontWeight: "bold", paddingLeft: 15 }}>
          Input your accout name:
        </Text>
        <TextInput
          placeholder="Your account"
          style={[loginStyle.username, { borderRadius: 5, fontSize: 20 }]}
          value={account}
          onChangeText={(user) => {}}
        />
        <TouchableOpacity
          style={{
            paddingLeft: 30,
            backgroundColor: "rgb(128, 235, 160)",
            width: "40%",
            margin: 10,
            padding: 5,
            borderRadius: 5,
          }}
          onPress={() => {}}
        >
          <Text
            style={[
              loginStyle.textButton,
              {
                fontSize: 15,
                color: "black",
                justifyContent: "flex-start",
                alignSelf: "flex-start",
              },
            ]}
          >
            Find Account
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{ fontSize: 15, fontWeight: "bold", paddingLeft: 15 }}
        ></Text>
      </View>
    </View>
  );
}

export default forgotPWComponent;

const loginStyle = StyleSheet.create({
  logo: {
    justifyContent: "space-between",
    alignSelf: "center",
    width: "30%",
    height: "20%",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 30,
    justifyContent: "space-between",
    alignSelf: "center",
    height: 50,
  },
  username: {
    fontSize: 25,
    backgroundColor: "white",
    width: "90%",
    justifyContent: "space-between",
    alignSelf: "center",
    borderStyle: "dotted",
    borderRadius: 12,
    padding: 4,
    margin: 4,
  },
  password: {
    fontSize: 25,
    backgroundColor: "white",
    width: "90%",
    justifyContent: "space-between",
    alignSelf: "center",
    borderStyle: "dotted",
    borderRadius: 12,
    padding: 4,
    margin: 4,
  },
  button: {
    backgroundColor: "green",
    width: "80%",
    justifyContent: "space-between",
    alignSelf: "center",
    borderStyle: "dotted",
    borderRadius: 12,
    padding: 5,
    margin: 3,
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",

    justifyContent: "space-between",
    alignSelf: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  alertS: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    justifyContent: "space-between",
    alignSelf: "center",
  },
});
