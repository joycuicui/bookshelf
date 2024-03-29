const db = require("../connection");

const getReviewsByUserId = async (userId) => {
  try {
    const res = await db.query(
      `
      SELECT reviews.id, reviews.user_review AS review, reviews.rating,
      book_authors.id AS book_author_id,
      books.id AS book_id,
      books.title AS title,
      books.cover_image_medium AS cover_image,
      books.published_year AS first_published,
      authors.name AS author
      FROM reviews
      JOIN book_authors ON reviews.book_author_id = book_authors.id
      JOIN books ON books.id = book_authors.book_id
      JOIN authors ON authors.id = book_authors.author_id
      WHERE reviews.user_id = $1;
      `,
      [userId]
    );
    const reviews = res.rows;
    return reviews;
  } catch (err) {
    console.log(err.message);
  }
};

const updateReview = async (reviewId, rating, review) => {
  try {
    const res = await db.query(
      `
      UPDATE reviews
      SET user_review = $1, rating = $2
      WHERE id = $3
      RETURNING *;
      `,
      [review, rating, reviewId]
    );
    const updatedReview = res.rows[0];
    return updatedReview;
  } catch (err) {
    console.log(err.message);
  }
};

const removeReview = async (reviewId) => {
  try {
    const res = await db.query(
      `
      DELETE FROM reviews
      WHERE id = $1
      RETURNING *;
      `,
      [reviewId]
    );
    return res.rows[0];
  } catch (err) {
    console.log(err.message);
  }
};

const insertNewReview = async (userId, bookAuthorId, rating, review) => {
  try {
    const res = await db.query(
      `
      INSERT INTO reviews (user_id, book_author_id, rating, user_review)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [userId, bookAuthorId, rating, review]
    );
    return res.rows[0];
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getReviewsByUserId,
  updateReview,
  removeReview,
  insertNewReview,
};
