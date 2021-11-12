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
import MapView, { Marker, Circle } from "react-native-maps";
import { Dimensions } from "react-native";
import { interval, Subscription } from "rxjs";
import { useState } from "react";
import { WebsocketService } from "../../services/websocket.service";

/*
var [region, setRegion] = useState({
  latitude: 10.738392168206301,
  longitude: 106.6013006109943,
  latitudeDelta: 1,
  longitudeDelta: 0.5,
});
var AreaPhulam = {
  latitude: 10.738392168206301,
  longitude: 106.6013006109943,
};
var Area2 = {
  latitude: 10.788392168206301,
  longitude: 106.5013006109943,
};
var [redzone, setRedzone1] = useState("rgba(256,0,0,0)");

var [radiusA, setRadiusA] = useState(1);
*/
var updateSubscription = new Subscription();

const { width, height } = Dimensions.get("window");


function MapComponent({ navigation }) {
  var [region, setRegion] = useState({
    latitude: 10.938392168206301,
    longitude: 106.6013006109943,
    latitudeDelta: 1,
    longitudeDelta: 0.5,
  });
  var AreaPhulam = {
    latitude: 10.738392168206301,
    longitude: 106.6013006109943,
  };
  var Area2 = {
    latitude: 10.788392168206301,
    longitude: 106.5013006109943,
  };
  var [redzone, setRedzone1] = useState("rgba(256,0,0,0)");

  var [radiusA, setRadiusA] = useState(1);
  const goHome = () => {
    /* setRegion(reg => reg = {
      latitude: 10.738392168206301,
      longitude: 106.6013006109943,
      latitudeDelta: 1,
      longitudeDelta: 0.5,
    })*/
  };
  updateSubscription = interval(1000).subscribe((val) => {
     if (WebsocketService.map[0]) {
      setRedzone1(x => x = 'rgba(256,0,0,0.5)')
    } else {
      setRedzone1(x => x = 'rgba(256,0,0,0)')
    }
  });

  const changeZoom = (x) => {
     var rad = parseInt(x.latitudeDelta) * 5000
    //console.log(rad)
    setRadiusA((rad ))
  };

  return (
    <View>
      {/*
              <View
                style={{
                  flexDirection: "row",
                  height: 50,
                  backgroundColor: "green",
                  width: "100%",
                }}
              >
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Ionicons name="menu" color={"white"} size={45}></Ionicons>
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
                  Fire Alarm Monitoring
                </Text>
                <TouchableOpacity
                  style={{ justifyContent: "space-evenly", paddingLeft: 30 }}
                  onPress={() => goHome()}
                >
                  <Ionicons name="home" color={"white"} size={30}></Ionicons>
                </TouchableOpacity>
              </View>*
              <View
                style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
              >*/}
      <View style={styles.container}>
        <MapView
          mapType="hybrid"
          zoomEnabled={true}
          showsCompass={true}
          style={styles.map}
          region={region}
          onRegionChange={(x) => {}}
        >
          <Marker
            coordinate={AreaPhulam}
            title="Trạm Phú lâm"
            onPress={() => navigation.navigate("Trạm phú lâm")}
          ></Marker>
          <Marker
            coordinate={Area2}
            title="Trạm 2"
            onPress={() => navigation.navigate("Trạm 2")}
          ></Marker>
          <Circle
            center={AreaPhulam}
            radius={3500}
            fillColor={redzone}
            strokeColor="rgba(0,0,0,0)"
            onPress={() => navigation.navigate("Trạm phú lâm")}
          ></Circle>
        </MapView>
      </View>
    </View>
  );
}

export default MapComponent;

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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 2,
  },
});
