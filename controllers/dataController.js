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
 * @desc Get current temperature data
 * @route GET /api/data/temperature/current
 * @access Private
 */
const getCurrentTemperatureData = asyncHandler(async (req, res) => {
    try {
        const currentTemperatureData = await Data.findOne({type: 't'}).sort({createdAt: -1}).limit(1);

        res.status(200).json(currentTemperatureData);
    } catch (error) {
        console.error("Error getting current temperature data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

/**
 * @desc Get all temperature data
 * @route GET /api/data/temperature
 * @access Private
 */
const getTemperatureData = asyncHandler(async (req, res) => {
    try {
        let query = {type: "t"};

        if (req.query.startDate !== 'null') {
            query.createdAt = {$gte: new Date(req.query.startDate + 'T00:00:00.000Z').toISOString()};
        }

        if (req.query.endDate !== 'null') {
            query.createdAt = {...query.createdAt, $lte: new Date(req.query.endDate + 'T23:59:59.999Z').toISOString()};
        }

        const temperatureData = await Data.find(query).sort({createdAt: -1});

        res.status(200).json(temperatureData);
    } catch (error) {
        console.error("Error getting temperature data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

/**
 * @desc Get current humidity data
 * @route GET /api/data/humidity/current
 * @access Private
 */
const getCurrentHumidityData = asyncHandler(async (req, res) => {
    try {
        const currentHumidityData = await Data.findOne({type: 'h'}).sort({createdAt: -1}).limit(1);

        res.status(200).json(currentHumidityData);
    } catch (error) {
        console.error("Error getting current humidity data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

/**
 * @desc Get all humidity data
 * @route GET /api/data/humidity
 * @access Private
 */
const getHumidityData = asyncHandler(async (req, res) => {
    try {
        let query = {type: "h"};

        if (req.query.startDate !== 'null') {
            query.createdAt = {$gte: new Date(req.query.startDate + 'T00:00:00.000Z').toISOString()};
        }

        if (req.query.endDate !== 'null') {
            query.createdAt = {...query.createdAt, $lte: new Date(req.query.endDate + 'T23:59:59.999Z').toISOString()};
        }

        const humidityData = await Data.find(query).sort({createdAt: -1});

        res.status(200).json(humidityData);
    } catch (error) {
        console.error("Error getting humidity data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

/**
 * @desc Get current light data
 * @route GET /api/data/light/current
 * @access Private
 */
const getCurrentLightData = asyncHandler(async (req, res) => {
    try {
        const currentLightData = await Data.findOne({type: 'l'}).sort({createdAt: -1}).limit(1);

        res.status(200).json(currentLightData);
    } catch (error) {
        console.error("Error getting current light data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

/**
 * @desc Get all light data
 * @route GET /api/data/light
 * @access Private
 */
const getLightData = asyncHandler(async (req, res) => {
    try {
        let query = {type: "l"};

        if (req.query.startDate !== 'null') {
            query.createdAt = {$gte: new Date(req.query.startDate + 'T00:00:00.000Z').toISOString()};
        }

        if (req.query.endDate !== 'null') {
            query.createdAt = {...query.createdAt, $lte: new Date(req.query.endDate + 'T23:59:59.999Z').toISOString()};
        }

        const lightData = await Data.find(query).sort({createdAt: -1});

        res.status(200).json(lightData);
    } catch (error) {
        console.error("Error getting light data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

/**
 * @desc Get the latest data
 * @route GET /api/data/latest
 * @access Private
 */
const getLatestData = asyncHandler(async (req, res) => {
    try {
        const MqttHandler = require("../middleware/mqttHandler");
        const mqttHandlerInstance = MqttHandler.getInstance();

        mqttHandlerInstance.sendMessage("eregulation/arduino", "ping");

        // testirati i smanjiti na nekih 0,25sec
        await new Promise(resolve => setTimeout(resolve, 5000));

        const latestT = await Data.findOne({type: 't'}).sort({createdAt: -1}).limit(1);
        const latestH = await Data.findOne({type: 'h'}).sort({createdAt: -1}).limit(1);
        const latestL = await Data.findOne({type: 'l'}).sort({createdAt: -1}).limit(1);

        const latestData = {
            t: latestT,
            h: latestH,
            l: latestL,
        };

        res.status(200).json(latestData);
    } catch (error) {
        console.error("Error sending message to MQTT broker:", error);
    }
});

/**
 * @desc Get previous temperature data for chart
 * @route GET /api/data/temperature/history
 * @access Private
 */
const getPreviousTemperatureData = asyncHandler(async (req, res) => {
    try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        let query = {type: "t"};
        query.createdAt = {$gte: yesterday.toISOString()};

        const data = await Data.find(query).sort({createdAt: 1});

        const formattedData = data.map(item => ({
            x: item.createdAt.toISOString(),
            y: item.value
        }));

        res.json(formattedData);
    } catch (error) {
        console.error("Error getting history temperature data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

module.exports = {
    addData,
    getCurrentTemperatureData,
    getTemperatureData,
    getCurrentHumidityData,
    getHumidityData,
    getCurrentLightData,
    getLightData,
    getLatestData,
    getPreviousTemperatureData
};