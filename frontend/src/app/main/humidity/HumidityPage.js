import DateRangeFilter from "src/app/shared/components/DateRangeFilter";
import HumidityHeader from "./components/HumidityHeader";
import HumidityLive from "./components/HumidityLive";
import HumidityTable from "./components/HumidityTable";
import HumidityAverageChart from "./components/HumidityAverageChart";
import {useEffect, useState} from "react";
import DataService from "../../shared/services/data-service";
import FuseLoading from "@fuse/core/FuseLoading";
import {useDispatch} from 'react-redux';
import {showMessage} from "app/store/fuse/messageSlice";

const HumidityPage = () => {
    const dispatch = useDispatch();

    const [trigger, setTrigger] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [humidityData, setHumidityData] = useState([]);
    const [liveHumidity, setLiveHumidity] = useState({});
    const [tempHumidityData, setTempHumidityData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    let pageSize = 10;
    let startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;

    useEffect(() => {
        const fetchCurrentHumidityData = async () => {
            setIsLoading(true);
            try {
                const response = await DataService.getCurrentHumidityData();
                if (response) {
                    setLiveHumidity(response?.data);
                }
            } catch (error) {
                console.error('Error while updating live humidity data: ', error);
                dispatch(showMessage({message: error || "An error occurred! Reload page."}));
            }
        };

        const fetchHumidityData = async () => {
            try {
                const response = await DataService.getHumidityData(startDate, endDate);
                if (response) {
                    setHumidityData(response?.data);
                    setTempHumidityData(response?.data?.slice(startIndex, endIndex));
                    setTotalPages(Math.ceil(response?.data?.length / pageSize));

                    dispatch(showMessage({message: "Updated Humidity Data"}));
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error while updating humidity data: ', error);
                dispatch(showMessage({message: error || "An error occurred! Reload page."}));
                setIsLoading(false);
            }
        };

        fetchCurrentHumidityData();
        fetchHumidityData();

        const intervalId = setInterval(() => {
            setTrigger((trigger) => !trigger);
        }, 30000);

        return () => clearInterval(intervalId);
    }, [trigger, startDate, endDate]);

    useEffect(() => {
        setTempHumidityData(humidityData?.slice(startIndex, endIndex));
    }, [page]);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    return (
        <div className="container">
            <HumidityHeader/>
            {
                isLoading ? <FuseLoading/> :
                    <>
                        <div className="hidden md:flex flex-col md:flex-row md:justify-between gap-20 mx-20 mb-20">
                            <div className="w-full md:w-1/2">
                                <HumidityTable isLoading={isLoading} tempHumidityData={tempHumidityData}
                                               humidityData={humidityData} totalPages={totalPages} page={page}
                                               handleChangePage={handleChangePage}/>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="flex flex-col gap-20">
                                    <DateRangeFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate}
                                                     setEndDate={setEndDate}/>
                                    <HumidityLive liveHumidity={liveHumidity} trigger={trigger}
                                                  setTrigger={setTrigger}/>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex flex-col md:flex-row md:justify-between gap-20 mx-20 mb-20">
                            <div className="w-full">
                                {/*<HumidityAverageChart />*/}
                            </div>
                        </div>
                        <div className="flex flex-col gap-20 md:hidden m-20">
                            <HumidityLive tempHumidityData={tempHumidityData}
                                          humidityData={humidityData} totalPages={totalPages} page={page}
                                          handleChangePage={handleChangePage}/>
                            <DateRangeFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate}
                                             setEndDate={setEndDate}/>
                            <HumidityTable liveHumidity={liveHumidity}/>
                            {/*<HumidityAverageChart />*/}
                        </div>
                    </>
            }
        </div>
    );
};

export default HumidityPage;