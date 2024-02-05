-- Drop and recreate authors table
DROP TABLE IF EXISTS authors CASCADE;

CREATE TABLE authors (
  id SERIAL PRIMARY KEY NOT NULL,
  name  VARCHAR(255) NOT NULL
  );