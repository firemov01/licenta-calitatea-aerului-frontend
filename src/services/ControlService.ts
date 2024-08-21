import axios from 'axios';
import { baseUrl } from './Constants';
import { DeviceLimit } from '../models/DeviceLimit';

async function getMode() {
  try {
    const response = (await axios.get(`${baseUrl}/mode/`)).data;
    return response;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

async function updateMode() {
  try {
    const response = await axios.patch(`${baseUrl}/mode/`);
    return response.data;
  } catch (error) {
    console.error(`Error updating data: ${error}`);
  }
}

export { getMode, updateMode };
