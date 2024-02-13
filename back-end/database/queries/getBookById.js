const db = require("../connection");

const getBookById = async (id) => {
  try {
    const bookAuthorQuery = await db.query(
      `
      SELECT id FROM book_authors
      WHERE book_id = $1;
      `,
      [id]
    );
    const bookAuthorId = bookAuthorQuery.rows[0].id;

    const res = await db.query(
      `
      SELECT 
      books.title,
      books.id AS book_id,
      books.description,
      books.cover_image_medium,
      books.publisher,
      books.published_year,
      books.isbn,
      books.number_of_pages,
      book_lists.list_id,
      reviews.rating,
      STRING_AGG(DISTINCT authors.name, ', ') AS author_names,
      STRING_AGG(DISTINCT genres.name, ', ') AS genre_names
      FROM book_authors 
      JOIN books ON books.id = book_authors.book_id
      JOIN authors ON book_authors.author_id = authors.id
      LEFT JOIN book_lists ON book_authors.id = book_lists.book_author_id
      LEFT JOIN reviews ON book_authors.id = reviews.book_author_id
      JOIN book_genres ON  books.id = book_genres.book_id
      JOIN genres ON book_genres.genre_id = genres.id
      WHERE book_authors.id = $1
      GROUP BY books.title, books.id, book_lists.list_id, reviews.rating;`,
      [bookAuthorId]
    );
    const bookDetails = res.rows;
    // console.log("Book details query:", bookDetails);
    return bookDetails;
  } catch (err) {
    console.log("failed in Book details :", err.message);
  }
};

module.exports = getBookById;
