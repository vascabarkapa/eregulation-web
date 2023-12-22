import DateRangeFilter from "src/app/shared/components/DateRangeFilter";
import HumidityHeader from "./components/HumidityHeader";
import HumidityLive from "./components/HumidityLive";
import HumidityTable from "./components/HumidityTable";
import HumidityAverageChart from "./components/HumidityAverageChart";
import {useEffect, useState} from "react";
import DataService from "../../shared/services/data-service";
import FuseLoading from "@fuse/core/FuseLoading";

const HumidityPage = () => {
    const [trigger, setTrigger] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [humidityData, setHumidityData] = useState([]);
    const [liveHumidity, setLiveHumidity] = useState({});
    const [tempHumidityData, setTempHumidityData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    let pageSize = 10;
    let startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;

    useEffect(() => {
        const fetchHumidityData = async () => {
            setIsLoading(true);
            try {
                const response = await DataService.getHumidityData();
                if (response) {
                    setHumidityData(response?.data);
                    setLiveHumidity(response?.data[0]);
                    setTempHumidityData(response?.data?.slice(startIndex, endIndex));
                    setIsLoading(false);
                    setTotalPages(Math.ceil(response?.data?.length / pageSize));
                }
            } catch (error) {
                console.error('Error while updating humidity data: ', error);
                setIsLoading(false);
            }
        };

        fetchHumidityData();

        const intervalId = setInterval(() => {
            setTrigger((trigger) => !trigger);
        }, 30000);

        return () => clearInterval(intervalId);
    }, [trigger]);

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
                                    <DateRangeFilter/>
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
                            <DateRangeFilter/>
                            <HumidityTable liveHumidity={liveHumidity}/>
                            {/*<HumidityAverageChart />*/}
                        </div>
                    </>
            }
        </div>
    );
};

export default HumidityPage;