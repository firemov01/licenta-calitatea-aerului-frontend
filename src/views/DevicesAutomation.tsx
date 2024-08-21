import { Box } from '@mui/system';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Switch,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  editAutomatedDevice,
  getAutomatedDevices,
} from '../services/AutomatedDeviceService';
import Modal from '@mui/material/Modal';
import AddDeviceModal from '../components/DeviceModal';
import { AutomatedDevice } from '../models/AutomatedDevice';

export default function DevicesAutomation() {
  const [devices, setDevices] = useState<AutomatedDevice[]>([]);
  const [openAddDeviceModal, setOpenAddDeviceModal] = useState(false);
  const [openEditDeviceModal, setOpenEditDeviceModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<
    AutomatedDevice | undefined
  >(undefined);
  const handleOpenAddDeviceModal = () => setOpenAddDeviceModal(true);
  const handleCloseAddDeviceModal = () => setOpenAddDeviceModal(false);
  const handleOpenEditDeviceModal = (device: AutomatedDevice) => {
    setSelectedDevice(device);
    setOpenEditDeviceModal(true);
  };
  const handleCloseEditDeviceModal = () => {
    setSelectedDevice(undefined);
    setOpenEditDeviceModal(false);
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  function fetchDevices() {
    getAutomatedDevices().then((data: AutomatedDevice[]) => setDevices(data));
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          justifyContent: 'space-between',
          mb: '12px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Devices Automation
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddDeviceModal}
        >
          Add Device
        </Button>
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
        {devices.map((device: AutomatedDevice) => {
          return (
            <Card key={device.id} sx={{ width: '200px' }}>
              <Box
                sx={{
                  filter: 'invert(100%)',
                  width: '200px',
                  objectFit: 'contain',
                }}
                onClick={() => {
                  handleOpenEditDeviceModal(device);
                }}
              >
                <img
                  className="device-image scale-on-hover"
                  src={device.image?.imageUrl}
                  alt={device.image?.name}
                />
              </Box>
              <CardContent>
                <Typography variant="h6">{device.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {device.description}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  size="small"
                  onClick={() => handleOpenEditDeviceModal(device)}
                >
                  Edit
                </Button>
                <Switch
                  checked={device.enabled}
                  value={device.enabled}
                  onChange={(event) => {
                    let modifiedDevices = devices.map((d) => {
                      if (d.id === device.id) {
                        d.enabled = event.target.checked;
                      }
                      return d;
                    });
                    let modifiedDevice = modifiedDevices.find(
                      (d) => d.id === device.id
                    );
                    editAutomatedDevice(modifiedDevice!).then(() => {
                      setDevices(modifiedDevices);
                    });
                  }}
                />
              </CardActions>
            </Card>
          );
        })}
      </Box>
      <Modal
        open={openAddDeviceModal}
        onClose={handleCloseAddDeviceModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <AddDeviceModal
            onClose={handleCloseAddDeviceModal}
            refetch={fetchDevices}
          />
        </div>
      </Modal>
      <Modal
        open={openEditDeviceModal}
        onClose={handleCloseEditDeviceModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <AddDeviceModal
            onClose={handleCloseEditDeviceModal}
            refetch={fetchDevices}
            device={selectedDevice}
          />
        </div>
      </Modal>
    </Box>
  );
}
