import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import {
  Tune,
  TipsAndUpdates,
  Sensors,
  AutoGraph,
  Menu,
  Home,
  Update,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import { Scrollbar } from 'react-scrollbars-custom';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: 'rgba(0, 0, 0, 0) !important',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: 'rgba(0, 0, 0, 0) !important',
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface Props {
  children: React.ReactNode;
}

export default function AppNavigation(props: Props) {
  const { children } = props;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function getLocation() {
    if (location.pathname === '/') {
      return '/home';
    } else {
      return location.pathname;
    }
  }

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column' }}
      className="home-container"
    >
      <CssBaseline />
      <AppBar
        position="relative"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          height: 'min-content',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 3,
            }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Air Quality Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <Drawer
          variant="permanent"
          open={open}
          className="drawer-background"
          // sx={{ position: 'relative' }}
        >
          <DrawerHeader />
          <List>
            {[
              { name: 'home', icon: <Home /> },
              { name: 'data-visualization', icon: <AutoGraph /> },
              { name: 'predictions', icon: <Update /> },
              { name: 'tips', icon: <TipsAndUpdates /> },
              { name: 'devices', icon: <Sensors /> },
              { name: 'control', icon: <Tune /> },
            ].map((item, _) => (
              <ListItem
                component={Link}
                to={item.name === 'home' ? '/' : `/${item.name}`}
                selected={getLocation() === `/${item.name}`}
                key={item.name}
                disablePadding
                sx={{ display: 'block' }}
                style={{ color: 'inherit', textDecoration: 'inherit' }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name
                      .split('-')
                      .map((item) => `${item[0].toUpperCase()}${item.slice(1)}`)
                      .join(' ')}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
    
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto',
          }}
          className="content-container"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
