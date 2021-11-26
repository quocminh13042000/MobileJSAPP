import React, { createRef } from "react";
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  BackHandler,
} from "react-native";
import {
  StringeeCall,
  StringeeCall2,
  StringeeVideoView,
} from "stringee-react-native";

export default class Call extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Outgoing call",
      callId: "",
      isVideoCall: this.props.route.params.isVideoCall,
      isMute: false,
      isSpeaker: this.props.route.params.isVideoCall,
      isVideoEnable: this.props.route.params.isVideoCall,
      receivedLocalStream: false,
      receivedRemoteStream: false,

      signalingState: -1,
      mediaState: -1,

      showAnswerBtn: false,
    };
    this.call = createRef();
    this.setCallRef = (ref) => {
      this.call = ref;
    };

    this.call2 = null;
    this.setCall2Ref = (ref) => {
      this.call2 = ref;
    };

    this.callEventHandlers = {
      onChangeSignalingState: this.callDidChangeSignalingState,
      onChangeMediaState: this.callDidChangeMediaState,
      onReceiveLocalStream: this.callDidReceiveLocalStream,
      onReceiveRemoteStream: this.callDidReceiveRemoteStream,
      onReceiveDtmfDigit: this.didReceiveDtmfDigit,
      onReceiveCallInfo: this.didReceiveCallInfo,
      onHandleOnAnotherDevice: this.didHandleOnAnotherDevice,
      onAudioDeviceChange: this.didAudioDeviceChange, ///only available on android
    };
  }

  height = Dimensions.get("screen").height;
  width = Dimensions.get("screen").width;

  componentDidMount() {
    if (Platform.OS === "android") {
      this.checkAndroidPermission().then((r) => {
        console.log(r);
        if (
          r["android.permission.CAMERA"] === "granted" &&
          r["android.permission.RECORD_AUDIO"] === "granted"
        ) {
          this.makeOrInitAnswer();
        } else {
          this.endCall(false);
        }
      });

      BackHandler.addEventListener("hardwareBackPress", this.backAction);
    } else {
      this.makeOrInitAnswer();
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }
  }

  backAction = () => {
    this.endCall(!this.state.showAnswerBtn);
  };

  checkAndroidPermission = async () => {
    try {
      return await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  /// MARK: - CALL EVENT HANDLER
  // Invoked when the call signaling state changes
  callDidChangeSignalingState = ({
    callId,
    code,
    reason,
    sipCode,
    sipReason,
  }) => {
    console.log(
      "callDidChangeSignalingState " +
        "\ncallId-" +
        callId +
        "\ncode-" +
        code +
        "\nreason-" +
        reason +
        "\nsipCode-" +
        sipCode +
        "\nsipReason-" +
        sipReason
    );

    this.setState({
      status: reason,
      signalingState: code,
    });

    switch (code) {
      case 0:
        // Calling
        break;
      case 1:
        // Ringing
        break;
      case 2:
        // Answered
        if (this.state.mediaState === 0 && this.state.status !== "started") {
          this.startCall();
        }
        break;
      case 3:
        // Busy
        this.endCall(true);
        break;
      case 4:
        // Ended
        this.endCall(true);
        break;
    }
  };

  // Invoked when the call media state changes
  callDidChangeMediaState = ({ callId, code, description }) => {
    console.log(
      "callDidChangeMediaState" +
        " callId-" +
        callId +
        "code-" +
        code +
        " description-" +
        description
    );
    this.setState({
      mediaState: code,
    });
    switch (code) {
      case 0:
        if (
          this.state.signalingState === 2 &&
          this.state.status !== "started"
        ) {
          this.startCall();
        }
        break;
      case 1:
        break;
    }
  };

  // Invoked when the local stream is available
  callDidReceiveLocalStream = ({ callId }) => {
    console.log("callDidReceiveLocalStream");
    this.setState({
      receivedLocalStream: true,
    });
  };
  // Invoked when the remote stream is available
  callDidReceiveRemoteStream = ({ callId }) => {
    console.log("callDidReceiveRemoteStream");
    this.setState({
      receivedRemoteStream: true,
    });
  };

  // Invoked when receives a DMTF
  didReceiveDtmfDigit = ({ callId, dtmf }) => {};

  // Invoked when receives info from other clients
  didReceiveCallInfo = ({ callId, data }) => {};

  // Invoked when the call is handled on another device
  didHandleOnAnotherDevice = ({ callId, code, description }) => {
    console.log(
      "didHandleOnAnotherDevice " + callId + "***" + code + "***" + description
    );
    this.setState({
      status: description,
    });
    switch (code) {
      case 2:
        this.endCall(true);
        break;
      case 3:
        this.endCall(true);
        break;
    }
  };

  // Invoked when audio device has change
  didAudioDeviceChange = ({ selectedAudioDevice, availableAudioDevices }) => {
    console.log(
      "didHandleOnAnotherDevice selectedAudioDevice" +
        selectedAudioDevice +
        " availableAudioDevices-" +
        availableAudioDevices
    );
  };

  makeOrInitAnswer() {
    // Make new call
    if (this.props.route.params.isOutgoingCall) {
      const callParams = JSON.stringify({
        from: this.props.route.params.from,
        to: this.props.route.params.to,
        isVideoCall: this.state.isVideoCall,
        videoResolution: "NORMAL",
      });
      if (this.props.route.params.useCall) {
        this.call.makeCall(callParams, (status, code, message, callId) => {
          console.log(
            "status-" +
              status +
              " code-" +
              code +
              " message-" +
              message +
              " callId-" +
              callId
          );
          if (status) {
            this.setState({
              callId: callId,
              status: "Outgoing Call",
            });
          } else {
            Alert.alert("Make call fail: " + message);
          }
        });
      } else {
        this.call2.makeCall(callParams, (status, code, message, callId) => {
          console.log(
            "status-" +
              status +
              " code-" +
              code +
              " message-" +
              message +
              " callId-" +
              callId
          );
          if (status) {
            this.setState({
              callId: callId,
              status: "Outgoing Call",
            });
          } else {
            Alert.alert("Make call fail: " + message);
          }
        });
      }
    }
    // InitAnswer
    else {
      this.setState({
        callId: this.props.route.params.callId,
        showAnswerBtn: true,
      });
      if (this.props.route.params.useCall) {
        this.call.initAnswer(this.state.callId, (status, code, message) => {
          console.log("initAnswer " + message);
        });
      } else {
        this.call2.initAnswer(this.state.callId, (status, code, message) => {
          console.log("initAnswer " + message);
        });
      }
    }
  }

  startCall = () => {
    this.setState({
      status: "started",
    });

    if (this.props.route.params.useCall) {
      this.call.setSpeakerphoneOn(
        this.state.callId,
        this.state.isSpeaker,
        (status, code, message) => {}
      );
    } else {
      this.call2.setSpeakerphoneOn(
        this.state.callId,
        this.state.isSpeaker,
        (status, code, message) => {}
      );
    }
  };

  endCall = (isHangup) => {
    if (
      this.props.route.params.useCall == true ||
      this.props.route.params.useCall == undefined
    ) {
      if (isHangup) {
        this.call.hangup(this.state.callId, (status, code, message) => {
          console.log("hangup: " + message);
          this.disposeScreen();
        });
      } else {
        this.call.reject(this.state.callId, (status, code, message) => {
          console.log("reject: " + message);
          this.disposeScreen();
        });
      }
    } else {
      if (isHangup) {
        this.call2.hangup(this.state.callId, (status, code, message) => {
          console.log("hangup: " + message);
          this.disposeScreen();
        });
      } else {
        this.call2.reject(this.state.callId, (status, code, message) => {
          console.log("reject: " + message);
          this.disposeScreen();
        });
      }
    }
  };

  disposeScreen() {
    this.props.navigation.goBack();
  }

  answerCall = () => {
    if (this.props.route.params.useCall) {
      this.call.answer(this.state.callId, (status, code, message) => {
        console.log("answer: " + message);
        if (status) {
          this.setState({
            showAnswerBtn: true,
          });
        } else {
          this.endCall(false);
        }
      });
    } else {
      this.call2.answer(this.state.callId, (status, code, message) => {
        console.log("answer: " + message);
        if (status) {
          this.setState({
            showAnswerBtn: true,
          });
        } else {
          this.endCall(false);
        }
      });
    }
  };

  switchPress = () => {
    if (this.props.route.params.useCall) {
      this.call.switchCamera(this.state.callId, (status, code, message) => {
        console.log("switchCamera: " + message);
      });
    } else {
      this.call2.switchCamera(this.state.callId, (status, code, message) => {
        console.log("switchCamera: " + message);
      });
    }
  };

  videoPress = () => {
    if (this.props.route.params.useCall) {
      this.call.enableVideo(
        this.state.callId,
        !this.state.isVideoEnable,
        (status, code, message) => {
          console.log("enableVideo: " + message);
          if (status) {
            this.setState({
              isVideoEnable: !this.state.isVideoEnable,
            });
          }
        }
      );
    } else {
      this.call2.enableVideo(
        this.state.callId,
        !this.state.isVideoEnable,
        (status, code, message) => {
          console.log("enableVideo: " + message);
          if (status) {
            this.setState({
              isVideoEnable: !this.state.isVideoEnable,
            });
          }
        }
      );
    }
  };

  mutePress = () => {
    if (this.props.route.params.useCall) {
      this.call.mute(
        this.state.callId,
        !this.state.isMute,
        (status, code, message) => {
          console.log("mute: " + message);
          if (status) {
            this.setState({
              isMute: !this.state.isMute,
            });
          }
        }
      );
    } else {
      this.call2.mute(
        this.state.callId,
        !this.state.isMute,
        (status, code, message) => {
          console.log("mute: " + message);
          if (status) {
            this.setState({
              isMute: !this.state.isMute,
            });
          }
        }
      );
    }
  };

  speakerPress = () => {
    if (this.props.route.params.useCall) {
      this.call.setSpeakerphoneOn(
        this.state.callId,
        !this.state.isSpeaker,
        (status, code, message) => {
          console.log("setSpeakerphoneOn: " + message);
          if (status) {
            this.setState({
              isSpeaker: !this.state.isSpeaker,
            });
          }
        }
      );
    } else {
      this.call2.setSpeakerphoneOn(
        this.state.callId,
        !this.state.isSpeaker,
        (status, code, message) => {
          console.log("setSpeakerphoneOn: " + message);
          if (status) {
            this.setState({
              isSpeaker: !this.state.isSpeaker,
            });
          }
        }
      );
    }
  };

  render(){
    return (
      <View style={this.styles.container}>
        
        {this.state.receivedLocalStream &&
          this.state.callId !== "" &&
          this.state.isVideoCall && (
            <StringeeVideoView
              style={this.styles.localView}
              callId={this.state.callId}
              overlay={true}
              local={true}
            />
          )}
        {this.state.isVideoCall &&
          this.state.callId !== "" &&
          this.state.receivedRemoteStream && (
            <StringeeVideoView
              style={this.styles.remoteView}
              callId={this.state.callId}
              local={false}
            />
          )}
        {this.state.isVideoCall && (
          <TouchableOpacity
            onPress={this.switchPress}
            style={this.styles.switchButton}
          >
            <Image
              source={require("../../../../assets/resource/camera_switch.png")}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </TouchableOpacity>
        )}
        <Text style={this.styles.userId}>
          
          {this.props.route.params.isOutgoingCall
            ? this.props.route.params.to
            : this.props.route.params.from}
        </Text>
        <Text style={this.styles.status}> {this.state.status} </Text>
        {this.state.state !== "ended" && (
          <View style={this.styles.callOptionContainer}>
            <TouchableOpacity onPress={this.mutePress}>
              <Image
                source={
                  this.state.isMute
                    ? require("../../../../assets/resource/mute_selected.png")
                    : require("../../../../assets/resource/mute.png")
                }
                style={this.styles.button}
              />
            </TouchableOpacity>
            {this.state.isVideoCall && (
              <TouchableOpacity onPress={this.videoPress}>
                <Image
                  source={
                    this.state.isVideoEnable
                      ? require("../../../../assets/resource/video_enable.png")
                      : require("../../../../assets/resource/video_disable.png")
                  }
                  style={this.styles.button}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={this.speakerPress}>
              <Image
                source={
                  this.state.isSpeaker
                    ? require("../../../../assets/resource/speaker_selected.png")
                    : require("../../../../assets/resource/speaker.png")
                }
                style={this.styles.button}
              />
            </TouchableOpacity>
          </View>
        )}
        {this.state.state !== "ended" && (
          <View style={this.styles.callActionContainer}>
            <TouchableOpacity
              onPress={() => this.endCall(!this.state.showAnswerBtn)}
            >
              <Image
                source={require("../../../../assets/resource/end_call.png")}
                style={this.styles.button}
              />
            </TouchableOpacity>
            {this.state.showAnswerBtn && (
              <TouchableOpacity onPress={this.answerCall}>
                <Image
                  source={require("../../../../assets/resource/accept_call.png")}
                  style={this.styles.button}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
        <StringeeCall
          clientId={this.props.route.params.clientId}
          ref={this.setCallRef}
          eventHandlers={this.callEventHandlers}
        />
        <StringeeCall2
          clientId={this.props.route.params.clientId}
          ref={this.setCall2Ref}
          eventHandlers={this.callEventHandlers}
        />
      </View>
    );
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#00A6AD",
      position: "relative",
    },

    callOptionContainer: {
      height: 70,
      width: this.width,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      position: "absolute",
      bottom: 200,
    },

    callActionContainer: {
      position: "absolute",
      width: this.width,
      height: 70,
      bottom: 40,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },

    button: {
      width: 70,
      height: 70,
    },

    userId: {
      color: "white",
      fontSize: 28,
      fontWeight: "bold",
      marginTop: 130,
    },

    status: {
      color: "white",
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 20,
    },
    localView: {
      backgroundColor: "black",
      position: "absolute",
      top: 20,
      right: 20,
      width: 100,
      height: 150,
      zIndex: 1,
    },
    remoteView: {
      backgroundColor: "black",
      position: "absolute",
      top: 0,
      left: 0,
      width: this.width,
      height: this.height,
      zIndex: 0,
    },

    switchButton: {
      position: "absolute",
      top: 40,
      left: 40,
      width: 40,
      height: 40,
      zIndex: 2,
    },
  });
}
