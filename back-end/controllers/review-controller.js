const { getReviewsByUserId } = require("../database/queries/reviews-queries");

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

module.exports = { getAllReviews };
