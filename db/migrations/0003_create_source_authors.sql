BEGIN;

-- source_authors
CREATE TABLE source_authors (
		id SERIAL PRIMARY KEY,
		source_id INTEGER NOT NULL REFERENCES sources (id) ON DELETE CASCADE,
		author_id INTEGER NOT NULL REFERENCES authors (id) ON DELETE CASCADE,
		UNIQUE (source_id, author_id)
);

COMMIT;