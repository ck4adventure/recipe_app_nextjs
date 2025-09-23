BEGIN;
-- recipe notes table
-- one recipe has many notes
-- should be unique on recipe_id and note
CREATE TABLE recipe_notes (
	id SERIAL PRIMARY KEY,
	note text NOT NULL,
	recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
	UNIQUE (recipe_id, note)
);

COMMIT;