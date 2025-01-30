BEGIN;
-- recipe ingredients table
-- one recipe has many ingredients
-- should be unique on recipe_id and ingredient
CREATE TABLE recipe_ingredients (
	id SERIAL PRIMARY KEY,
	ingredient VARCHAR(255) NOT NULL,
	recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
	UNIQUE (recipe_id, ingredient)
);

COMMIT;