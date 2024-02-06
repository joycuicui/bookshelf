const express = require("express");
const verifyToken = require("../helpers/verifyUser");
const {
  getAllReadingLists,
} = require("../controllers/readingList-controller.js");

const router = express.Router();

router.get("/:userId", verifyToken, getAllReadingLists);

module.exports = router;
