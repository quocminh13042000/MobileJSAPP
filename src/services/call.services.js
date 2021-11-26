import React from "react";

import { StringeeClient } from "stringee-react-native";

const token =
  "eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS3FTdEFjWFJLT2ZYNWRZZVQ5QnNPekdZN3NlZno3YkctMTYzNTg0MjkzMSIsImlzcyI6IlNLcVN0QWNYUktPZlg1ZFllVDlCc096R1k3c2VmejdiRyIsImV4cCI6MTYzODQzNDkzMSwidXNlcklkIjoiVGVzdENhbGxNb2JpbGUifQ.sXWFrGQ1gcd74zPXOy6RVGisSDha2GhQEHBR0uC5OJc";

function Home {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      to: "",
      connected: false,
      clientId: "",
    };
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

    this.props.navigation.navigate("Call", {
      callId: callId,
      from: from,
      to: this.state.userId,
      isOutgoingCall: false,
      isVideoCall: isVideoCall,
      useCall: true,
      clientId: this.client.current.getId(),
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

  callButtonClick = (isStringeeCall, isVideoCall) => {};

  render() {
    return (
      <StringeeClient
        ref={this.client}
        eventHandlers={this.clientEventHandlers}
        serverAddresses={this.serverAddresses}
      />
    );
  }
}
