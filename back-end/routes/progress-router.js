const express = require("express");

const verifyToken = require("../helpers/verifyUser");
const { getProgress } = require("../controllers/progress-controller.js");

const router = express.Router();

router.get("/:userId", verifyToken, getProgress);

module.exports = router;
