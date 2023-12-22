import {get, post, put, remove} from "./api-client";

const ENDPOINT = "/data";

function getCurrentTemperatureData() {
    return get(ENDPOINT + "/temperature");
}

function getTemperatureData(startDate = null, endDate = null) {
    return get(ENDPOINT + "/temperature", "startDate=" + startDate + "&endDate=" + endDate);
}

function getCurrentHumidityData() {
    return get(ENDPOINT + "/humidity");
}

function getHumidityData(startDate = null, endDate = null) {
    return get(ENDPOINT + "/humidity", "startDate=" + startDate + "&endDate=" + endDate);
}

function getCurrentLightData() {
    return get(ENDPOINT + "/light");
}

function getLightData(startDate = null, endDate = null) {
    return get(ENDPOINT + "/light", "startDate=" + startDate + "&endDate=" + endDate);
}

function getLatestData() {
    return get(ENDPOINT + "/latest");
}

const DataService = {
    getCurrentTemperatureData,
    getTemperatureData,
    getCurrentHumidityData,
    getHumidityData,
    getCurrentLightData,
    getLightData,
    getLatestData
}

export default DataService;