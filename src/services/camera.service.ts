
import { CameraID } from '../models/Camera.models'


export class CameraService {
  //Camera = new CameraID;
  idCamera = 0;
    static Camera= new  CameraID;


  getIdCam(zone: number) :string {
    switch (zone) {
      case 1:
        return CameraService.Camera.zone1
        break;
      case 2:
        return CameraService.Camera.zone2
        break;
      case 3:
        return CameraService.Camera.zone3
        break;
      case 4:
        return CameraService.Camera.zone4
        break;
      case 5:
        return CameraService.Camera.zone5
        break;
      default:
        return '';
    }
  }

}

