import { DeviceData } from './DeviceData';

class Device {
  id: number;
  name: string;
  deviceId: number;
  deviceData: DeviceData[];

  constructor(
    id: number,
    name: string,
    deviceId: number,
    deviceData: DeviceData[]
  ) {
    this.id = id;
    this.name = name;
    this.deviceId = deviceId;
    this.deviceData = deviceData;
  }

  static fromObject(data: any) {
    return new Device(
      data.id,
      data.name,
      data.device_id,
      data.device_data.map(DeviceData.fromObject)
    );
  }

  static fromObjectWithData(data: any) {
    return new Device(data.id, data.name, data.device_id, data.data);
  }

  static fromArray(data: any) {
    return data.map(Device.fromObject);
  }

  static toObject(data: Device) {
    return {
      id: data.id,
      name: data.name,
      device_id: data.deviceId,
      device_data: data.deviceData.map(DeviceData.toObject),
    };
  }
}

export { Device };
