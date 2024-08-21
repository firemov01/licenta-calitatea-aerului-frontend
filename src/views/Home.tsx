import { Box } from '@mui/system';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Switch,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  editAutomatedDevice,
  getAutomatedDevices,
} from '../services/AutomatedDeviceService';
import Modal from '@mui/material/Modal';
import { AutomatedDevice } from '../models/AutomatedDevice';
import { Device } from '../models/Device';
import { getDeviceStatus } from '../services/StatusService';

function Home() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    getDeviceStatus().then((data: Device[]) => setDevices(data));
  }, []);

  function shouldDisplayData(key: string) {
    const should_not_display = [
      'minvoc',
      'maxvox',
      'recommendation',
      'exposurelimit',
    ];
    return !should_not_display.includes(key);
  }

  function renderCard(device: Device, index: number) {
    return (
      <Card
        sx={{
          width: '250px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        key={index}
      >
        <CardContent>
          <Typography variant="h6">{device.name}</Typography>
          {device.deviceData.map(
            (data, indexa) =>
              shouldDisplayData(data.key) && (
                <div key={indexa}>
                  <Typography variant="body2" color="text.secondary">
                    {data.name}: {data.value} {data.unit}
                  </Typography>
                </div>
              )
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'space-between',
            mb: '12px',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Welcome to the Air Quality Monitoring System
          </Typography>
          <Typography variant="h6" gutterBottom>
            This system monitors the air quality in your home and provides you
            with insights and tips on how to improve it.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'fled',
            flexDirection: 'row',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {devices.map((device: Device, index) => {
            return renderCard(device, index);
          })}
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
