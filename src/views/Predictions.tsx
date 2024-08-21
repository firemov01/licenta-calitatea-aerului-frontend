import { useEffect, useMemo, useState, useRef } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from '@mui/system';
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { getGraphData, getPredictions } from '../services/DeviceDataService';
import { DeviceData } from '../models/DeviceData';
import { AxisValueFormatterContext } from '@mui/x-charts/models/axis';
import { PieChart } from '@mui/x-charts/PieChart';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

function Predictions() {
  const [height, setHeight] = useState(0.3 * window.innerHeight);
  const [width, setWidth] = useState(
    window.innerWidth >= 600 ? 0.5 * window.innerWidth : window.innerWidth * 0.7
  );
  const [humidityData, setHumidityData] = useState<DeviceData[]>([]);
  const [humidityPrediction, setHumidityPrediction] = useState<DeviceData[]>(
    []
  );
  const [temperatureData, setTemperatureData] = useState<DeviceData[]>([]);
  const [temperaturePrediction, setTemperaturePrediction] = useState<
    DeviceData[]
  >([]);
  const [vocData, setVocData] = useState<DeviceData[]>([]);
  const [vocPrediction, setVocPrediction] = useState<DeviceData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('Day');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [loading, setLoading] = useState(false);
  const chartBoxRef = useRef<HTMLDivElement>(null);

  const periods = ['Day', 'Month', 'Year'];

  function fetchData() {
    let year = selectedDate?.year();
    let month = selectedDate?.month();
    let day = selectedDate?.date();

    let humidityLoading = true;
    let temperatureLoading = true;
    let vocLoading = true;
    let vocPredictionLoading = true;
    let humidityPredictionLoading = true;
    let temperaturePredictionLoading = true;

    if (year && month && day) {
      setLoading(true);
      month++;
      getGraphData(
        'humidity',
        year,
        month,
        day,
        selectedPeriod.toLowerCase()
      ).then((data: DeviceData[]) => {
        setHumidityData(data);
        humidityLoading = false;
        changeLoading(
          humidityLoading,
          temperatureLoading,
          vocLoading,
          vocPredictionLoading,
          humidityPredictionLoading,
          temperaturePredictionLoading
        );
      });

      getGraphData(
        'temperature',
        year,
        month,
        day,
        selectedPeriod.toLowerCase()
      ).then((data: DeviceData[]) => {
        setTemperatureData(data);
        temperatureLoading = false;
        changeLoading(
          humidityLoading,
          temperatureLoading,
          vocLoading,
          vocPredictionLoading,
          humidityPredictionLoading,
          temperaturePredictionLoading
        );
      });

      getGraphData('voc', year, month, day, selectedPeriod.toLowerCase()).then(
        (data: DeviceData[]) => {
          setVocData(data);
          vocLoading = false;
          changeLoading(
            humidityLoading,
            temperatureLoading,
            vocLoading,
            vocPredictionLoading,
            humidityPredictionLoading,
            temperaturePredictionLoading
          );
        }
      );

      getPredictions(
        'humidity',
        year,
        month,
        day,
        selectedPeriod.toLowerCase()
      ).then((data: DeviceData[]) => {
        setHumidityPrediction(data);
        humidityPredictionLoading = false;
        changeLoading(
          humidityLoading,
          temperatureLoading,
          vocLoading,
          vocPredictionLoading,
          humidityPredictionLoading,
          temperaturePredictionLoading
        );
      });

      getPredictions(
        'temperature',
        year,
        month,
        day,
        selectedPeriod.toLowerCase()
      ).then((data: DeviceData[]) => {
        setTemperaturePrediction(data);
        temperaturePredictionLoading = false;
        changeLoading(
          humidityLoading,
          temperatureLoading,
          vocLoading,
          vocPredictionLoading,
          humidityPredictionLoading,
          temperaturePredictionLoading
        );
      });

      getPredictions(
        'voc',
        year,
        month,
        day,
        selectedPeriod.toLowerCase()
      ).then((data: DeviceData[]) => {
        setVocPrediction(data);
        vocPredictionLoading = false;
        changeLoading(
          humidityLoading,
          temperatureLoading,
          vocLoading,
          vocPredictionLoading,
          humidityPredictionLoading,
          temperaturePredictionLoading
        );
      });
    }
  }

  function changeLoading(
    humidityLoading: boolean,
    temperatureLoading: boolean,
    vocLoading: boolean,
    vocPredictionLoading: boolean,
    humidityPredictionLoading: boolean,
    temperaturePredictionLoading: boolean
  ) {
    if (
      !humidityLoading &&
      !temperatureLoading &&
      !vocLoading &&
      !vocPredictionLoading &&
      !humidityPredictionLoading &&
      !temperaturePredictionLoading
    ) {
      console.log('setting loading to false');
      setLoading(false);
    }
  }

  useEffect(() => {
    setWidth(
      chartBoxRef.current!.clientWidth >= 600
        ? 0.45 * chartBoxRef.current!.clientWidth
        : 300
    );
    setHeight(
      0.2 * window.innerHeight + 0.05 * chartBoxRef.current!.clientWidth
    );
    const handleResize = () => {
      const tempWidth = chartBoxRef.current?.clientWidth || window.innerWidth;
      setHeight(0.2 * window.innerHeight + 0.05 * tempWidth);
      setWidth(tempWidth >= 600 ? 0.45 * tempWidth : 300);
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useMemo(() => {
    fetchData();
  }, [selectedPeriod, selectedDate]);

  function drawLineChart(data: DeviceData[], prediction: DeviceData[]) {
    return !loading ? (
      <LineChart
        dataset={data.map((data) => {
          return DeviceData.toObject(data);
        })}
        xAxis={[
          {
            data: prediction.map((data) => {
              return data.lastUpdated;
            }),
            valueFormatter: (
              value: any,
              context: AxisValueFormatterContext
            ): string => {
              // if selectedPeriod is 'Day' return hour
              switch (selectedPeriod) {
                case 'Day':
                  return new Date(value).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                  });
                case 'Month':
                  return new Date(value).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  });
                case 'Year':
                  return new Date(value).toLocaleDateString('en-US', {
                    month: 'short',
                  });
                default:
                  return new Date(value).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                  });
              }
            },
          },
          {
            dataKey: 'lastUpdated',
          },
        ]}
        series={[
          {
            data: prediction.map((data) => {
              return parseFloat(data.value);
            }),
            valueFormatter: (value: any) => {
              return `Predicted: ${parseFloat(value).toFixed(2)} ${
                data[0]?.unit
              }`;
            },
          },
          {
            dataKey: 'value',
            valueFormatter: (value: any) => {
              return `Actual: ${parseFloat(value).toFixed(2)} ${data[0]?.unit}`;
            },
          },
        ]}
        margin={{ top: 8 }}
        height={height}
        width={width}
      />
    ) : (
      <CircularProgress />
    );
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Predictions
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <DatePicker
            className="datetimepicker"
            views={
              selectedPeriod === 'Day'
                ? ['day', 'month', 'year']
                : selectedPeriod === 'Month'
                ? ['month', 'year']
                : ['year']
            }
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
            }}
          />
          <ButtonGroup>
            {periods.map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'contained' : 'outlined'}
                onClick={() => setSelectedPeriod(period)}
                sx={{ height: 'min-content' }}
              >
                {period}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexFirection: 'row',
          flexWrap: 'wrap',
          flexGrow: 1,
          justifyContent: 'center',
          gap: '16px',
        }}
        ref={chartBoxRef}
      >
        <Box>
          <Typography variant="h6" textAlign="center">
            Humidity
          </Typography>
          {humidityData && drawLineChart(humidityData, humidityPrediction)}
        </Box>
        <Box>
          <Typography variant="h6" textAlign="center">
            Temperature
          </Typography>
          {temperatureData &&
            drawLineChart(temperatureData, temperaturePrediction)}
        </Box>
        <Box>
          <Typography variant="h6" textAlign="center">
            Air Quality (voc)
          </Typography>
          {vocData && drawLineChart(vocData, vocPrediction)}
        </Box>
      </Box>
    </Box>
  );
}

export default Predictions;
