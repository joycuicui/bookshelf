const express = require("express");

const verifyToken = require("../helpers/verifyUser");
const {
  getProgress,
  updateProgress,
} = require("../controllers/progress-controller.js");

const router = express.Router();

router.get("/:userId", verifyToken, getProgress);
router.patch("/:bookId", verifyToken, updateProgress);

module.exports = router;
