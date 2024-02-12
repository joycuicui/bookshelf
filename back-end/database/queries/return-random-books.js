const db = require("../connection");

const getRandomBooks = async () => {
  try {
    const res = await db.query(
      `SELECT books.id,
      books.title,
      books.cover_image_medium,
      authors.name AS author_name
      FROM books
      INNER JOIN book_authors ON books.id = book_authors.book_id
      INNER JOIN authors ON book_authors.author_id = authors.id
      WHERE book_authors.author_id = (SELECT min(a1.author_id) 
                                      FROM book_authors a1 
                                      WHERE a1.book_id = book_authors.book_id)
      ORDER BY RANDOM()
      LIMIT 20;`
    );
    const randomBooks = res.rows;
    // console.log("return-ten-books.js!! :", randomBooks);
    return randomBooks;
  } catch (err) {
    console.log("failed in return-ten-books.js", err.message);
  }
};
module.exports = getRandomBooks;
