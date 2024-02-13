const db = require("../connection");

const getBookById = async (id) => {
  try {
    const res = await db.query(
      `SELECT 
      books.title,
      books.id AS book_id,
      books.title,
      books.description,
      books.cover_image_medium,
      books.publisher,
      books.published_year,
      books.isbn,
      books.number_of_pages,
      STRING_AGG(DISTINCT authors.name, ', ') AS author_names,
      STRING_AGG(DISTINCT genres.name, ', ') AS genre_names
  FROM 
      books 
  INNER JOIN 
      book_authors ON books.id = book_authors.book_id
  INNER JOIN 
      authors ON book_authors.author_id = authors.id
  INNER JOIN 
      book_genres ON  books.id = book_genres.book_id
  INNER JOIN 
      genres ON book_genres.genre_id = genres.id
  WHERE 
      books.id = $1
  GROUP BY 
      books.title, books.id;`,[id]
    );
    const bookDetails = res.rows;
  console.log("Book details query:", bookDetails);
    return bookDetails;
  } catch (err) {
    console.log("failed in Book details :", err.message);
  }
};

module.exports = getBookById;