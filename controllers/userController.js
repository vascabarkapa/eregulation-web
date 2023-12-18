const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//@desc Get all users
//@route GET /api/users
//@access private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    const sortedUsers = users.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json(sortedUsers);
});

//@desc Get user by id
//@route GET /api/users/:id
//@access private
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json(user);
});

//@desc Create user
//@route POST /api/users
//@access private
const createUser = asyncHandler(async (req, res) => {
    for (let prop in req.body) {
        if (!req.body[prop]) {
            res.status(400);
            throw new Error(prop + " is mandatory field");
        }
    }

    const email = req.body['email'];
    const userAvailable = await User.findOne({email: email});
    if (userAvailable) {
        res.status(400);
        throw new Error("User is already registered with that email address");
    }

    const password = await bcrypt.hash(req.body['password'], 10);
    req.body['password'] = password;

    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
});

//@desc Update user by id
//@route PUT /api/users/:id
//@access private
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const userAvailable = await User.find({email: req.body['email']});
    if (userAvailable > 1) {
        res.status(400);
        throw new Error("User is already registered with that email address");
    }

    const password = await bcrypt.hash(req.body['password'], 10);
    req.body['password'] = password;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedUser);
});

//@desc Delete user by id
//@route DELETE /api/users/:id
//@access private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
});

module.exports = {getUsers, getUserById, createUser, updateUser, deleteUser};