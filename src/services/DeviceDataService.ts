import axios from 'axios';
import { DeviceData } from '../models/DeviceData';
import { baseUrl } from './Constants';

async function getGraphData(
  key: 'humidity' | 'temperature' | 'voc' | 'alarm',
  year: number,
  month: number,
  day: number,
  periodType: string
) {
  try {
    const response = (
      await axios.get(`${baseUrl}/device-data/`, {
        params: {
          key: key,
          year: year,
          month: month,
          day: day,
          'period-type': periodType,
          'page-size': 101,
          'number-of-elements': 100,
        },
      })
    ).data.map((data: any) => DeviceData.fromObject(data));
    return response;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

async function getPredictions(
  key: 'humidity' | 'temperature' | 'voc',
  year: number,
  month: number,
  day: number,
  periodType: string
) {
  try {
    const response = (
      await axios.get(`${baseUrl}/device-data-prediction/`, {
        params: {
          key: key,
          year: year,
          month: month,
          day: day,
          'period-type': periodType,
        },
      })
    ).data.map((data: any) => DeviceData.fromObject(data));
    return response;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

export { getGraphData, getPredictions };
