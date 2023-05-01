import DateRangeFilter from "src/app/shared/components/DateRangeFilter";
import HumidityHeader from "./HumidityHeader";
import HumidityLive from "./HumidityLive";
import HumidityTable from "./HumidityTable";

const HumidityPage = () => {
    return (
        <div className="container">
            <HumidityHeader />
            <div className="hidden md:flex flex-col md:flex-row md:justify-between gap-20">
                <div className="w-full md:w-1/2">
                    <HumidityTable />
                </div>
                <div className="w-full md:w-1/2">
                    <div className="flex flex-col gap-20">
                        <HumidityLive />
                        <DateRangeFilter />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-20 md:hidden m-20">
                <HumidityLive />
                <DateRangeFilter />
                <HumidityTable />
            </div>
        </div>
    );
};

export default HumidityPage;