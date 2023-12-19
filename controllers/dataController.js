const asyncHandler = require("express-async-handler");
const Data = require("../models/dataModel");

/**
 * @desc Add data from MQTT message
 * @access Public
 */
const addData = asyncHandler(async (body) => {
    try {
        await Data.create(body);
    } catch (error) {
        console.error("Error adding data:", error);
    }
});

/**
 * @desc Get all temperature data
 * @route GET /api/data/temperature
 * @access Private
 */
const getTemperatureData = asyncHandler(async (req, res) => {
    try {
        const temperatureData = await Data.find({ type: "t" });

        res.status(200).json(temperatureData);
    } catch (error) {
        console.error("Error getting temperature data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * @desc Get all humidity data
 * @route GET /api/data/humidity
 * @access Private
 */
const getHumidityData = asyncHandler(async (req, res) => {
    try {
        const humidityData = await Data.find({ type: "h" });

        res.status(200).json(humidityData);
    } catch (error) {
        console.error("Error getting humidity data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/**
 * @desc Get all light data
 * @route GET /api/data/light
 * @access Private
 */
const getLightData = asyncHandler(async (req, res) => {
    try {
        const lightData = await Data.find({ type: "l" });

        res.status(200).json(lightData);
    } catch (error) {
        console.error("Error getting light data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = { addData, getTemperatureData, getHumidityData, getLightData };