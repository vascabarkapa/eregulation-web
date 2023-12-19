const express = require("express");
const {
    getTemperatureData,
    getHumidityData,
    getLightData
} = require("../controllers/dataController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken);
router.route("/temperature").get(getTemperatureData);
router.route("/humidity").get(getHumidityData);
router.route("/light").get(getLightData);

module.exports = router;