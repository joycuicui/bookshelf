const db = require("../connection");

const getProgressByUserId = async (userId) => {
  try {
    const res = await db.query(
      `
      SELECT reading_progress.id, reading_progress.current_page, reading_progress.total_pages, 
      book_authors.id AS book_author_id,
      books.id AS book_id,
      books.title AS title,
      books.cover_image_medium AS cover_image,
      authors.name AS author
      FROM reading_progress
      JOIN users ON reading_progress.user_id = users.id
      JOIN book_authors ON reading_progress.book_author_id = book_authors.id
      JOIN books ON books.id = book_authors.book_id
      JOIN authors ON authors.id = book_authors.author_id
      WHERE user_id = $1;
      `,
      [userId]
    );
    const progress = res.rows;
    // console.log(progress);
    return progress;
  } catch (err) {
    console.log(err.message);
  }
};

const updateProgressByBookId = async (bookId, currentPage) => {
  try {
    const bookAuthorQuery = await db.query(
      `
      SELECT id FROM book_authors
      WHERE book_id = $1;
      `,
      [bookId]
    );
    const bookAuthorId = bookAuthorQuery.rows[0].id;
    console.log(bookAuthorId);

    const res = await db.query(
      `
      UPDATE reading_progress
      SET current_page = $1, updated_at = NOW()
      WHERE book_author_id = $2
      RETURNING *;
      `,
      [currentPage, bookAuthorId]
    );
    const progress = res.rows[0];
    return progress;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getProgressByUserId,
  updateProgressByBookId,
};
