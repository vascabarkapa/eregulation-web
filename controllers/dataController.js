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

module.exports = {addData};