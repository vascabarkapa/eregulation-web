const asyncHandler = require("express-async-handler");
const Data = require("../models/dataModel");

//@desc Add data
//@route POST /api/data
//@access public
const addData = asyncHandler(async (req, res) => {
    try {
        const data = req.body;

        for (let i = 0; i < data.length; i++) {
            const {type, value} = data[i];
            if (!type || !value) {
                res.status(400).json({success: false, message: "Type and value are mandatory fields"});
                return;
            }
        }

        const newData = await Data.create(req.body);
        res.status(201).json(newData);
    } catch (error) {
        console.error("Error adding data:", error);
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
});

module.exports = {addData};