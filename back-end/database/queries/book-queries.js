// const db = require("../connection");



// //add.book to database 
// exports.addBook = async (bookData) => {
//   const { title, description, cover_image_small, cover_image_medium, publisher, published_year, isbn, external_id, number_of_pages } = bookData;

//   const query = `
//     INSERT INTO books (title, description, cover_image_small, cover_image_medium, publisher, published_year, isbn, external_id, number_of_pages) 
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//     RETURNING *;
//   `;

//   const values = [title, description, cover_image_small, cover_image_medium, publisher, published_year, isbn, external_id, number_of_pages];

//   try {
//     const { rows } = await db.query(query, values);
//     const newBook = rows[0];
//     return newBook;
//   } catch (error) {
//     console.error("Error adding book:", error);
//     throw error; 
//   }
// };