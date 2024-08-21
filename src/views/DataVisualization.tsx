import { useEffect, useMemo, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box } from '@mui/system';
import { Button, ButtonGroup, Grid, Typography } from '@mui/material';
import { getGraphData } from '../services/DeviceDataService';
import { DeviceData } from '../models/DeviceData';
import { AxisValueFormatterContext } from '@mui/x-charts/models/axis';
import { PieChart } from '@mui/x-charts/PieChart';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { DeviceLimit } from '../models/DeviceLimit';
import { getLimits } from '../services/LimitService';

function DataVisualization() {
  const [height, setHeight] = useState(0.3 * window.innerHeight);
  const [humidityData, setHumidityData] = useState<DeviceData[]>([]);
  const [temperatureData, setTemperatureData] = useState<DeviceData[]>([]);
  const [vocData, setVocData] = useState<DeviceData[]>([]);
  const [alarmData, setAlarmData] = useState<DeviceData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('Day');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  const [limits, setLimits] = useState<DeviceLimit[]>([]);

  const periods = ['Day', 'Month', 'Year'];

  const humidityLimit = limits.find((limit) => limit.name === 'Humidity');
  const temperatureLimit = limits.find((limit) => limit.name === 'Temperature');
  const vocLimit = limits.find((limit) => limit.name === 'VOC');

  function fetchData() {
    let year = selectedDate?.year();
    let month = selectedDate?.month();
    let day = selectedDate?.date();

    if (year && month && day) {
      month++;
      getGraphData(
        'humidity',
        year,
        month,
        day,
        selectedPeriod.toLowerCase()
      ).then((data: DeviceData[]) => {
        return setHumidityData(data);
      });

      getGraphData(
        'temperature',
        year,
        month,
        day,
        selectedPeriod.toLowerCase()
      ).then((data: DeviceData[]) => setTemperatureData(data));

      getGraphData('voc', year, month, day, selectedPeriod.toLowerCase()).then(
        (data: DeviceData[]) => setVocData(data)
      );

      getGraphData(
        'alarm',
        year,
        month,
        day,
        selectedPeriod.toLowerCase()
      ).then((data: any) => {
        setAlarmData(data);
      });
    }

    getLimits().then((data: DeviceLimit[]) => setLimits(data));
  }

  useEffect(() => {
    const handleResize = () => {
      setHeight(0.3 * window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useMemo(() => {
    fetchData();
  }, [selectedPeriod, selectedDate]);

  function drawLineChart(data: DeviceData[], limit: DeviceLimit | undefined) {
    return (
      <LineChart
        dataset={data.map((data) => {
          return DeviceData.toObject(data);
        })}
        xAxis={[
          {
            dataKey: 'lastUpdated',
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
        ]}
        series={[
          {
            dataKey: 'value',
            valueFormatter: (value: any) => {
              return parseFloat(value).toFixed(2) + ' ' + data[0]?.unit;
            },
          },
          {
            data: data.map((data) => limit.lowValue),
            showMark: false,
            valueFormatter: (value: any) => {
              return 'Lower Limit: ' + parseFloat(value).toFixed(0);
            },
            color: '#4caf50',
          },
          {
            data: data.map((data) => limit.highValue),
            showMark: false,
            valueFormatter: (value: any) => {
              return 'Upper Limit: ' + parseFloat(value).toFixed(0);
            },
            color: '#4caf50',
          },
        ]}
        margin={{ top: 8 }}
        height={height}
      />
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
        }}
      >
        <Typography variant="h4" gutterBottom>
          Data Visualization
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6" textAlign="center">
            Humidity
          </Typography>
          {humidityData &&
            humidityLimit &&
            drawLineChart(humidityData, humidityLimit)}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" textAlign="center">
            Temperature
          </Typography>
          {temperatureData &&
            temperatureLimit &&
            drawLineChart(temperatureData, temperatureLimit)}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" textAlign="center">
            Air Quality (voc)
          </Typography>
          {vocData && vocLimit && drawLineChart(vocData, vocLimit)}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" textAlign="center">
            Is window open
          </Typography>
          {alarmData && (
            <PieChart
              series={[
                {
                  data: alarmData.map((data, index) => {
                    return {
                      id: index,
                      value: parseFloat(data.value),
                      label:
                        data.name === 'true_alarms'
                          ? 'Window Opened'
                          : 'Window Closed',
                    };
                  }),
                  valueFormatter: (value: any) => {
                    return parseFloat(value.data).toFixed(0) + '%';
                  },
                },
              ]}
              slotProps={{
                legend: {
                  direction: 'row',
                  position: {
                    vertical: 'top',
                    horizontal: 'middle',
                  },
                  padding: 0,
                },
              }}
              margin={{
                top: 36,
                right: 0,
                bottom: 36,
                left: 0,
              }}
              height={height}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default DataVisualization;
