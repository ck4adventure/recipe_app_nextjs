BEGIN;

CREATE TYPE sourcetyp AS ENUM ('BOOK', 'SITE', 'PERSONAL');

CREATE TABLE sources (
		id serial primary key,
		source_type sourcetyp DEFAULT 'BOOK',
		title varchar(500) NOT NULL CONSTRAINT source_title_unique UNIQUE,
		source_url varchar(2000) CONSTRAINT source_url_required_for_site CHECK ((source_type = 'SITE' AND source_url IS NOT NULL) OR source_type <> 'SITE'),
		slug VARCHAR(255) GENERATED ALWAYS AS (
			lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'))
		) STORED,
		CONSTRAINT source_slug_unique UNIQUE (slug),
		single_author boolean DEFAULT TRUE
);

COMMIT;