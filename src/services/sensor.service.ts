import { alert } from '../models/alert.models';
import { WebsocketService } from './websocket.service'
import { UserServices } from './User.service'
import { io } from 'socket.io-client';
import * as  React from "react";
/*import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function schedulePushNotification(alert_data: alert, map: number) {
  let nameZone;
  switch (map){
    case 1:
      nameZone = 'Trạm Phú Lâm';
      break;
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

const socket = io("http://192.168.1.5:3000", {
  transports: ["websocket", "polling", "flashsocket"],
});
socket.connect();
socket.on('map_1', (res) => {
 // schedulePushNotification(res,1)
  pushdata(res, 1)
})

socket.on('AllSensor_Z1',(res)=>{
  SensorService.sensorZone_1 = res;   
})

socket.on('AllSensor_Z2',(res)=>{
  SensorService.sensorZone_2 = res;  
})

socket.on('AllSensor_Z3',(res)=>{
  SensorService.sensorZone_3 = res;  
})

socket.on('AllSensor_Z4',(res)=>{
  SensorService.sensorZone_4 = res;    
})

socket.on('AllSensor_Z5',(res)=>{
  SensorService.sensorZone_5 = res;     
})


export class SensorService {
  
  static alertSensor: alert = new alert;
  static sensorZone_1 :any;
  static sensorZone_3 :any;
  static sensorZone_2 :any;
  static sensorZone_4 :any;
  static sensorZone_5 :any;
  static autoShow =true;

}
function pushdata(alert_data: alert, map: number) {
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
          IDCam:SensorService.alertSensor.IDCam
        }
      }
      parseData(SensorService.alertSensor);
      WebsocketService.map[0] = true;
      WebsocketService.Alarm.new[0]++;
      WebsocketService.Alarm.total.active[0]++;

      break;
    case 2:
      WebsocketService.map[1] = true;
      WebsocketService.Alarm.new[0]++;
      WebsocketService.Alarm.total.active[0]++;
      break;
    case 3:
      WebsocketService.map[2] = true;
      WebsocketService.Alarm.new[0]++;
      WebsocketService.Alarm.total.active[0]++;
      break;
    case 4:
      WebsocketService.map[3] = true;
      WebsocketService.Alarm.new[0]++;
      WebsocketService.Alarm.total.active[0]++;
      break;
  }
}
function parseData(data: alert) {
  switch (data.zone) {
    case 1:
      WebsocketService.Area1_sensor.zone_1[data.id_sensor - 1] = true;
      WebsocketService.Area1.CheckFloor[0] = true;
      break;
    case 2:
      WebsocketService.Area1_sensor.zone_2[data.id_sensor - 1] = true;
      WebsocketService.Area1.CheckFloor[0] = true;
      break;
    case 3:
      WebsocketService.Area1_sensor.zone_3[data.id_sensor - 1] = true;
      WebsocketService.Area1.CheckFloor[0] = true;
      break;
    case 4:
      WebsocketService.Area1_sensor.zone_4[data.id_sensor - 1] = true;
      WebsocketService.Area1.CheckFloor[0] = true;
      break;
    case 5:
      WebsocketService.Area1_sensor.zone_5[data.id_sensor - 1] = true;
      WebsocketService.Area1.CheckFloor[1] = true;
      break;
  }
}

