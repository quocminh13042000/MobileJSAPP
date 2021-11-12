import { io } from "socket.io-client";
import { UserServices } from "./User.service";

import { CameraService } from "./camera.service";

const socket = io("http://192.168.1.5:3000", {
  transports: ["websocket", "polling", "flashsocket"],
});

socket.connect();
socket.on("IDCam", (res: any) => {
  CameraService.Camera.zone1 = res[0].IDCam;
  CameraService.Camera.zone2 = res[1].IDCam;
  CameraService.Camera.zone3 = res[2].IDCam;
  CameraService.Camera.zone4 = res[3].IDCam;
  CameraService.Camera.zone5 = res[4].IDCam;
});
socket.on("Email", (res: any) => {
  UserServices.listEmail = res;
});

socket.on("Enable", (res: any) => {
  getSocketEnable(res);
});
socket.on("Disable", (res: any) => {
  getSocketDisable(res);
});
socket.on("totalAlarm", (res: any) => {
  WebsocketService.Alarm.total.active[0] = res;
});

socket.on("Filter", (res: any) => {
  WebsocketService.totalcheckEvent = true;
  WebsocketService.eventAlarm = res.slice(0, 30);
});
socket.on("SetDisable", (res: any) => {
  setDisableData(res);
});

socket.on("onLogin", (res: any) => {
  SetLogin(res);

});

socket.on("onCheck", (res: any) => {
  console.log(res);

  UserServices.checkAcount = res;
});
socket.on("listUser", (res) => {
  UserServices.listUser = res;
});

export class WebsocketService {
  [x: string]: any;
  static eventAlarm: any;
  static totalcheckEvent = false;

  static apiUrl = "";
  static Area1 = {
    Floor: [true, true, true, true, true],
    CheckFloor: [false, false],
  };
  static Area1_sensor = {
    zone_1: [false, false, false, false, false, false],
    zone_2: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    zone_3: [false, false, false],
    zone_4: [false, false, false, false, false, false, false],
    zone_5: [false, false, false, false, false, false, false, false],
  };
  static map = [false, false, false, false];
  static Alarm = {
    new: [0, 0, 0],
    total: {
      active: [0, 0, 0],
      Unacknowled: [0, 0, 0],
    },
  };
}

export function ResetAllData() {
  WebsocketService.Area1 = {
    Floor: [true, true, true, true, true],
    CheckFloor: [false, false],
  };
  WebsocketService.Area1_sensor ==
    {
      zone_1: [false, false, false, false, false, false],
      zone_2: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      zone_3: [false, false, false],
      zone_4: [false, false, false, false, false, false, false],
      zone_5: [false, false, false, false, false, false, false, false],
    };
  WebsocketService.map = [false, false, false, false];
}

export function SendData(name: any, status: any) {
  socket.emit(name, status);
}

function setSensor(zone: number, id: number) {
  switch (zone) {
    case 1:
      WebsocketService.Area1_sensor.zone_1[id - 1] = true;
      break;
    case 2:
      WebsocketService.Area1_sensor.zone_2[id - 1] = true;
      break;
    case 3:
      WebsocketService.Area1_sensor.zone_3[id - 1] = true;
      break;
    case 4:
      WebsocketService.Area1_sensor.zone_4[id - 1] = true;
      break;
    case 5:
      WebsocketService.Area1_sensor.zone_5[id - 1] = true;
      break;
  }
}

export function Disable(zone: number) {
  switch (zone) {
    case 0:
      WebsocketService.Area1.Floor[0] = false;
      WebsocketService.Area1_sensor.zone_1 = [
        false,
        false,
        false,
        false,
        false,
        false,
      ];
      break;
    case 1:
      WebsocketService.Area1.Floor[1] = false;
      WebsocketService.Area1_sensor.zone_2 = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ];
      WebsocketService.Area1_sensor.zone_1[2] = false;
      break;
    case 2:
      WebsocketService.Area1.Floor[2] = false;
      WebsocketService.Area1_sensor.zone_3 = [false, false, false];
      break;
    case 3:
      WebsocketService.Area1.Floor[3] = false;
      WebsocketService.Area1_sensor.zone_4 = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ];
      break;
    case 4:
      WebsocketService.Area1.Floor[4] = false;
      WebsocketService.Area1_sensor.zone_5 = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ];
  }
  if (
    WebsocketService.Area1.Floor[1] ||
    WebsocketService.Area1.Floor[2] ||
    WebsocketService.Area1.Floor[3] ||
    WebsocketService.Area1.Floor[0]
  ) {
    WebsocketService.Area1.CheckFloor[0] = false;
  }
  if (WebsocketService.Area1.Floor[0]) {
    WebsocketService.Area1.CheckFloor[1] = false;
  }
  if (
    WebsocketService.Area1.CheckFloor[0] == false &&
    WebsocketService.Area1.CheckFloor[1] == false
  ) {
    WebsocketService.map[0] = false;
  }
  WebsocketService.Alarm.new[0] = 0;
}

function getSocketDisable(zone: string) {
  switch (zone) {
    case "1":
      WebsocketService.Area1.Floor[0] = false;
      Disable(0);
      break;
    case "2":
      WebsocketService.Area1.Floor[1] = false;
      Disable(1);
      break;
    case "3":
      WebsocketService.Area1.Floor[2] = false;
      Disable(2);
      break;
    case "4":
      WebsocketService.Area1.Floor[3] = false;
      Disable(3);
      break;
    case "5":
      WebsocketService.Area1.Floor[4] = false;
      Disable(4);
      break;
  }
}
function getSocketEnable(zone: string) {
  switch (zone) {
    case "1":
      WebsocketService.Area1.Floor[0] = true;
      break;
    case "2":
      WebsocketService.Area1.Floor[1] = true;
      break;
    case "3":
      WebsocketService.Area1.Floor[2] = true;
      break;
    case "4":
      WebsocketService.Area1.Floor[3] = true;
      break;
    case "5":
      WebsocketService.Area1.Floor[4] = true;
      break;
  }
}

function setDisableData(a: any) {
  for (let i = 0; i < a.length; i++) {
    WebsocketService.Area1.Floor[i] = a[i].Status ? false : true;
  }
}

function SetLogin(level: any) {
  if (level.length != 0)
    switch (level[0].levelManager) {
      case 1:
        UserServices.Level = 1;
        UserServices.Login = true;
        break;
      case 2:
        UserServices.Level = 2;
        UserServices.Login = true;
        break;
      case 3:
        UserServices.Level = 3;
        UserServices.Login = true;
        break;
      default:
        UserServices.show = "Login Failed";
        break;
    }
  else {
    UserServices.show = "Login Failed";
  }
}
