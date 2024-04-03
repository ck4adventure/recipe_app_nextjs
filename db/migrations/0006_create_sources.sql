BEGIN;

CREATE TYPE sourcetyp AS ENUM ('BOOK', 'SITE', 'PERSONAL');

CREATE TABLE sources (
		id serial primary key,
		source_type sourcetyp DEFAULT 'BOOK',
		title varchar(500) NOT NULL,
		source_url varchar(2000),
		CONSTRAINT title_required CHECK (title IS NOT NULL),
		CONSTRAINT source_url_required_for_site CHECK ((source_type = 'SITE' AND source_url IS NOT NULL) OR source_type <> 'SITE')
);

COMMIT;