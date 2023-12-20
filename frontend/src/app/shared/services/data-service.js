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

function getLatestData() {
    return get(ENDPOINT + "/latest");
}

const DataService = {
    getTemperatureData, getHumidityData, getLightData, getLatestData
}

export default DataService;