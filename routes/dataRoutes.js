const express = require("express");
const {addData} = require("../controllers/dataController");
const router = express.Router();

router.route("/").post(addData);

module.exports = router;