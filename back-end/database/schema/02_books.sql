-- Drop and recreate books table
DROP TABLE IF EXISTS books CASCADE;

CREATE TABLE books (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  --description VARCHAR(255) NOT NULL,
  description TEXT,
  cover_image_small TEXT,
  cover_image_medium TEXT,
  publisher VARCHAR(255),
  --published_date DATE,
  published_year VARCHAR(255),
  isbn VARCHAR(255),
  external_id VARCHAR(255),
  --cover_image TEXT DEFAULT 'default-cover-image.png'
  number_of_pages INTEGER NOT NULL
  );