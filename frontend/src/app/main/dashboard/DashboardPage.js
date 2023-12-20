import DashboardHeader from "./components/DashboardHeader";
import FusePageSimple from '@fuse/core/FusePageSimple';
import _ from '@lodash';
import {styled} from '@mui/material/styles';
import DashboardTemperatureHistoryChart from "./components/DashboardTemperatureHistoryChart";
import DashboardHumidityHistoryChart from "./components/DashboardHumidityHistoryChart";
import DashboardTemperatureLive from "./components/DashboardTemperatureLive";
import DashboardHumidityLive from "./components/DashboardHumidityLive";
import DashboardLightLive from "./components/DashboardLightLive";
import {useEffect, useState} from "react";
import DataService from "../../shared/services/data-service";

const Root = styled(FusePageSimple)(({theme}) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
    },
}));

const DashboardPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [liveTemperature, setLiveTemperature] = useState({});
    const [liveHumidity, setLiveHumidity] = useState({});
    const [liveLight, setLiveLight] = useState({});

    useEffect(() => {
        DataService.getLatestData().then((response) => {
            setIsLoading(true);
            if (response) {
                setLiveTemperature(response?.data["t"]);
                setLiveHumidity(response?.data["h"]);
                setLiveLight(response?.data["l"]);
                setIsLoading(false);
            }
        })
    }, [])

    return (
        <Root
            header={<DashboardHeader/>}
            content={
                <div className="grid grid-cols-1 w-full mt-10 mx-20">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="md:col-span-1 col-span-3 my-10 md:mr-10">
                            {!isLoading && <DashboardTemperatureLive liveTemperature={liveTemperature}/>}
                        </div>
                        <div className="md:col-span-1 col-span-3 my-10 md:ml-10">
                            {!isLoading && <DashboardHumidityLive liveHumidity={liveHumidity}/>}
                        </div>
                        <div className="md:col-span-1 col-span-3 my-10 md:ml-10">
                            {!isLoading && <DashboardLightLive liveLight={liveLight}/>}
                        </div>
                    </div>
                    <div className="w-full my-10">
                        {/*<DashboardTemperatureHistoryChart />*/}
                    </div>
                    <div className="w-full mt-10 mb-20">
                        {/*<DashboardHumidityHistoryChart />*/}
                    </div>
                </div>
            }
        />
    );
}

export default DashboardPage;
