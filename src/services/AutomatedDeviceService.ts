import axios from 'axios';
import { AutomatedDevice } from '../models/AutomatedDevice';
import { DeviceImage } from '../models/DeviceImage';
import { baseUrl } from './Constants';

async function getAutomatedDevices() {
  try {
    const response = (await axios.get(`${baseUrl}/automated-device/`)).data;
    return response.map((data: any) => AutomatedDevice.fromObject(data));
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

async function addAutomatedDevice(device: AutomatedDevice) {
  try {
    return (
      await axios.post(`${baseUrl}/automated-device/`, {
        name: device.name,
        description: device.description,
        endpoint: device.endpoint,
        enabled: device.enabled,
        image: {
          id: device.image?.id,
        },
      })
    ).data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return error;
  }
}

async function editAutomatedDevice(device: AutomatedDevice) {
  try {
    const response = (
      await axios.patch(`${baseUrl}/automated-device/${device.id}/`, {
        name: device.name,
        description: device.description,
        endpoint: device.endpoint,
        enabled: device.enabled,
        image: {
          id: device.image?.id,
        },
      })
    ).data;
    return response;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

async function getDeviceImages() {
  try {
    const response = (await axios.get(`${baseUrl}/device-image/`)).data;
    return response.map((data: any) => DeviceImage.fromObject(data));
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

export {
  getAutomatedDevices,
  addAutomatedDevice,
  editAutomatedDevice,
  getDeviceImages,
};
