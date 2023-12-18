const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Login user
//@route POST /api/auth/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const email = req.body['email'];
    const user = await User.findOne({email: email});

    if (user && (await bcrypt.compare(req.body['password'], user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name
            }
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"});

        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error("Credentials are not valid");
    }
});

//@desc Get current user
//@route GET /api/auth/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {loginUser, currentUser}