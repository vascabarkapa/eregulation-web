const express = require("express");
const {
    getCurrentTemperatureData,
    getTemperatureData,
    getCurrentHumidityData,
    getHumidityData,
    getCurrentLightData,
    getLightData,
    getLatestData,
    getPreviousTemperatureData,
    getPreviousHumidityData
} = require("../controllers/dataController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.route("/latest").get(getLatestData);

router.use(validateToken);
router.route("/temperature/current").get(getCurrentTemperatureData);
router.route("/temperature").get(getTemperatureData);
router.route("/temperature/history").get(getPreviousTemperatureData);
router.route("/humidity/current").get(getCurrentHumidityData);
router.route("/humidity").get(getHumidityData);
router.route("/humidity/history").get(getPreviousHumidityData);
router.route("/light/current").get(getCurrentLightData);
router.route("/light").get(getLightData);

module.exports = router;