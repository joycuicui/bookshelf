const {
  getAllReadingListsByUserId,
} = require("../database/queries/readingLists-queries");

const getAllReadingLists = async (req, res, next) => {
  try {
    const readingLists = await getAllReadingListsByUserId(req.params.userId);
    if (!readingLists) {
      const error = new Error();
      error.message = "No reading lists found";
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json(readingLists);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllReadingLists };
