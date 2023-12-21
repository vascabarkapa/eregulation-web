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
import LightDataHelper from "../../shared/helpers/LightDataHelper";

const Root = styled(FusePageSimple)(({theme}) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
    },
}));

const DashboardPage = () => {
    const [trigger, setTrigger] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [liveTemperature, setLiveTemperature] = useState({});
    const [liveHumidity, setLiveHumidity] = useState({});
    const [liveLight, setLiveLight] = useState({});

    const fetchDataAndUpdateState = async () => {
        setIsLoading(true);

        try {
            const response = await DataService.getLatestData();
            if (response) {
                setLiveTemperature(response?.data["t"]);
                setLiveHumidity(response?.data["h"]);
                setLiveLight(response?.data["l"]);

                const handleVisibilityChange = () => {
                    if (document.hidden) {
                        document.title =
                            response?.data["t"]?.value +
                            "\u00B0C | " +
                            response?.data["h"]?.value +
                            "% | " +
                            LightDataHelper.getModeValue(response?.data["l"]?.value);
                    } else {
                        document.title = "eRegulation";
                    }
                };

                document.addEventListener("visibilitychange", handleVisibilityChange);
            }
        } catch (error) {
            console.log("Error while fetching latest data: " + error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDataAndUpdateState();
    }, []);

    useEffect(() => {
        fetchDataAndUpdateState();
    }, [trigger]);

    return (
        <Root
            header={<DashboardHeader/>}
            content={
                <div className="grid grid-cols-1 w-full mt-10 mx-20">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="md:col-span-1 col-span-3 my-10 md:mr-10">
                            {!isLoading && <DashboardTemperatureLive liveTemperature={liveTemperature} trigger={trigger}
                                                                     setTrigger={setTrigger}/>}
                        </div>
                        <div className="md:col-span-1 col-span-3 my-10 md:ml-10">
                            {!isLoading && <DashboardHumidityLive liveHumidity={liveHumidity} trigger={trigger}
                                                                  setTrigger={setTrigger}/>}
                        </div>
                        <div className="md:col-span-1 col-span-3 my-10 md:ml-10">
                            {!isLoading && <DashboardLightLive liveLight={liveLight} trigger={trigger}
                                                               setTrigger={setTrigger}/>}
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
