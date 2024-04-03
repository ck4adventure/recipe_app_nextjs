BEGIN;

CREATE TABLE authors (
	id serial primary key,
	full_name VARCHAR(255) NOT NULL CONSTRAINT author_full_name_unique UNIQUE,
	is_profi boolean DEFAULT true,
	slug VARCHAR(255) GENERATED ALWAYS AS (
		lower(regexp_replace(regexp_replace(full_name, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'))
	) STORED,
	CONSTRAINT author_slug_unique UNIQUE (slug)
);

COMMIT;