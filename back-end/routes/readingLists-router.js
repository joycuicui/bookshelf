const express = require("express");
const verifyToken = require("../helpers/verifyUser");
const {
  getAllReadingLists,
  removeFromList,
} = require("../controllers/readingList-controller.js");

const router = express.Router();

router.get("/:userId", verifyToken, getAllReadingLists);
router.delete("/:listId/:bookId", verifyToken, removeFromList);

module.exports = router;
