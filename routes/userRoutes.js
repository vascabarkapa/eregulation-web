const express = require("express");
const router = express.Router();
const {getUsers, getUserById, createUser, updateUser, deleteUser} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getUsers).post(createUser);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;