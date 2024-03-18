BEGIN;
-- do we keep the NOT EXISTS, or leave it out?
-- so that it errors if all the tables aren't dropped
--categories
CREATE TABLE IF NOT EXISTS categories (
	id SERIAL PRIMARY KEY,
	name VARCHAR(40) NOT NULL
);

--recipes
CREATE TABLE IF NOT EXISTS recipes (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL
);

-- recipe_categories
CREATE TABLE IF NOT EXISTS recipe_categories (
	id SERIAL PRIMARY KEY,
	recipe_id INTEGER,
  category_id INTEGER,
	FOREIGN KEY (recipe_id) REFERENCES recipes(id),
	FOREIGN KEY (category_id) REFERENCES categories(id)
);

COMMIT;