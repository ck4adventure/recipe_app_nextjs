BEGIN;

-- source_authors
CREATE TABLE source_authors (
		id SERIAL PRIMARY KEY,
		source_id INTEGER NOT NULL,
		author_id INTEGER NOT NULL,
		FOREIGN KEY (source_id) REFERENCES sources (id) ON DELETE CASCADE,
		FOREIGN KEY (author_id) REFERENCES authors (id) ON DELETE CASCADE,
		UNIQUE (source_id, author_id)
);

COMMIT;