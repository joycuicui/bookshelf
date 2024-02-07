-- Drop and recreate reading progress table
DROP TABLE IF EXISTS reading_progress CASCADE;

CREATE TABLE reading_progress (
  id SERIAL PRIMARY KEY NOT NULL,
  -- name  VARCHAR(255) NOT NULL,
  user_id INTEGER NOT NULL REFERENCES book_lists(id) ON DELETE CASCADE,
  book_author_id INTEGER NOT NULL REFERENCES book_authors(id) ON DELETE CASCADE,
  current_page INTEGER NOT NULL,
  total_pages INTEGER NOT NULL,
  updated_at TIMESTAMP NOT NULL
  -- delta INTEGER NOT NULL
  );