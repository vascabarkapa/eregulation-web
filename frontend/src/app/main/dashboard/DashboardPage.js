import DashboardHeader from "./components/DashboardHeader";
import FusePageSimple from '@fuse/core/FusePageSimple';
import _ from '@lodash';
import { styled } from '@mui/material/styles';
import DashboardTemperatureHistoryChart from "./components/DashboardTemperatureHistoryChart";
import DashboardHumidityHistoryChart from "./components/DashboardHumidityHistoryChart";
import DashboardTemperatureLive from "./components/DashboardTemperatureLive";
import DashboardHumidityLive from "./components/DashboardHumidityLive";
import DashboardLightLive from "./components/DashboardLightLive";

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
                    <div className="grid grid-cols-3">
                        <div className="col-span-1 my-10 mr-10">
                            <DashboardTemperatureLive />
                        </div>
                        <div className="col-span-1 my-10 ml-10">
                            <DashboardHumidityLive />
                        </div>
                        <div className="col-span-1 my-10 ml-10">
                            <DashboardLightLive />
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
