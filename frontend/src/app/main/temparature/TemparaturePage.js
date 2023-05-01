import DateRangeFilter from "src/app/shared/components/DateRangeFilter";
import TemparatureHeader from "./TemparatureHeader";
import TemparatureLive from "./TemparatureLive";
import TemparatureTable from "./TemparatureTable";

const TemparaturePage = () => {
    return (
        <div className="container">
            <TemparatureHeader />
            <div className="hidden md:flex flex-col md:flex-row md:justify-between gap-20 mx-20">
                <div className="w-full md:w-1/2">
                    <TemparatureTable />
                </div>
                <div className="w-full md:w-1/2">
                    <div className="flex flex-col gap-20">
                        <DateRangeFilter />
                        <TemparatureLive />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-20 md:hidden m-20">
                <TemparatureLive />
                <DateRangeFilter />
                <TemparatureTable />
            </div>
        </div>
    );
}

export default TemparaturePage;
