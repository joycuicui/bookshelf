const db = require("../connection");

const getBookById = async (id,userId) => {
  try {
    console.log ("currentUser userId", userId);

    const bookAuthorQuery = await db.query(
     `
      SELECT id FROM book_authors
      WHERE book_id = $1;
      `,[id]
    );
    const bookAuthorId = bookAuthorQuery.rows[0].id;
    console.log ("bookAuthorId", bookAuthorId);

    const bookDetailsAndAuthor = await db.query(
      `SELECT
        books.title,
        books.id AS book_id,
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
        books.title, books.id;`,
      [id]
    );
    console.log("bookDetailsAndAuthor", bookDetailsAndAuthor.rows);

    let listDetails;
    if (userId) {
      try {
        listDetails = await db.query(
          `SELECT list_id
           FROM book_lists
           WHERE user_id = $1
           AND book_author_id = $2;`,
           [userId,bookAuthorId]
        );

        if (listDetails.rows.length === 0) {
          listDetails = { rows: [{ list_id: null }] };
        }
      } catch (error) {
        console.error('Error fetching list details:', error);
        listDetails = { rows: [{ list_id: null }] };
      }
    } else {
      listDetails = { rows: [{ list_id: null }] };
    }

    let reviewDetails;
    if (userId) {
      try {
        reviewDetails = await db.query(
          `SELECT rating
           FROM reviews
           WHERE user_id = $1
           AND book_author_id = $2`,
          [userId,bookAuthorId]
        );

        if (reviewDetails.rows.length === 0) {
          reviewDetails = { rows: [{ rating: null }] };
        }

      } catch (error) {
        console.error('Error fetching review details:', error);
        reviewDetails = { rows: [{ rating: null }] };
      }
    } else {
      reviewDetails = { rows: [{ rating: null }] };
    }


  //  const res = await db.query(
  //    `
  //    SELECT 
  //    books.title,
  //    books.id AS book_id,
  //    books.description,
  //    books.cover_image_medium,
  //    books.publisher,
  //    books.published_year,
  //    books.isbn,
  //    books.number_of_pages,
  //    book_lists.list_id,
  //    reviews.rating,
  //    STRING_AGG(DISTINCT authors.name, ', ') AS author_names,
  //    STRING_AGG(DISTINCT genres.name, ', ') AS genre_names
  //    FROM book_authors 
  //    JOIN books ON books.id = book_authors.book_id
  //    JOIN authors ON book_authors.author_id = authors.id
  //    LEFT JOIN book_lists ON book_authors.id = book_lists.book_author_id
  //    LEFT JOIN reviews ON book_authors.id = reviews.book_author_id
  //    JOIN book_genres ON  books.id = book_genres.book_id
  //    JOIN genres ON book_genres.genre_id = genres.id
  //    WHERE book_authors.id = $1
  //    GROUP BY books.title, books.id, book_lists.list_id, reviews.rating;`,
  //    [bookAuthorId]
  //  );
  const bookDetails = {
    bookDetailsAndAuthor: bookDetailsAndAuthor.rows,
    listDetails: listDetails.rows,
    reviewDetails : reviewDetails.rows
  };
    //console.log("Book details query:", bookDetails);
    return bookDetails;


  } catch (err) {
    console.log("failed in Book details :", err.message);
  }
};

module.exports = getBookById;
