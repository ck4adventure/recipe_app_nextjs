BEGIN;

-- recipe_categories
CREATE TABLE IF NOT EXISTS recipe_categories (
	id SERIAL PRIMARY KEY,
	recipe_id INTEGER,
  category_id INTEGER,
	FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
	FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

COMMIT;