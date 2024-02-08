const express = require("express");
const verifyToken = require("../helpers/verifyUser");
const {
  getAllReadingLists,
  removeFromList,
  moveToAnotherList,
} = require("../controllers/readingList-controller.js");

const router = express.Router();

router.get("/:userId", verifyToken, getAllReadingLists);
router.delete("/:listId/:bookId", verifyToken, removeFromList);
router.patch("/:userId", verifyToken, moveToAnotherList);

module.exports = router;
