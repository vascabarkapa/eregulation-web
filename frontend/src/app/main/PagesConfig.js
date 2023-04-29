import DashboardPage from "./dashboard/DashboardPage";

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
  ],
};

export default PagesConfig;
