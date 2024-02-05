-- Drop and recreate lists table
DROP TABLE IF EXISTS lists CASCADE;

CREATE TABLE lists (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
  );