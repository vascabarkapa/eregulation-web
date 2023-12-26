import DashboardHeader from "./components/DashboardHeader";
import FusePageSimple from '@fuse/core/FusePageSimple';
import {styled} from '@mui/material/styles';
import DashboardTemperatureHistoryChart from "./components/DashboardTemperatureHistoryChart";
import DashboardHumidityHistoryChart from "./components/DashboardHumidityHistoryChart";
import DashboardTemperatureLive from "./components/DashboardTemperatureLive";
import DashboardHumidityLive from "./components/DashboardHumidityLive";
import DashboardLightLive from "./components/DashboardLightLive";
import {useEffect, useState} from "react";
import DataService from "../../shared/services/data-service";
import LightDataHelper from "../../shared/helpers/LightDataHelper";
import FuseLoading from "@fuse/core/FuseLoading";
import {useDispatch} from 'react-redux';
import {showMessage} from "app/store/fuse/messageSlice";


const Root = styled(FusePageSimple)(({theme}) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
    },
}));

const DashboardPage = () => {
    const dispatch = useDispatch();

    const [trigger, setTrigger] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [liveTemperature, setLiveTemperature] = useState({});
    const [liveHumidity, setLiveHumidity] = useState({});
    const [liveLight, setLiveLight] = useState({});
    const [temperatureHistoryData, setTemperatureHistoryData] = useState([]);

    useEffect(() => {
        const fetchLatestData = async () => {
            setIsLoading(true);
            try {
                DataService.getLatestData().then((response) => {
                    if (response) {
                        setLiveTemperature(response?.data["t"]);
                        setLiveHumidity(response?.data["h"]);
                        setLiveLight(response?.data["l"]);

                        const handleVisibilityChange = () => {
                            if (document.hidden) {
                                document.title = response?.data["t"]?.value +
                                    "\u00B0C | " + response?.data["h"]?.value + "% | " +
                                    LightDataHelper.getModeValue(response?.data["l"]?.value);
                            } else {
                                document.title = "eRegulation";
                            }
                        };

                        document.addEventListener("visibilitychange", handleVisibilityChange);
                        dispatch(showMessage({message: "Updated latest data"}));
                        setIsLoading(false);
                    }
                });
            } catch (error) {
                console.error("Error fetching latest data:", error);
                dispatch(showMessage({message: error || "An error occurred! Reload page."}));
                setIsLoading(false);
            }
        };

        const fetchHistoryData = async () => {
            setIsLoading(true);
            try {
                DataService.getTemperatureHistoryData().then((response) => {
                    if (response) {
                        setTemperatureHistoryData(response?.data);
                    }
                });
            } catch (error) {
                console.error("Error fetching latest data:", error);
                dispatch(showMessage({message: error || "An error occurred! Reload page."}));
                setIsLoading(false);
            }
        };

        fetchHistoryData();
        fetchLatestData();

        const intervalId = setInterval(() => {
            setTrigger((trigger) => !trigger);
        }, 30000);

        return () => clearInterval(intervalId);
    }, [trigger]);

    return (
        <Root
            header={<DashboardHeader/>}
            content={
                isLoading ? <FuseLoading/> :
                    <div className="grid grid-cols-1 w-full mt-10 mx-20">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="md:col-span-1 col-span-3 my-10 md:mr-10">
                                <DashboardTemperatureLive liveTemperature={liveTemperature} trigger={trigger}
                                                          setTrigger={setTrigger}/>
                            </div>
                            <div className="md:col-span-1 col-span-3 my-10 md:ml-10">
                                <DashboardHumidityLive liveHumidity={liveHumidity} trigger={trigger}
                                                       setTrigger={setTrigger}/>
                            </div>
                            <div className="md:col-span-1 col-span-3 my-10 md:ml-10">
                                <DashboardLightLive liveLight={liveLight} trigger={trigger}
                                                    setTrigger={setTrigger}/>
                            </div>
                        </div>
                        <div className="w-full my-10">

                            <DashboardTemperatureHistoryChart temperatureHistoryData={temperatureHistoryData}/>
                        </div>
                        <div className="w-full mt-10 mb-20">
                            <DashboardHumidityHistoryChart/>
                        </div>
                    </div>
            }
        />
    );
}

export default DashboardPage;
