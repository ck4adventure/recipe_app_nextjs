BEGIN;

CREATE TABLE authors (
		id serial primary key,
		full_name VARCHAR(255) NOT NULL,
		is_profi boolean DEFAULT true,
		slug VARCHAR(255) GENERATED always as (
			lower(regexp_replace(regexp_replace(full_name, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'))
		) stored,
);

COMMIT;