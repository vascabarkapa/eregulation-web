import DateRangeFilter from "src/app/shared/components/DateRangeFilter";
import LightHeader from "./components/LightHeader";
import LightLive from "./components/LightLive";
import LightTable from "./components/LightTable";
import {useEffect, useState} from "react";
import DataService from "../../shared/services/data-service";
import FuseLoading from "@fuse/core/FuseLoading";

const LightPage = () => {
    const [trigger, setTrigger] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lightData, setLightData] = useState([]);
    const [liveLight, setLiveLight] = useState({});
    const [tempLightData, setTempLightData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    let pageSize = 10;
    let startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;

    useEffect(() => {
        setIsLoading(true);
        DataService.getLightData().then((response) => {
            if (response) {
                setLightData(response?.data);
                setLiveLight(response?.data[0]);
                setTempLightData(response?.data?.slice(startIndex, endIndex));
                setIsLoading(false);
                setTotalPages(Math.ceil(response?.data?.length / pageSize));
            }
        })
    }, [trigger]);

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
                                    <DateRangeFilter/>
                                    <LightLive liveLight={liveLight} trigger={trigger} setTrigger={setTrigger}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-20 md:hidden m-20">
                            <LightLive liveLight={liveLight}/>
                            <DateRangeFilter/>
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