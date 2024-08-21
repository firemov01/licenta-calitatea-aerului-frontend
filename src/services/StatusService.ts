import axios from 'axios';
import { baseUrl } from './Constants';
import { Device } from '../models/Device';

async function getDeviceStatus() {
  try {
    let response = (await axios.get(`${baseUrl}/develco-device/status/`)).data;
    response = response.map((data: any) => Device.fromObjectWithData(data));
    console.log(response);
    return response;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

export { getDeviceStatus };
