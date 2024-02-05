-- Drop and recreate book authors table
DROP TABLE IF EXISTS book_authors CASCADE;

CREATE TABLE book_authors (
  id SERIAL PRIMARY KEY NOT NULL,
  book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  author_id INTEGER NOT NULL REFERENCES authors(id) ON DELETE CASCADE
);