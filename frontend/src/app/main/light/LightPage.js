import DateRangeFilter from "src/app/shared/components/DateRangeFilter";
import LightHeader from "./components/LightHeader";
import LightLive from "./components/LightLive";
import LightTable from "./components/LightTable";

const LightPage = () => {
    return (
        <div className="container">
            <LightHeader />
            <div className="hidden md:flex flex-col md:flex-row md:justify-between gap-20 mx-20 mb-20">
                <div className="w-full md:w-1/2">
                    <LightTable />
                </div>
                <div className="w-full md:w-1/2">
                    <div className="flex flex-col gap-20">
                        <DateRangeFilter />
                        <LightLive />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-20 md:hidden m-20">
                <LightLive />
                <DateRangeFilter />
                <LightTable />
            </div>
        </div>
    );
};

export default LightPage;