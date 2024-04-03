BEGIN;

-- Add a slug column to the recipes table
-- should be generated from the title column
ALTER TABLE recipes 
ADD CONSTRAINT unique_title UNIQUE (title),
ADD COLUMN slug VARCHAR(255) GENERATED always as (
	lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'))
) stored,
ADD CONSTRAINT unique_slug UNIQUE (slug);

COMMIT;
