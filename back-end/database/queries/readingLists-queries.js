const db = require("../connection");

const getAllReadingListsByUserId = async (userId) => {
  try {
    const res = await db.query(
      `
      SELECT book_lists.id AS book_list_id, 
      lists.id AS reading_list_id, 
      users.id, 
      book_authors.id AS book_author_id,
      books.*,
      authors.name AS author_name
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

module.exports = { getAllReadingListsByUserId };
