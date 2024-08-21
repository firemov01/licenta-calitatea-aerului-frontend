import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormGroup,
} from '@mui/material';
import { useState, useMemo, useEffect } from 'react';
import { DeviceLimit } from '../models/DeviceLimit';
import { updateLimit } from '../services/LimitService';

interface props {
  onClose?: VoidFunction;
  refetch?: VoidFunction;
  limit?: DeviceLimit;
}

export default function LimitModal({ onClose, refetch, limit }: props) {
  const [lowValue, setLowValue] = useState<number | undefined>(limit?.lowValue);
  const [highValue, setHighValue] = useState<number | undefined>(
    limit?.highValue
  );

  useEffect(() => {
    if (limit) {
      setLowValue(limit.lowValue);
      setHighValue(limit.highValue);
    }
  }, []);

  // useEffect(() => {}, []);

  function isFormValid() {
    return lowValue && highValue && lowValue < highValue;
  }

  function onSubmit() {
    if (isFormValid()) {
      updateLimit(
        new DeviceLimit(
          limit!.id,
          limit!.name,
          lowValue!,
          highValue!,
          limit!.unit,
          limit!.imageUrl
        )
      ).then(() => {
        onClose && onClose();
        refetch && refetch();
      });
    }
  }

  return (
    // U can change the lower limit or the upper limit of the device
    <Box className="modal">
      <Box className="modal-content">
        <Typography variant="h6">Edit Limit</Typography>
        <TextField
          sx={{ width: '80%' }}
          label="Lower Limit"
          type="number"
          value={lowValue}
          onChange={(e) => setLowValue(parseInt(e.target.value))}
          error={(lowValue ?? 0) > (highValue ?? 0)}
          helperText={
            lowValue && highValue && lowValue > highValue
              ? 'Lower limit must be lower than upper limit'
              : ''
          }
        />
        <TextField
          sx={{ width: '80%' }}
          label="Upper Limit"
          type="number"
          value={highValue}
          onChange={(e) => setHighValue(parseInt(e.target.value))}
          error={(highValue ?? 0) < (lowValue ?? 0)}
          helperText={
            lowValue && highValue && highValue < lowValue
              ? 'Upper limit must be higher than lower limit'
              : ''
          }
        />
        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            justifyContent: 'space-between',
            width: '80%',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={!isFormValid()}
            onClick={onSubmit}
          >
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </FormGroup>
      </Box>
    </Box>
  );
}
