BEGIN;

CREATE TABLE recipes (
	  id SERIAL PRIMARY KEY,
		title VARCHAR(255) NOT NULL CONSTRAINT recipe_title_unique UNIQUE,
		slug VARCHAR(255) GENERATED ALWAYS AS (
			lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'))
		) STORED,
		CONSTRAINT recipe_slug_unique UNIQUE (slug)
);

COMMIT;