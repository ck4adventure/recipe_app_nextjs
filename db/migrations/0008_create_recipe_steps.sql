BEGIN;
-- recipe steps table
-- one recipe has many steps
-- should be unique on recipe_id and step
CREATE TABLE recipe_steps (
	id SERIAL PRIMARY KEY,
	step text NOT NULL,
	recipe_id INTEGER NOT NULL,
	FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
	UNIQUE (recipe_id, step)
);

COMMIT;