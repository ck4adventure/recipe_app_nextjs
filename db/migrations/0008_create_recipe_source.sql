BEGIN;

-- recipe_source
CREATE TABLE recipe_source (
	id serial PRIMARY KEY,
	recipe_id INTEGER NOT NULL,
	source_id INTEGER NOT NULL,
	page varchar(255),
	FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE,
	FOREIGN KEY (source_id) REFERENCES sources (id) ON DELETE CASCADE,
	UNIQUE (recipe_id)
);

COMMIT;