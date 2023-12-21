const express = require("express");
const {
    getTemperatureData,
    getHumidityData,
    getLightData,
    getLatestData
} = require("../controllers/dataController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.route("/latest").get(getLatestData);

router.use(validateToken);
router.route("/temperature").get(getTemperatureData);
router.route("/humidity").get(getHumidityData);
router.route("/light").get(getLightData);

module.exports = router;