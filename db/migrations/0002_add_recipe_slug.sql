BEGIN;

-- Add a slug column to the recipes table
-- should be generated from the title column
ALTER TABLE recipes 
ADD CONSTRAINT unique_title UNIQUE (title),
ADD COLUMN slug VARCHAR(255) GENERATED always as (lower(replace(title, ' ', '-'))) stored;

COMMIT;
