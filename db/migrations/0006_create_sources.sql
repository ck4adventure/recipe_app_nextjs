BEGIN;

CREATE TYPE sourcetyp AS ENUM ('BOOK', 'SITE', 'PERSONAL');

CREATE TABLE sources (
		id serial primary key,
		source_type sourcetyp DEFAULT 'BOOK',
		source_title varchar(500) NOT NULL,
		source_url varchar(2000),
		CONSTRAINT title_required_for_book CHECK ((source_type = 'BOOK' AND source_title IS NOT NULL) OR source_type <> 'BOOK'),
		CONSTRAINT title_required_for_personal_collection CHECK ((source_type = 'PERSONAL' AND source_title IS NOT NULL) OR source_type <> 'PERSONAL'),
		CONSTRAINT source_url_required_for_site CHECK ((source_type = 'SITE' AND source_url IS NOT NULL) OR source_type <> 'SITE')
);

COMMIT;