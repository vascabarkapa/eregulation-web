import {get, post, put, remove} from "./api-client";

const ENDPOINT = "/data";

function getCurrentTemperatureData() {
    return get(ENDPOINT + "/temperature/current");
}

function getTemperatureData(startDate = null, endDate = null) {
    return get(ENDPOINT + "/temperature", "startDate=" + startDate + "&endDate=" + endDate);
}

function getTemperatureHistoryData() {
    return get(ENDPOINT + "/temperature/history");
}

function getCurrentHumidityData() {
    return get(ENDPOINT + "/humidity/current");
}

function getHumidityData(startDate = null, endDate = null) {
    return get(ENDPOINT + "/humidity", "startDate=" + startDate + "&endDate=" + endDate);
}

function getCurrentLightData() {
    return get(ENDPOINT + "/light/current");
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
    getLatestData,
    getTemperatureHistoryData
}

export default DataService;