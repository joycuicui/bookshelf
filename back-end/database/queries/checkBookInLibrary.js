const db = require("../connection");

const checkBookInLibrary = async (id,userId) => {
  try {
    const findBookAuthor = await db.query(
      `SELECT author_id
      FROM  book_authors
      WHERE book_authors.book_id = $1;`
      ,[id]
    );
    //console.log("Book Query findBookAuthor" , findBookAuthor);
    const bookAuthor = findBookAuthor.rows[0].author_id;
    //console.log("Book Query bookAuthor" , bookAuthor);

    const res = await db.query(
      `SELECT STRING_AGG(lists.name, ', ') AS list_name
      FROM book_lists
      INNER JOIN lists ON book_lists.list_id = lists.id
      WHERE book_author_id = $1
      AND user_id = $2;`, [bookAuthor,userId]);

      const bookList = res.rows;
      //console.log("Book list query:", bookList);
    return bookList;
  } catch (err) {
    console.log("failed in Book details :", err.message);
  }
};

module.exports = checkBookInLibrary;