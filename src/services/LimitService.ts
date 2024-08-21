import axios from 'axios';
import { baseUrl } from './Constants';
import { DeviceLimit } from '../models/DeviceLimit';

async function getLimits() {
  try {
    const response = (await axios.get(`${baseUrl}/develco-device/limit/`)).data;
    return response.map((data: any) => DeviceLimit.fromObject(data));
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

async function updateLimit(limit: DeviceLimit) {
  try {
    await axios.patch(`${baseUrl}/develco-device/limit/${limit.id}/`, {
      low_value: limit.lowValue,
      high_value: limit.highValue,
    });
  } catch (error) {
    console.error(`Error updating data: ${error}`);
  }
}

export { getLimits, updateLimit };
