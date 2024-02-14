const express = require("express");
const getRandomBooks = require("../database/queries/return-random-books.js");
const verifyToken = require("../helpers/verifyUser");
const { addNewBook } = require("../controllers/book-controller");
const getBookById = require("../database/queries/getBookById.js");

const router = express.Router();

router.post("/:userId", verifyToken, addNewBook);

router.get("/all", async (req, res) => {
  try {
    const books = await getRandomBooks();
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //console.log("book router - ID : ", id);

    const book = await getBookById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book); 
    //console.log("book router - book details : ", book)

  } catch (err) {
    console.error("Error fetching book details:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
