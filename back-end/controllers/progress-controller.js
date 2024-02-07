const {
  getProgressByUserId,
  updateProgressByBookId,
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

const updateProgress = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { currentPage } = req.body;
    const progress = await updateProgressByBookId(bookId, currentPage);
    if (!progress) {
      const error = new Error();
      error.message = "Progress not updated";
      error.statusCode = 500;
      return next(error);
    }
    res.status(200).json(progress);
  } catch (err) {
    next(err);
  }
};

module.exports = { getProgress, updateProgress };
