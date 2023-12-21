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
        const temperatureData = await Data.find({type: "t"}).sort({createdAt: -1});


        res.status(200).json(temperatureData);
    } catch (error) {
        console.error("Error getting temperature data:", error);
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
        const humidityData = await Data.find({type: "h"}).sort({createdAt: -1});

        res.status(200).json(humidityData);
    } catch (error) {
        console.error("Error getting humidity data:", error);
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
        const lightData = await Data.find({type: "l"}).sort({createdAt: -1});

        res.status(200).json(lightData);
    } catch (error) {
        console.error("Error getting light data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

/**
 * @desc Ping the latest data
 * @route GET /api/data/ping
 * @access Private
 */
const pingLatestData = asyncHandler(async (req, res) => {
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
 * @desc Get the latest data
 * @route GET /api/data/latest
 * @access Private
 */
const getLatestData = asyncHandler(async (req, res) => {
    try {
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
        console.error("Error getting the latest data:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

module.exports = {addData, getTemperatureData, getHumidityData, getLightData, pingLatestData, getLatestData};