const express = require("express");

const router = express.Router();

const getRandomBooks = require("../database/queries/return-random-books.js")

router.get("/all", async (req, res) => {
  try {
    const books = await getRandomBooks(); // Fetching books from the database
    res.json(books); // Send the fetched books as a JSON response
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;