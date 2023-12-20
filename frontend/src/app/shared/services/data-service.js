import {get, post, put, remove} from "./api-client";

const ENDPOINT = "/data";

function getTemperatureData() {
    return get(ENDPOINT + "/temperature");
}

function getHumidityData() {
    return get(ENDPOINT + "/humidity");
}

function getLightData() {
    return get(ENDPOINT + "/light");
}

const DataService = {
    getTemperatureData, getHumidityData, getLightData
}

export default DataService;