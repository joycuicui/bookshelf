const express = require("express");
const verifyToken = require("../helpers/verifyUser");
const { sendEmailToUser } = require("../controllers/email-controller");

const router = express.Router();

router.post("/:userId", verifyToken, sendEmailToUser);

module.exports = router;
