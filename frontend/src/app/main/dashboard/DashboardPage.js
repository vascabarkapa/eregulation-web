import DashboardHeader from "./DashboardHeader";
import FusePageSimple from '@fuse/core/FusePageSimple';
import _ from '@lodash';
import { styled } from '@mui/material/styles';
import DashboardTemperatureHistoryChart from "./DashboardTemperatureHistoryChart";
import DashboardHumidityHistoryChart from "./DashboardHumidityHistoryChart";

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));

const DashboardPage = () => {
  return (
    <Root
      header={<DashboardHeader />}
      content={
        <div className="grid grid-cols-1 w-full mx-20">
          <div className="w-full my-20">
            <DashboardTemperatureHistoryChart />
          </div>
          <div className="w-full my-20">
            <DashboardHumidityHistoryChart />
          </div>
        </div>
      }
    />
  );
}

export default DashboardPage;
