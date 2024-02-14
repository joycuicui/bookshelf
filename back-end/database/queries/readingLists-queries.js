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
      books.published_year AS first_published,
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

const updateList = async (listId, bookId) => {
  try {
    const bookAuthorQuery = await db.query(
      `
    SELECT id FROM book_authors
    WHERE book_id = $1;
    `,
      [bookId]
    );
    const bookAuthorId = bookAuthorQuery.rows[0].id;
    const res = await db.query(
      `
    UPDATE book_lists
    SET list_id = $1
    WHERE book_author_id = $2
    RETURNING *;
    `,
      [listId, bookAuthorId]
    );

    // check if the book is already in the reading progress table
    const progressQuery = await db.query(
      `
      SELECT id FROM reading_progress
      WHERE book_author_id = $1;
      `,
      [bookAuthorId]
    );

    // if it is not in reading progress, insert it into the table
    if (progressQuery.rows.length === 0) {
      const bookListQuery = await db.query(
        `
        SELECT id, user_id
        FROM book_lists
        WHERE book_author_id = $1;
        `,
        [bookAuthorId]
      );
      const bookListId = bookListQuery.rows[0].id;
      const userId = bookListQuery.rows[0].user_id;
      const totalPagesQuery = await db.query(
        `
        SELECT number_of_pages
        FROM books
        WHERE id = $1
        `,
        [bookId]
      );

      const totalPages = totalPagesQuery.rows[0].number_of_pages;
      await db.query(
        `
        INSERT INTO reading_progress (book_list_id, user_id, book_author_id, current_page, total_pages, updated_at)
        VALUES ($1, $2, $3, 0, $4, NOW());
        `,
        [bookListId, userId, bookAuthorId, totalPages]
      );
    }

    // if moving the book to READ list, make the reading progress to be 100%
    if (listId === 3) {
      await db.query(
        `
        UPDATE reading_progress
        SET current_page = total_pages, updated_at = NOW() 
        WHERE book_author_id = $1;`,
        [bookAuthorId]
      );
    }
    console.log(res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.log(err.message);
  }
};

const addBookInLists = async (listId, bookId, userId) => {
  //console.log("addBookInLists listId, bookId, userId", listId, bookId, userId);
  try {
    const bookAuthorQuery = await db.query(
      `
      SELECT id FROM book_authors
      WHERE book_id = $1;
      `,
      [bookId]
    );
    const bookAuthorId = bookAuthorQuery.rows[0].id;
    //console.log(bookAuthorId);
    //const listId = 1;
    const res = await db.query(
      `
      INSERT INTO book_lists (book_author_id, list_id, user_id)
      VALUES
      ($1, $2, $3) RETURNING *;
      `,
      [bookAuthorId, listId, userId]
    );
    //console.log(res);
    //console.log(res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.log(err.message);
    // return false;
  }
};
module.exports = { getAllReadingListsByUserId, removeBookFromList, updateList, addBookInLists };
