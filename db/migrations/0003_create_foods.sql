BEGIN;
-- foods table
CREATE TABLE foods (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL CONSTRAINT food_name_unique UNIQUE,
);

COMMIT;