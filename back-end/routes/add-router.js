//the one were using


// const express = require("express");
// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const bookData = req.body;

//     const newBook = new Book({
//       title: bookData.title,
//       description: bookData.description,
//       cover_image_small: bookData.cover_image_small,
//       cover_image_medium: bookData.cover_image_medium,
//       publisher: bookData.publisher,
//       published_year: bookData.published_year,
//       isbn: bookData.isbn,
//       external_id: bookData.external_id,
//       number_of_pages: bookData.number_of_pages
//     });

//     await newBook.save();

//     console.log('Response:', newBook);

//     res.status(201).json({ message: "Book added successfully", book: newBook });
//   } catch (error) {
//     console.error("Error adding book:", error);

//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const db = require("./db"); // Assuming db.js is in the same directory

// router.post("/", async (req, res) => {
//   const { title, description, cover_image_small, cover_image_medium, publisher, published_year, isbn, external_id, number_of_pages } = req.body;

//   const query = `
//     INSERT INTO books (title, description, cover_image_small, cover_image_medium, publisher, published_year, isbn, external_id, number_of_pages) 
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//     RETURNING *;
//   `;

//   const values = [title, description, cover_image_small, cover_image_medium, publisher, published_year, isbn, external_id, number_of_pages];

//   try {
//     const { rows } = await db.query(query, values);
//     const newBook = rows[0];

//     res.status(201).json({ message: "Book added successfully", book: newBook });
//   } catch (error) {
//     console.error("Error adding book:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;