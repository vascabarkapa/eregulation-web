import DateRangeFilter from "src/app/shared/components/DateRangeFilter";
import TemperatureHeader from "./components/TemperatureHeader";
import TemperatureLive from "./components/TemperatureLive";
import TemperatureTable from "./components/TemperatureTable";
import TemperatureAverageChart from "./components/TemperatureAverageChart";
import {useEffect, useState} from "react";
import DataService from "../../shared/services/data-service";
import {useDispatch} from "react-redux";

const TemperaturePage = () => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [temperatureData, setTemperatureData] = useState([]);
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
                setTempTemperatureData(response?.data?.slice(startIndex, endIndex));
                setIsLoading(false);
                setTotalPages(Math.ceil(response?.data?.length / pageSize));
            }
        })
    }, []);

    useEffect(() => {
        setTempTemperatureData(temperatureData?.slice(startIndex, endIndex));
    }, [page]);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    return (
        <div className="container">
            <TemperatureHeader/>
            <div className="hidden md:flex flex-col md:flex-row md:justify-between gap-20 mx-20 mb-20">
                <div className="w-full md:w-1/2">
                    <TemperatureTable isLoading={isLoading} tempTemperatureData={tempTemperatureData}
                                      temperatureData={temperatureData} totalPages={totalPages} page={page}
                                      handleChangePage={handleChangePage}/>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="flex flex-col gap-20">
                        <DateRangeFilter/>
                        <TemperatureLive/>
                    </div>
                </div>
            </div>
            <div className="hidden md:flex flex-col md:flex-row md:justify-between gap-20 mx-20 mb-20">
                <div className="w-full">
                    {/*<TemperatureAverageChart />*/}
                </div>
            </div>

            <div className="flex flex-col gap-20 md:hidden m-20">
                <TemperatureLive/>
                <DateRangeFilter/>
                <TemperatureTable/>
                {/*<TemperatureAverageChart />*/}
            </div>
        </div>
    );
}

export default TemperaturePage;
