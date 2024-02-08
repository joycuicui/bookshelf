const {
  getReviewsByUserId,
  updateReview,
} = require("../database/queries/reviews-queries");

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await getReviewsByUserId(req.params.userId);
    if (!reviews) {
      const error = new Error();
      error.message = "No reviews found";
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

const editReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { review } = req.body;
    const updatedReview = await updateReview(reviewId, review);
    if (!updatedReview) {
      const error = new Error();
      error.message = "Review not found";
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(updatedReview);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllReviews, editReview };
