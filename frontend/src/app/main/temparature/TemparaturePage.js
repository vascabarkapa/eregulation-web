import TemparatureHeader from "./TemparatureHeader";
import TemparatureLive from "./TemparatureLive";
import TemparatureTable from "./TemparatureTable";

const TemparaturePage = () => {
    return (
        <div className="container">
            <TemparatureHeader />
            <div className="container flex flex-col md:flex-row md:justify-between">
                <div className="w-full md:w-1/2">
                    <TemparatureTable />
                </div>
                <div className="w-full md:w-1/2">
                    <TemparatureLive />
                </div>
            </div>
        </div>
    );
}

export default TemparaturePage;
