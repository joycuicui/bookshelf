const {
  getAllReadingListsByUserId,
  removeBookFromList,
  updateList,
  addBookInLists
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

const moveToAnotherList = async (req, res, next) => {
  const { bookId, listId } = req.body;
  // console.log(bookId, listId);
  try {
    const moved = await updateList(listId, bookId);
    if (!moved) {
      const error = new Error();
      error.message = "Move to another list failed";
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json("Book moved to another list");
  } catch (err) {
    next(err);
  }
};

const addToList = async (req, res, next) => {
  console.log("req.body:", req.body);
  const { bookId, listId, userId } = req.body;

  console.log("listId, bookId, userId", listId, bookId, userId);

  try {
    const added = await addBookInLists(listId, bookId, userId);
    if (!added) {
      const error = new Error();
      error.message = "Adding book to reading list failed";
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json("Book added to reading list");
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllReadingLists, removeFromList, moveToAnotherList,addToList };
