const navigationConfig = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'heroicons-outline:home',
    url: '/dashboard',
  },
  {
    id: 'temparature-component',
    title: 'Temparature',
    type: 'item',
    icon: 'heroicons-outline:sun',
    url: '/temparature',
  },
  {
    id: 'humidity-component',
    title: 'Humidity',
    type: 'item',
    icon: 'heroicons-outline:cloud',
    url: '/humidity',
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
