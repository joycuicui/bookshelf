const db = require("../connection");

const getAllReadingListsByUserId = async (userId) => {
  try {
    const res = await db.query(
      `
      SELECT book_lists.id AS book_list_id, 
      lists.id AS reading_list_id, 
      users.id, 
      book_authors.id AS book_author_id,
      books.id AS book_id,
      books.title AS title,
      books.cover_image_medium AS cover_image,
      authors.name AS author
      FROM book_lists  
      JOIN lists ON book_lists.list_id = lists.id
      JOIN users ON book_lists.user_id = users.id
      JOIN book_authors ON book_lists.book_author_id = book_authors.id
      JOIN books ON books.id = book_authors.book_id
      JOIN authors ON authors.id = book_authors.author_id
      WHERE user_id = $1;
`,
      [userId]
    );
    const readingLists = res.rows;
    return readingLists;
  } catch (err) {
    console.log(err.message);
  }
};

const removeBookFromList = async (listId, bookId) => {
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
      DELETE FROM book_lists
      WHERE book_author_id = $1 AND list_id = $2
      RETURNING *;
      `,
      [bookAuthorId, listId]
    );
    // console.log(res);
    // console.log(res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.log(err.message);
    // return false;
  }
};

module.exports = { getAllReadingListsByUserId, removeBookFromList };
