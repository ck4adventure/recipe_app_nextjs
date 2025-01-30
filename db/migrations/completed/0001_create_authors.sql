BEGIN;



CREATE TABLE
	authors (
		id serial primary key,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		name VARCHAR(255) NOT NULL CONSTRAINT author_name_unique UNIQUE,
		is_profi boolean DEFAULT true,
		slug VARCHAR(255) GENERATED ALWAYS AS (
			lower(regexp_replace (regexp_replace (name, '[^a-zA-Z0-9\s]', '', 'g'),'\s+','-','g'))
		) STORED,
		CONSTRAINT author_slug_unique UNIQUE (slug)
	);

-- Create a trigger to automatically update the updated_at column on update
CREATE TRIGGER update_authors_updated_at
BEFORE UPDATE ON authors
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

COMMIT;