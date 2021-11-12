import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { StringeeClient } from "stringee-react-native";
import { useNavigation } from "@react-navigation/native";
import { UserServices } from "../../../services/User.service";
import SoundPlayer from "react-native-sound-player";

const token = UserServices.token;


export default class Home extends React.Component {
  constructor(props) {
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
    this.client.current.connect(token);
    
  }

  //Event
  // The client connects to Stringee server
  clientDidConnect = ({ userId }) => {
    console.log("clientDidConnect - " + userId);
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
    //const {navigation} = this.props.navigation;
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
    /* navigation.navigate("Call", {
      callId: callId,
      from: from,
      to: this.state.userId,
      isOutgoingCall: false,
      isVideoCall: isVideoCall,
      useCall: true,
      clientId: this.client.current.getId(),
    });*/
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
    /*navigation.navigate("Call", {
      callId: callId,
      from: from,
      to: this.state.userId,
      isOutgoingCall: false,
      isVideoCall: isVideoCall,
      useCall: false,
      clientId: this.client.current.getId(),
    });*/
  };

  // Receive custom message
  clientReceiveCustomMessage = ({ data }) => {
    console.log("_clientReceiveCustomMessage: " + data);
  };

  callButtonClick = (isStringeeCall, isVideoCall) => {
    Keyboard.dismiss();
    this.props.navigation.navigate("Call", {
      from: this.state.userId,
      to: this.state.to,
      isVideoCall: isVideoCall,
      useCall: isStringeeCall,
      isOutgoingCall: true,
      clientId: this.client.current.getId(),
    });
  };

  render() {
    return (
      <View style={this.styles.container}>
        <Text style={this.styles.info}>Logged in as: {this.state.userId}</Text>
        <TextInput
          underlineColorAndroid="transparent"
          style={this.styles.input}
          autoCapitalize="none"
          value={this.state.to}
          placeholder="Make a call to userId"
          onChangeText={(text) => this.setState({ to: text })}
        />
        <View style={this.styles.rowButton}>
          <TouchableOpacity
            style={this.styles.button}
            onPress={() => {
              this.callButtonClick(true, false);
            }}
          >
            <Text style={this.styles.text}> Voice call </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.styles.button}
            onPress={() => {
              this.callButtonClick(true, true);
            }}
          >
            <Text style={this.styles.text}> Video call </Text>
          </TouchableOpacity>
        </View>
        <View style={this.styles.rowButton}>
          <TouchableOpacity
            style={this.styles.button}
            onPress={() => {
              this.callButtonClick(false, false);
            }}
          >
            <Text style={this.styles.text}> Voice call 2 </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.styles.button}
            onPress={() => {
              this.callButtonClick(false, true);
            }}
          >
            <Text style={this.styles.text}> Video call 2 </Text>
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
    );
  }

  styles = StyleSheet.create({
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
}
