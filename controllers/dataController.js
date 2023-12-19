const asyncHandler = require("express-async-handler");
const Data = require("../models/dataModel");

//@desc Add data from MQTT message
//@access public
const addData = asyncHandler(async (body) => {
    try {
        await Data.create(body);
    } catch (error) {
        console.error("Error adding data:", error);
    }
});

//@desc Get all temperature data
//@route GET /api/data/temperature
//@access private
const getTemperatureData = asyncHandler(async (req, res) => {
    const temperatureData = await Data.find({ type: "t" });

    res.status(200).json(temperatureData);
});

//@desc Get all humidity data
//@route GET /api/data/humidity
//@access private
const getHumidityData = asyncHandler(async (req, res) => {
    const humidityData = await Data.find({ type: "h" });

    res.status(200).json(humidityData);
});

//@desc Get all light data
//@route GET /api/data/light
//@access private
const getLightData = asyncHandler(async (req, res) => {
    const lightData = await Data.find({ type: "l" });

    res.status(200).json(lightData);
});


module.exports = {addData, getTemperatureData, getHumidityData, getLightData};