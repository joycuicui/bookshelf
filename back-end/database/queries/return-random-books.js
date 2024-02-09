const db = require("../connection");

const getRandomBooks = async () => {
  try {
    const res = await db.query(
      `SELECT * FROM books
      INNER JOIN book_authors ON books.id = book_authors.book_id
      INNER JOIN authors ON book_authors.author_id = authors.id
      ORDER BY RANDOM()
      LIMIT 20;`);
    const tenBooks = res.rows;
    console.log("return-ten-books.js!! :", tenBooks);
    return tenBooks;
  } catch (err) {
    console.log("failed in return-ten-books.js", err.message);
  }
};
module.exports = getRandomBooks;