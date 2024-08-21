import { ThemeProvider, createTheme } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import Home from './views/Home';
import NotFound from './views/NotFound';
import AppNavigation from './components/AppNavigation';
import DataVisualization from './views/DataVisualization';
import Tips from './views/Tips';
import DevicesAutomation from './views/DevicesAutomation';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Predictions from './views/Predictions';
import Control from './views/Control';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
    // typography: {
    //   fontFamily: ['Monaspace Xenon'].join(','),
    // },
    // components: {
    //   MuiCssBaseline: {
    //     styleOverrides: `
    //       @font-face {
    //   }
    //     `,
    //   }
    // }
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppNavigation>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/devices" element={<DevicesAutomation />} />
            <Route path="/control" element={<Control />} />
            <Route path="/data-visualization" element={<DataVisualization />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppNavigation>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
