// const db = require('../database/db');


// // add a new book
// exports.addBook = async (req, res) => {
//   try {
//     const bookData = req.body;

//     const query = `
//       INSERT INTO books (title, description, cover_image_small, cover_image_medium, publisher, published_year, isbn, external_id, number_of_pages)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//       RETURNING *;
//     `;
//     const values = [
//       bookData.title,
//       bookData.description,
//       bookData.cover_image_small,
//       bookData.cover_image_medium,
//       bookData.publisher,
//       bookData.published_year,
//       bookData.isbn,
//       bookData.external_id,
//       bookData.number_of_pages
//     ];

//     const result = await db.query(query, values);
//     const newBook = result.rows[0];

//     res.status(201).json({ message: "Book added successfully", book: newBook });
//   } catch (error) {
//     console.error("Error adding book:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };