const navigationConfig = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'heroicons-outline:home',
    url: '/dashboard',
  },
  {
    id: 'temperature-component',
    title: 'Temperature',
    type: 'item',
    icon: 'material-outline:thermostat',
    url: '/temperature',
  },
  {
    id: 'humidity-component',
    title: 'Humidity',
    type: 'item',
    icon: 'material-outline:water_drop',
    url: '/humidity',
  },
  {
    id: 'light-component',
    title: 'Light',
    type: 'item',
    icon: 'heroicons-outline:light-bulb',
    url: '/light',
  },
  {
    id: 'divider-1',
    type: 'divider',
  },
  {
    id: 'user-component',
    title: 'Users',
    type: 'item',
    icon: 'heroicons-outline:users',
    url: '/users',
  },
  {
    id: 'about-component',
    title: 'About',
    type: 'item',
    icon: 'heroicons-outline:information-circle',
    url: '/about',
  },
];

export default navigationConfig;
