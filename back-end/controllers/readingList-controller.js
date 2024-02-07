const {
  getAllReadingListsByUserId,
  removeBookFromList,
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

const removeFromList = async (req, res, next) => {
  const { listId, bookId } = req.params;

  try {
    const removed = await removeBookFromList(listId, bookId);
    if (!removed) {
      const error = new Error();
      error.message = "Book not found in list";
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json("Book removed from list");
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllReadingLists, removeFromList };
