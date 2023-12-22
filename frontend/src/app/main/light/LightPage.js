import DateRangeFilter from "src/app/shared/components/DateRangeFilter";
import LightHeader from "./components/LightHeader";
import LightLive from "./components/LightLive";
import LightTable from "./components/LightTable";
import {useEffect, useState} from "react";
import DataService from "../../shared/services/data-service";
import FuseLoading from "@fuse/core/FuseLoading";
import {useDispatch} from 'react-redux';
import {showMessage} from "app/store/fuse/messageSlice";

const LightPage = () => {
    const dispatch = useDispatch();

    const [trigger, setTrigger] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lightData, setLightData] = useState([]);
    const [liveLight, setLiveLight] = useState({});
    const [tempLightData, setTempLightData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    let pageSize = 10;
    let startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;

    useEffect(() => {
        const fetchCurrentLightData = async () => {
            setIsLoading(true);
            try {
                const response = await DataService.getCurrentLightData();
                if (response) {
                    setLiveLight(response?.data);
                }
            } catch (error) {
                console.error('Error while updating live light data: ', error);
                dispatch(showMessage({message: error || "An error occurred! Reload page."}));
            }
        };

        const fetchLightData = async () => {
            try {
                const response = await DataService.getLightData(startDate, endDate);
                if (response) {
                    setLightData(response?.data);
                    setTempLightData(response?.data?.slice(startIndex, endIndex));
                    setTotalPages(Math.ceil(response?.data?.length / pageSize));

                    dispatch(showMessage({message: "Updated Light Data"}));
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error while updating light data: ', error);
                dispatch(showMessage({message: error || "An error occurred! Reload page."}));
                setIsLoading(false);
            }
        };

        fetchCurrentLightData();
        fetchLightData();

        const intervalId = setInterval(() => {
            setTrigger((trigger) => !trigger);
        }, 30000);

        return () => clearInterval(intervalId);
    }, [trigger, startDate, endDate]);

    useEffect(() => {
        setTempLightData(lightData?.slice(startIndex, endIndex));
    }, [page]);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    return (
        <div className="container">
            <LightHeader/>
            {
                isLoading ? <FuseLoading/> :
                    <>
                        <div className="hidden md:flex flex-col md:flex-row md:justify-between gap-20 mx-20 mb-20">
                            <div className="w-full md:w-1/2">
                                <LightTable tempLightData={tempLightData}
                                            lightData={lightData} totalPages={totalPages} page={page}
                                            handleChangePage={handleChangePage}/>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="flex flex-col gap-20">
                                    <DateRangeFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate}
                                                     setEndDate={setEndDate}/>
                                    <LightLive liveLight={liveLight} trigger={trigger} setTrigger={setTrigger}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-20 md:hidden m-20">
                            <LightLive liveLight={liveLight}/>
                            <DateRangeFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate}
                                             setEndDate={setEndDate}/>
                            <LightTable isLoading={isLoading} tempLightData={tempLightData}
                                        lightData={lightData} totalPages={totalPages} page={page}
                                        handleChangePage={handleChangePage}/>
                        </div>
                    </>
            }
        </div>
    );
};

export default LightPage;