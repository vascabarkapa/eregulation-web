import DashboardPage from "./dashboard/DashboardPage";
import TemparaturePage from "./temparature/TemparaturePage";
import HumidityPage from "./humidity/HumidityPage";
import UsersPage from "./users/UsersPage";
import AboutPage from "./about/AboutPage";

const PagesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'dashboard',
      element: <DashboardPage />,
    },
    {
      path: 'temparature',
      element: <TemparaturePage />,
    },
    {
      path: 'humidity',
      element: <HumidityPage />,
    },
    {
      path: 'users',
      element: <UsersPage />,
    },
    {
      path: 'about',
      element: <AboutPage />,
    },
  ],
};

export default PagesConfig;
