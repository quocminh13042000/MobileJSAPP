import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

import Loading from "../Loading";
import { useState } from "react";


function LogoutComponent({ navigation }) {
 
    var [user, setUser] = useState('');
        var [password, setPassword] = useState('');
        var [alert, setAlert] = useState('');
        var [load, SetLoad] = useState(false);
  const onLogin = async () => {
    /*if (user == '' || password == '') {
      UserServices.show = 'You have not entered enough information'
      setAlert(x => x = UserServices.show)
    } else {
      SetLoad(true)
      SendData("Login", [user, password])
      await setTimeout(() => {
        setAlert(x => x = UserServices.show)
        if (UserServices.Login) {
          UserServices.USername = user
          UserServices.Password = password
          navigation.navigate('Home')
          setUser(''); setPassword(''); setAlert('');
          UserServices.show = '';
          UserServices.Login = false;
          UserServices.Level = 0;
 
        }
        SetLoad(false)
      }, 400);
    }*/
  };

  return (
    <View
      style={{
        flexDirection: "column",
        height: "100%",
        backgroundColor: "green",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <ImageBackground
        source={require("../../../assets/Bg.jpg")}
        style={loginStyle.image}
      >
        {load ? (
          <View style={[loadingStyle.container, loadingStyle.horizontal]}>
            <Loading />
          </View>
        ) : (
          <View>
            <Image
              style={loginStyle.logo}
              source={require("../../../assets/Logo.png")}
            ></Image>
            <Text style={loginStyle.text}> Fire Alarm Monitoring </Text>
            <TextInput
              placeholder="Username"
              style={loginStyle.username}
              value={user}
              onChangeText={(user) => setUser(user)}
            />
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              style={loginStyle.password}
              onChangeText={(password) => setPassword(password)}
            />
            <Text style={loginStyle.alertS}> {alert} </Text>
            <TouchableOpacity
              style={loginStyle.button}
              onPress={() => onLogin()}
            >
              <Text style={loginStyle.textButton}> Login </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[loginStyle.button, { backgroundColor: "none" }]}
              onPress={() => navigation.navigate("Reset Password")}
            >
              <Text style={[loginStyle.textButton, { fontSize: 15 }]}>
                Forgot passwords
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

export default LogoutComponent;
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  info: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
    color: "red",
  },

  text: {
    textAlign: "center",
    color: "#F5FCFF",
    fontWeight: "bold",
    fontSize: 15,
  },

  input: {
    height: 35,
    width: 280,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    textAlign: "center",
    backgroundColor: "#ECECEC",
  },
  rowButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  button: {
    width: 120,
    height: 40,
    marginTop: 40,
    justifyContent: "center",
    backgroundColor: "#1E6738",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

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
