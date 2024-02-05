-- Drop and recreate book genres table
DROP TABLE IF EXISTS book_genres CASCADE;

CREATE TABLE book_genres (
  id SERIAL PRIMARY KEY NOT NULL,
  book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  genre_id INTEGER NOT NULL REFERENCES genres(id) ON DELETE CASCADE
);