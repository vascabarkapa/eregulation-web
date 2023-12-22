import DateRangeFilter from "src/app/shared/components/DateRangeFilter";
import TemperatureHeader from "./components/TemperatureHeader";
import TemperatureLive from "./components/TemperatureLive";
import TemperatureTable from "./components/TemperatureTable";
import TemperatureAverageChart from "./components/TemperatureAverageChart";
import {useEffect, useState} from "react";
import DataService from "../../shared/services/data-service";
import FuseLoading from "@fuse/core/FuseLoading";

const TemperaturePage = () => {
    const [trigger, setTrigger] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [temperatureData, setTemperatureData] = useState([]);
    const [liveTemperature, setLiveTemperature] = useState({});
    const [tempTemperatureData, setTempTemperatureData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    let pageSize = 10;
    let startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;

    useEffect(() => {
        setIsLoading(true);
        DataService.getTemperatureData().then((response) => {
            if (response) {
                setTemperatureData(response?.data);
                setLiveTemperature(response?.data[0]);
                setTempTemperatureData(response?.data?.slice(startIndex, endIndex));
                setIsLoading(false);
                setTotalPages(Math.ceil(response?.data?.length / pageSize));
            }
        })
    }, [trigger]);

    useEffect(() => {
        setTempTemperatureData(temperatureData?.slice(startIndex, endIndex));
    }, [page]);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    return (
        <div className="container">
            <TemperatureHeader/>
            {
                isLoading ? <FuseLoading/> :
                    <>
                        <div className="hidden md:flex flex-col md:flex-row md:justify-between gap-20 mx-20 mb-20">
                            <div className="w-full md:w-1/2">
                                <TemperatureTable isLoading={isLoading} tempTemperatureData={tempTemperatureData}
                                                  temperatureData={temperatureData} totalPages={totalPages} page={page}
                                                  handleChangePage={handleChangePage}/>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="flex flex-col gap-20">
                                    <DateRangeFilter/>
                                    <TemperatureLive liveTemperature={liveTemperature} trigger={trigger}
                                                     setTrigger={setTrigger}/>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex flex-col md:flex-row md:justify-between gap-20 mx-20 mb-20">
                            <div className="w-full">
                                {/*<TemperatureAverageChart />*/}
                            </div>
                        </div>
                        <div className="flex flex-col gap-20 md:hidden m-20">
                            <TemperatureLive liveTemperature={liveTemperature}/>
                            <DateRangeFilter/>
                            <TemperatureTable isLoading={isLoading} tempTemperatureData={tempTemperatureData}
                                              temperatureData={temperatureData} totalPages={totalPages} page={page}
                                              handleChangePage={handleChangePage}/>
                            {/*<TemperatureAverageChart />*/}
                        </div>
                    </>
            }
        </div>
    );
}

export default TemperaturePage;
