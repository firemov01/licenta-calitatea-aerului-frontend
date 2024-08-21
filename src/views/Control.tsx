import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Modal,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { getLimits } from '../services/LimitService';
import { DeviceLimit } from '../models/DeviceLimit';
import LimitModal from '../components/LimitModal';
import { getMode, updateMode } from '../services/ControlService';

export default function Control() {
  const [limits, setLimits] = useState<DeviceLimit[]>([]);
  const [limitModalOpen, setLimitModalOpen] = useState(false);
  const [selectedLimit, setSelectedLimit] = useState<DeviceLimit | undefined>(
    undefined
  );
  const [mode, setMode] = useState(false);

  useEffect(() => {
    fetchLimits();
    fetchMode();
  }, []);

  function fetchLimits() {
    getLimits().then((data: DeviceLimit[]) => setLimits(data));
  }

  function fetchMode() {
    getMode().then((data) => {
      setMode(data.is_active);
      console.log(data);
    });
  }

  function toggleMode() {
    updateMode().then((data) => {
      setMode(data.is_active);
      console.log(data);
    });
  }

  function renderCard(limit: DeviceLimit) {
    return (
      <Box
        key={limit.id}
        className="scale-on-hover"
        onClick={() => {
          setSelectedLimit(limit);
          setLimitModalOpen(true);
        }}
      >
        <Card sx={{ width: '200px' }}>
          <Box
            sx={{
              filter: 'invert(100%)',
              width: '200px',
              objectFit: 'contain',
            }}
          >
            <img
              className="device-image"
              src={limit.imageUrl}
              alt={limit.name}
            />
          </Box>
          <CardContent>
            <Typography variant="h6">{limit.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Low limit: {limit.lowValue} {limit.unit}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              High limit: {limit.highValue} {limit.unit}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Control
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px',
          flexGrow: 1,
        }}
      >
        <ButtonGroup sx={{ width: 'min-content' }}>
          <Button
            variant={!mode ? 'contained' : 'outlined'}
            onClick={() => toggleMode()}
            sx={{ height: 'min-content' }}
          >
            Manual
          </Button>
          <Button
            variant={mode ? 'contained' : 'outlined'}
            onClick={() => toggleMode()}
            sx={{ height: 'min-content' }}
          >
            Automatic
          </Button>
        </ButtonGroup>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          {limits.map((limit) => renderCard(limit))}
        </Box>
      </Box>
      <Modal
        open={limitModalOpen}
        onClose={() => setLimitModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <LimitModal
            limit={selectedLimit}
            onClose={() => setLimitModalOpen(false)}
            refetch={fetchLimits}
          />
        </div>
      </Modal>
    </Box>
  );
}
