import axios from 'axios';
import { baseUrl } from './Constants';

async function getTips() {
  try {
    const response = (await axios.get(`${baseUrl}/tips/`)).data;
    return response;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

export { getTips };
