import {get, post, put, remove} from "./api-client";

const ENDPOINT = "/data";

function getTemperatureData(startDate = null, endDate = null) {
    return get(ENDPOINT + "/temperature", "startDate=" + startDate + "&endDate=" + endDate);
}

function getHumidityData(startDate = null, endDate = null) {
    return get(ENDPOINT + "/humidity", "startDate=" + startDate + "&endDate=" + endDate);
}

function getLightData(startDate = null, endDate = null) {
    return get(ENDPOINT + "/light", "startDate=" + startDate + "&endDate=" + endDate);
}

function getLatestData() {
    return get(ENDPOINT + "/latest");
}

const DataService = {
    getTemperatureData, getHumidityData, getLightData, getLatestData
}

export default DataService;