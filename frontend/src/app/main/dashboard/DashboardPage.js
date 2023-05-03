import DashboardHeader from "./DashboardHeader";
import FusePageSimple from '@fuse/core/FusePageSimple';
import _ from '@lodash';
import { styled } from '@mui/material/styles';
import DashboardTemperatureHistoryChart from "./DashboardTemperatureHistoryChart";
import DashboardHumidityHistoryChart from "./DashboardHumidityHistoryChart";
import DashboardTemperatureLive from "./DashboardTemperatureLive";
import DashboardHumidityLive from "./DashboardHumidityLive";

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
                <div className="grid grid-cols-1 w-full mt-10 mx-20">
                    <div className="grid grid-cols-2">
                        <div className="col-span-1 my-10 mr-10">
                            <DashboardTemperatureLive />
                        </div>
                        <div className="col-span-1 my-10 ml-10">
                            <DashboardHumidityLive />
                        </div>
                    </div>
                    <div className="w-full my-10">
                        <DashboardTemperatureHistoryChart />
                    </div>
                    <div className="w-full mt-10 mb-20">
                        <DashboardHumidityHistoryChart />
                    </div>
                </div>
            }
        />
    );
}

export default DashboardPage;
