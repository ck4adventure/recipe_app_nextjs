BEGIN;

CREATE TABLE IF NOT EXISTS categories (
	id SERIAL PRIMARY KEY,
	name VARCHAR(40) NOT NULL CONSTRAINT category_name_unique UNIQUE,
	slug VARCHAR(255) GENERATED ALWAYS AS (
		lower(regexp_replace(regexp_replace(name, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'))
	) STORED,
	CONSTRAINT category_slug_unique UNIQUE (slug)
);

COMMIT;