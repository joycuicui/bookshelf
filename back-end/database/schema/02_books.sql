-- Drop and recreate books table
DROP TABLE IF EXISTS books CASCADE;

CREATE TABLE books (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  cover_image TEXT NOT NULL,
  publisher VARCHAR(255) NOT NULL,
  published_date DATE NOT NULL,
  isbn VARCHAR(255) NOT NULL,
  external_id VARCHAR(255) NOT NULL
  );