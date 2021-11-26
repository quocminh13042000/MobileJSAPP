import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";

export default class DetailsComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text> Trạm 2 Screen </Text>
        </View>
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
