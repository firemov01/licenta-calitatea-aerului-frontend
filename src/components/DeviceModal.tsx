import React, { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import {
  Autocomplete,
  Button,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import {
  addAutomatedDevice,
  editAutomatedDevice,
  getDeviceImages,
} from '../services/AutomatedDeviceService';
import { AutomatedDevice } from '../models/AutomatedDevice';
import { DeviceImage } from '../models/DeviceImage';

interface props {
  onClose: VoidFunction;
  refetch: VoidFunction;
  device?: AutomatedDevice;
}

export default function DeviceModal({ onClose, refetch, device }: props) {
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const [image, setImage] = useState<DeviceImage | null>(null);
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [images, setImages] = useState<DeviceImage[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);

  useMemo(() => {
    if (device) {
      setName(device.name);
      setDescription(device.description);
      setEndpoint(device.endpoint);
      setImage(device.image);
      setEnabled(device.enabled);
    }
    if (images.length === 0)
      getDeviceImages().then((data: DeviceImage[]) => setImages(data));
  }, [device, images]);

  useEffect(() => {
    if (name && description && endpoint && image) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [name, description, endpoint, image]);

  function onSubmit() {
    if (
      device &&
      name &&
      description &&
      endpoint &&
      image &&
      enabled !== null
    ) {
      const updatedDevice = new AutomatedDevice(
        device.id,
        name,
        description,
        endpoint,
        enabled,
        image
      );
      editAutomatedDevice(updatedDevice).then((event) => {
        refetch();
        onClose();
      });
    } else {
      if (!name || !description || !endpoint || !image) {
        return;
      }
      const device = new AutomatedDevice(
        undefined,
        name,
        description,
        endpoint,
        enabled === null ? false : enabled,
        image
      );
      addAutomatedDevice(device).then((event) => {
        refetch();
        onClose();
      });
    }
  }

  return (
    <Box className="modal">
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        gutterBottom
      >
        {device ? 'Edit Device' : 'Add Device'}
      </Typography>
      <FormGroup sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          id="endpoint"
          label="Endpoint"
          variant="outlined"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          required
        />
        <Autocomplete
          disablePortal
          id="image"
          options={images}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={image}
          onChange={(e, value) => setImage(value)}
          renderInput={(params) => (
            <TextField {...params} label="Image" variant="outlined" />
          )}
        />
        <FormControlLabel
          control={
            <Switch
              checked={enabled ?? false}
              value={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
          }
          label="Enabled"
        />
        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={!isFormValid}
            onClick={onSubmit}
          >
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </FormGroup>
      </FormGroup>
    </Box>
  );
}
