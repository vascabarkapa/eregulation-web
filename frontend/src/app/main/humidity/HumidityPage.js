import HumidityHeader from "./HumidityHeader";
import HumidityLive from "./HumidityLive";
import HumidityTable from "./HumidityTable";

const HumidityPage = () => {
    return (
        <div className="container">
            <HumidityHeader />
            <div className="container flex flex-col md:flex-row md:justify-between">
                <div className="w-full md:w-1/2">
                    <HumidityTable />
                </div>
                <div className="w-full md:w-1/2">
                    <HumidityLive />
                </div>
            </div>
        </div>
    );
}

export default HumidityPage;
