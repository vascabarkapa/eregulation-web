const mongoose = require("mongoose");

const dataModel = new mongoose.Schema({
    value: {
        type: Number, required: true,
    }, type: {
        type: String, enum: ['t', 'h', 'l'], required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model("Data", dataModel);