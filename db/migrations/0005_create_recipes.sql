BEGIN;

--recipes
CREATE TABLE IF NOT EXISTS recipes (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL CONSTRAINT unique_title UNIQUE (title),
	slug VARCHAR(255) GENERATED always as (
		lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'))
	) stored CONSTRAINT unique_slug UNIQUE (slug),
	FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE RESTRICT
);

COMMIT;