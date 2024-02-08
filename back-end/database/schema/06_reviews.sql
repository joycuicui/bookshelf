-- Drop and recreate reviews table
DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews (
id SERIAL PRIMARY KEY NOT NULL,
user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
book_author_id INTEGER NOT NULL REFERENCES book_authors(id) ON DELETE CASCADE,
rating INTEGER NOT NULL,
user_review TEXT
);
