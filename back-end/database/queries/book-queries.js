const db = require("../connection");

const insertNewBook = async ({
  title,
  author,
  totalPages,
  description,
  publisher,
  publishedYear,
  bookCover,
  userId,
}) => {
  try {
    const bookQuery = await db.query(
      `
      INSERT INTO books (title, description, cover_image_medium, publisher, published_year, number_of_pages)
      VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`,
      [title, description, bookCover, publisher, publishedYear, totalPages]
    );
    const bookId = bookQuery.rows[0].id;
    const authorQuery = await db.query(
      `
      INSERT INTO authors (name)
      VALUES ($1) RETURNING *;
      `,
      [author]
    );
    const authorId = authorQuery.rows[0].id;
    const bookAuthorQuery = await db.query(
      `
      INSERT INTO book_authors (book_id, author_id)
      VALUES ($1,$2) RETURNING *;
      `,
      [bookId, authorId]
    );
    const bookAuthorId = bookAuthorQuery.rows[0].id;
    const bookListQuery = await db.query(
      `
      INSERT INTO book_lists (book_author_id, list_id, user_id)
      VALUES ($1, 2, $2) RETURNING *;
      `,
      [bookAuthorId, userId]
    );
    const bookListId = bookListQuery.rows[0].id;
    const res = await db.query(
      `
      INSERT INTO reading_progress (book_list_id, user_id, book_author_id, total_pages, updated_at)
      VALUES ($1, $2, $3, $4, NOW()) RETURNING *;
      `,
      [bookListId, userId, bookAuthorId, totalPages]
    );
    return res.rows[0];
  } catch (err) {
    return err;
  }
};

module.exports = { insertNewBook };
