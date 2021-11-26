"use strict";
exports.__esModule = true;
exports.Disable = exports.SendData = exports.ResetAllData = exports.WebsocketService = void 0;
var socket_io_client_1 = require("socket.io-client");
var User_service_1 = require("./User.service");
var camera_service_1 = require("./camera.service");
var socket = socket_io_client_1.io("http://192.168.1.5:3000", {
    transports: ["websocket", "polling", "flashsocket"]
});
socket.connect();
socket.on("IDCam", function (res) {
    camera_service_1.CameraService.Camera.zone1 = res[0].IDCam;
    camera_service_1.CameraService.Camera.zone2 = res[1].IDCam;
    camera_service_1.CameraService.Camera.zone3 = res[2].IDCam;
    camera_service_1.CameraService.Camera.zone4 = res[3].IDCam;
    camera_service_1.CameraService.Camera.zone5 = res[4].IDCam;
});
socket.on("Email", function (res) {
    User_service_1.UserServices.listEmail = res;
});
socket.on("Enable", function (res) {
    getSocketEnable(res);
});
socket.on("Disable", function (res) {
    getSocketDisable(res);
});
socket.on("totalAlarm", function (res) {
    WebsocketService.Alarm.total.active[0] = res;
});
socket.on("Filter", function (res) {
    WebsocketService.totalcheckEvent = true;
    WebsocketService.eventAlarm = res.slice(0, 30);
});
socket.on("SetDisable", function (res) {
    setDisableData(res);
});
socket.on("onLogin", function (res) {
    SetLogin(res);
});
socket.on("onCheck", function (res) {
    console.log(res);
    User_service_1.UserServices.checkAcount = res;
});
socket.on("listUser", function (res) {
    User_service_1.UserServices.listUser = res;
});
var WebsocketService = /** @class */ (function () {
    function WebsocketService() {
    }
    WebsocketService.totalcheckEvent = false;
    WebsocketService.apiUrl = "";
    WebsocketService.Area1 = {
        Floor: [true, true, true, true, true],
        CheckFloor: [false, false]
    };
    WebsocketService.Area1_sensor = {
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
        zone_5: [false, false, false, false, false, false, false, false]
    };
    WebsocketService.map = [false, false, false, false];
    WebsocketService.Alarm = {
        "new": [0, 0, 0],
        total: {
            active: [0, 0, 0],
            Unacknowled: [0, 0, 0]
        }
    };
    return WebsocketService;
}());
exports.WebsocketService = WebsocketService;
function ResetAllData() {
    WebsocketService.Area1 = {
        Floor: [true, true, true, true, true],
        CheckFloor: [false, false]
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
            zone_5: [false, false, false, false, false, false, false, false]
        };
    WebsocketService.map = [false, false, false, false];
}
exports.ResetAllData = ResetAllData;
function SendData(name, status) {
    socket.emit(name, status);
}
exports.SendData = SendData;
function setSensor(zone, id) {
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
function Disable(zone) {
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
    if (WebsocketService.Area1.Floor[1] ||
        WebsocketService.Area1.Floor[2] ||
        WebsocketService.Area1.Floor[3] ||
        WebsocketService.Area1.Floor[0]) {
        WebsocketService.Area1.CheckFloor[0] = false;
    }
    if (WebsocketService.Area1.Floor[0]) {
        WebsocketService.Area1.CheckFloor[1] = false;
    }
    if (WebsocketService.Area1.CheckFloor[0] == false &&
        WebsocketService.Area1.CheckFloor[1] == false) {
        WebsocketService.map[0] = false;
    }
    WebsocketService.Alarm["new"][0] = 0;
}
exports.Disable = Disable;
function getSocketDisable(zone) {
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
function getSocketEnable(zone) {
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
function setDisableData(a) {
    for (var i = 0; i < a.length; i++) {
        WebsocketService.Area1.Floor[i] = a[i].Status ? false : true;
    }
}
function SetLogin(level) {
    if (level.length != 0)
        switch (level[0].levelManager) {
            case 1:
                User_service_1.UserServices.Level = 1;
                User_service_1.UserServices.Login = true;
                break;
            case 2:
                User_service_1.UserServices.Level = 2;
                User_service_1.UserServices.Login = true;
                break;
            case 3:
                User_service_1.UserServices.Level = 3;
                User_service_1.UserServices.Login = true;
                break;
            default:
                User_service_1.UserServices.show = "Login Failed";
                break;
        }
    else {
        User_service_1.UserServices.show = "Login Failed";
    }
}
