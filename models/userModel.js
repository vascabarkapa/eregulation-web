const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    username: {
        type: String, required: [true, "Username is required"]
    }, email: {
        type: String, required: [true, "Email is required"], unique: [true, "Email is already taken"]
    }, password: {
        type: String, required: [true, "Password is required"]
    }, first_name: {
        type: String, required: [true, "First Name is required"]
    }, last_name: {
        type: String, required: [true, "Last Name is required"]
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userModel);