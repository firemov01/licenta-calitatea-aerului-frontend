import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getTips } from '../services/TipsService';

export default function Tips() {
  // get tips from the backend
  const [tips, setTips] = useState([]);

  useEffect(() => {
    getTips().then((data: any) => setTips(data.tips));
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>
        Tips to improve air quality
      </Typography>
      <Box>
        {tips.map((tip: string, index: number) => {
          return (
            <Box key={index}>
              {/* <Typography variant="h6">{tip.title}</Typography> */}
              <Typography>{tip}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
