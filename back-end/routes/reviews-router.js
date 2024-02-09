const express = require("express");

const verifyToken = require("../helpers/verifyUser");
const {
  getAllReviews,
  editReview,
  deleteReview,
  addReview,
} = require("../controllers/review-controller");

const router = express.Router();

router.get("/:userId", verifyToken, getAllReviews);
router.patch("/:reviewId", verifyToken, editReview);
router.delete("/:reviewId", verifyToken, deleteReview);
router.post("/:userId", verifyToken, addReview);

module.exports = router;
