const express = require("express");
const {loginUser, currentUser} = require("../controllers/authController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.route("/login").post(loginUser);
router.route("/current").get(validateToken, currentUser);

module.exports = router;