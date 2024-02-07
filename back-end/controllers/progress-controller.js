const {
  getProgressByUserId,
} = require("../database/queries/progress-queries.js");

const getProgress = async (req, res, next) => {
  try {
    const progress = await getProgressByUserId(req.params.userId);
    if (!progress) {
      const error = new Error();
      error.message = "No progress found";
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(progress);
  } catch (err) {
    next(err);
  }
};

module.exports = { getProgress };
