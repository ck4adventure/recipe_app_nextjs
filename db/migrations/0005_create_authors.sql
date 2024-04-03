BEGIN;

CREATE TABLE authors (
		id serial primary key,
		first_name varchar(40) DEFAULT '',
		last_name varchar(40) DEFAULT '',
		is_profi boolean DEFAULT true,
		full_name varchar(80) GENERATED ALWAYS AS (
			  CASE
            WHEN first_name <> '' AND last_name <> '' THEN first_name || ' ' || last_name
            ELSE first_name || last_name
        END
    ) STORED CONSTRAINT full_name_not_empty CHECK (full_name <> '')
);

COMMIT;