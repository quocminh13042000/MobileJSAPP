import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Linking,
} from "react-native";
import { StringeeClient } from "stringee-react-native";
import { useNavigation } from "@react-navigation/native";
import { UserServices } from "../../../services/User.service";
import SoundPlayer from "react-native-sound-player";
import Ionicons from "react-native-vector-icons/Ionicons";

import { interval, Subscription } from "rxjs";
const token = UserServices.token;
var listUser = UserServices.listUser;
console.log("listUser");

var updateSubscription = new Subscription();

export default class Home extends React.Component {

  constructor(props) {
    updateSubscription.unsubscribe();
    super(props);
    this.state = { userId: "", to: "", connected: false, clientId: "" };
    this.client = React.createRef();
    this.clientEventHandlers = {
      onConnect: this.clientDidConnect,
      onDisConnect: this.clientDidDisConnect,
      onFailWithError: this.clientDidFailWithError,
      onRequestAccessToken: this.clientRequestAccessToken,
      onIncomingCall: this.callIncomingCall,
      onIncomingCall2: this.callIncomingCall2,
      onCustomMessage: this.clientReceiveCustomMessage,
    };
  }

  componentDidMount() {
    updateSubscription = interval(1000).subscribe((val) => {
      if (UserServices.token != "") {
        this.client.current.connect(UserServices.token);
        listUser = UserServices.listUser;
        console.log("connect");
        updateSubscription.unsubscribe();
        updateSubscription = new Subscription();
      }
    });
  }

  //Event
  // The client connects to Stringee server
  clientDidConnect = ({ userId }) => {
    console.log("clientDidConnect - " + userId);
    updateSubscription.unsubscribe();
    this.setState({
      userId: userId,
      connected: true,
    });
  };

  // The client disconnects from Stringee server
  clientDidDisConnect = () => {
    console.log("clientDidDisConnect");
    this.client.current.disconnect();
    this.setState({
      userId: "Disconnected",
      hasConnected: false,
    });
  };

  // The client fails to connects to Stringee server
  clientDidFailWithError = ({ code, message }) => {
    console.log(
      "clientDidFailWithError: code-" + code + " message: " + message
    );
  };

  // Access token is expired. A new access token is required to connect to Stringee server
  clientRequestAccessToken = () => {
    console.log("_clientRequestAccessToken");
    // Token để kết nối tới Stringee server đã hết bạn. Bạn cần lấy token mới và gọi connect lại ở đây
    this.client.current.connect("NEW_TOKEN");
  };

  // IncomingCall event
  callIncomingCall = ({
    callId,
    from,
    to,
    fromAlias,
    toAlias,
    callType,
    isVideoCall,
    customDataFromYourServer,
  }) => {
    console.log(
      "IncomingCallId-" +
        callId +
        " from-" +
        from +
        " to-" +
        to +
        " fromAlias-" +
        fromAlias +
        " toAlias-" +
        toAlias +
        " isVideoCall-" +
        isVideoCall +
        "callType-" +
        callType +
        "customDataFromYourServer-" +
        customDataFromYourServer
    );

    SoundPlayer.playSoundFile("telephone", "wav");
    this.props.navigation.navigate("Call", {
      callId: callId,
      from: from,
      to: this.state.userId,
      isOutgoingCall: false,
      isVideoCall: isVideoCall,
      useCall: true,
      clientId: "aa",
    });
  };

  // IncomingCall2 event
  callIncomingCall2 = ({
    callId,
    from,
    to,
    fromAlias,
    toAlias,
    callType,
    isVideoCall,
    customDataFromYourServer,
  }) => {
    console.log(
      "IncomingCall2Id-" +
        callId +
        " from-" +
        from +
        " to-" +
        to +
        " fromAlias-" +
        fromAlias +
        " toAlias-" +
        toAlias +
        " isVideoCall-" +
        isVideoCall +
        "callType-" +
        callType +
        "customDataFromYourServer-" +
        customDataFromYourServer
    );
    //   const { navigation } = this.props;

    this.props.navigation.navigate("Call", {
      callId: callId,
      from: from,
      to: this.state.userId,
      isOutgoingCall: false,
      isVideoCall: isVideoCall,
      useCall: false,
      clientId: this.client.current.getId(),
    });
  };

  // Receive custom message
  clientReceiveCustomMessage = ({ data }) => {
    console.log("_clientReceiveCustomMessage: " + data);
  };

  callButtonClick = (isStringeeCall, isVideoCall, data) => {
    Keyboard.dismiss();

    if (data != null) {
      this.state.to = data;
    }
    console.log(this.state.to);
    if (
      (this.state.to.length == 10 || this.state.to.length == 11) &&
      (this.state.to.slice(0, 1) == "8" || this.state.to.slice(0, 1) == "0")
    ) {
      Linking.openURL(`tel:${this.state.to}`);
    } else {
      this.props.navigation.navigate("Call", {
        from: this.state.userId,
        to: this.state.to,
        isVideoCall: isVideoCall,
        useCall: isStringeeCall,
        isOutgoingCall: true,
        clientId: this.client.current.getId(),
      });
    }
  };

  call = (data) => {
    console.log(data);
    this.callButtonClick(true, false, data);
  };

  render() {
    return (
      <>
        <View style={this.styles.container}>
          <Text style={this.styles.info}>Call to:</Text>

          <View style={this.styles.rowButton}>
            <TextInput
              underlineColorAndroid="transparent"
              style={this.styles.input}
              autoCapitalize="none"
              value={this.state.to}
              placeholder="Make a call to userId"
              onChangeText={(text) => this.setState({ to: text })}
            />
            <TouchableOpacity
              style={this.styles.button}
              onPress={() => {
                this.callButtonClick(true, false, null);
              }}
            >
              <Text style={(this.styles.text, { padding: 25 })}>
                <Ionicons name="call" color={"black"} size={25}></Ionicons>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={this.styles.button}
              onPress={() => {
                this.callButtonClick(true, true, null);
              }}
            >
              <Text style={(this.styles.text, { padding: 25 })}>
                <Ionicons name="camera" color={"black"} size={25}></Ionicons>
              </Text>
            </TouchableOpacity>
          </View>
          <StringeeClient
            ref={this.client}
            eventHandlers={this.clientEventHandlers}
            serverAddresses={this.serverAddresses}
          />
          <StringeeClient
            ref="stringeeClient"
            eventHandlers={this.clientEventHandlers}
          />
        </View>
        {listUser != undefined ? (
          <View style={this.styles.controlpanel}>
            <Text style={this.styles.head}> List Calling </Text>
            {listUser.map((item, index) => (
              <View style={this.styles.fixToText} key={index}>
                <Text style={this.styles.text}> {item.Name} </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {item.Phone != null ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "rgb(24, 224, 101)",
                        flexDirection: "row",
                        padding: 5,
                        paddingLeft: 20,
                        paddingRight: 20,
                        borderRadius: 10,
                        margin: 2,
                      }}
                      onPress={() => {
                        this.setState({ to: item.Phone });
                        this.call(item.Phone);
                      }}
                    >
                      <Ionicons
                        name="call"
                        color={"black"}
                        size={25}
                      ></Ionicons>
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity
                    style={{
                      backgroundColor: "rgb(24, 224, 90)",
                      flexDirection: "row",
                      padding: 5,
                      borderRadius: 10,
                      paddingLeft: 20,
                      paddingRight: 20,
                      margin: 2,
                    }}
                    onPress={() => {
                      this.setState({ to: item.UserName });
                      this.call(item.UserName);
                    }}
                  >
                    <Ionicons
                      name="logo-apple-appstore"
                      color={"black"}
                      size={25}
                    ></Ionicons>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : null}
      </>
    );
  }

  styles = StyleSheet.create({
    container: {
      marginLeft: 15,
      //alignItems: "",
    },

    info: {
      fontSize: 20,
      textAlign: "left",
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
      width: "50%",
      borderWidth: 1,
      borderRadius: 5,
      marginRight: 10,
      textAlign: "center",
      backgroundColor: "#ECECEC",
    },
    rowButton: {
      flexDirection: "row",

      alignItems: "center",
    },

    button: {
      height: 40,

      justifyContent: "center",
      backgroundColor: "rgba(24, 224, 101,0.8)",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#fff",
    },
    tabView: {
      padding: 10,
      backgroundColor: "#fff",
    },

    controlpanel: {
      borderWidth: 4,
      borderRadius: 6,
      width: "95%",
      margin: 15,
    },
    Calluser: {
      borderWidth: 4,
      borderRadius: 6,
      backgroundColor: "rgba(24, 224, 101,0.4)",
      marginBottom: 20,
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
    inputText: {
      flexDirection: "row",

      alignSelf: "center",
      justifyContent: "space-between",
      alignItems: "center",
    },
    username: {
      backgroundColor: "white",
      width: "75%",
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
  });
}
