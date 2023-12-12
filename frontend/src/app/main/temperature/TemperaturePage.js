import DateRangeFilter from "src/app/shared/components/DateRangeFilter";
import TemperatureHeader from "./components/TemperatureHeader";
import TemperatureLive from "./components/TemperatureLive";
import TemperatureTable from "./components/TemperatureTable";
import TemperatureAverageChart from "./components/TemperatureAverageChart";

const TemperaturePage = () => {
    return (
        <div className="container">
            <TemperatureHeader />
            <div className="hidden md:flex flex-col md:flex-row md:justify-between gap-20 mx-20 mb-20">
                <div className="w-full md:w-1/2">
                    <TemperatureTable />
                </div>
                <div className="w-full md:w-1/2">
                    <div className="flex flex-col gap-20">
                        <DateRangeFilter />
                        <TemperatureLive />
                    </div>
                </div>
            </div>
            <div className="hidden md:flex flex-col md:flex-row md:justify-between gap-20 mx-20 mb-20">
                <div className="w-full">
                    <TemperatureAverageChart />
                </div>
            </div>

            <div className="flex flex-col gap-20 md:hidden m-20">
                <TemperatureLive />
                <DateRangeFilter />
                <TemperatureTable />
                <TemperatureAverageChart />
            </div>
        </div>
    );
}

export default TemperaturePage;
