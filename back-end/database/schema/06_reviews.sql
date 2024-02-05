-- Drop and recreate reviews table
DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews (
id SERIAL PRIMARY KEY NOT NULL,
user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
rating INTEGER NOT NULL,
user_review VARCHAR(255)
);
