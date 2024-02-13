const { insertNewBook } = require("../database/queries/book-queries");

const addNewBook = async (req, res, next) => {
  const { userId } = req.params;
  const {
    title,
    author,
    totalPages,
    description,
    publisher,
    publishedYear,
    bookCover,
  } = req.body;
  try {
    const book = await insertNewBook({
      title,
      author,
      totalPages,
      description,
      publisher,
      publishedYear,
      bookCover,
      userId,
    });
    console.log(book);
    res.status(201).json({ success: true, book });
  } catch (err) {
    next(err);
  }
};

module.exports = { addNewBook };
