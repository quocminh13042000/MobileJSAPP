"use strict";
exports.__esModule = true;
exports.SensorService = void 0;
var alert_models_1 = require("../models/alert.models");
var websocket_service_1 = require("./websocket.service");
var socket_io_client_1 = require("socket.io-client");
/*import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});*/
/*
async function schedulePushNotification(alert_data: alert, map: number) {
  let nameZone;
  switch (map){
    case 1:
      nameZone = 'Trạm Phú Lâm';break;
    case 2:
    break;
  }
  await Notifications.scheduleNotificationAsync({
    content: {
      title: nameZone ,
      body: nameZone + ' is burning',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}*/
var socket = socket_io_client_1.io("http://192.168.1.5:3000", {
    transports: ["websocket", "polling", "flashsocket"]
});
socket.connect();
socket.on('map_1', function (res) {
    // schedulePushNotification(res,1)
    pushdata(res, 1);
});
socket.on('AllSensor_Z1', function (res) {
    SensorService.sensorZone_1 = res;
});
socket.on('AllSensor_Z2', function (res) {
    SensorService.sensorZone_2 = res;
});
socket.on('AllSensor_Z3', function (res) {
    SensorService.sensorZone_3 = res;
});
socket.on('AllSensor_Z4', function (res) {
    SensorService.sensorZone_4 = res;
});
socket.on('AllSensor_Z5', function (res) {
    SensorService.sensorZone_5 = res;
});
var SensorService = /** @class */ (function () {
    function SensorService() {
    }
    SensorService.alertSensor = new alert_models_1.alert;
    SensorService.autoShow = true;
    return SensorService;
}());
exports.SensorService = SensorService;
function pushdata(alert_data, map) {
    SensorService.alertSensor = alert_data;
    switch (map) {
        case 1:
            if (SensorService.alertSensor.sensor == 3) {
                SensorService.alertSensor = {
                    Floor: 1,
                    zone: 2,
                    sensor: 17,
                    id_sensor: 11,
                    status: false,
                    IDCam: SensorService.alertSensor.IDCam
                };
            }
            parseData(SensorService.alertSensor);
            websocket_service_1.WebsocketService.map[0] = true;
            websocket_service_1.WebsocketService.Alarm["new"][0]++;
            websocket_service_1.WebsocketService.Alarm.total.active[0]++;
            break;
        case 2:
            websocket_service_1.WebsocketService.map[1] = true;
            websocket_service_1.WebsocketService.Alarm["new"][0]++;
            websocket_service_1.WebsocketService.Alarm.total.active[0]++;
            break;
        case 3:
            websocket_service_1.WebsocketService.map[2] = true;
            websocket_service_1.WebsocketService.Alarm["new"][0]++;
            websocket_service_1.WebsocketService.Alarm.total.active[0]++;
            break;
        case 4:
            websocket_service_1.WebsocketService.map[3] = true;
            websocket_service_1.WebsocketService.Alarm["new"][0]++;
            websocket_service_1.WebsocketService.Alarm.total.active[0]++;
            break;
    }
}
function parseData(data) {
    switch (data.zone) {
        case 1:
            websocket_service_1.WebsocketService.Area1_sensor.zone_1[data.id_sensor - 1] = true;
            websocket_service_1.WebsocketService.Area1.CheckFloor[0] = true;
            break;
        case 2:
            websocket_service_1.WebsocketService.Area1_sensor.zone_2[data.id_sensor - 1] = true;
            websocket_service_1.WebsocketService.Area1.CheckFloor[0] = true;
            break;
        case 3:
            websocket_service_1.WebsocketService.Area1_sensor.zone_3[data.id_sensor - 1] = true;
            websocket_service_1.WebsocketService.Area1.CheckFloor[0] = true;
            break;
        case 4:
            websocket_service_1.WebsocketService.Area1_sensor.zone_4[data.id_sensor - 1] = true;
            websocket_service_1.WebsocketService.Area1.CheckFloor[0] = true;
            break;
        case 5:
            websocket_service_1.WebsocketService.Area1_sensor.zone_5[data.id_sensor - 1] = true;
            websocket_service_1.WebsocketService.Area1.CheckFloor[1] = true;
            break;
    }
}
