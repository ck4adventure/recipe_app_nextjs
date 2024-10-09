BEGIN;

CREATE TYPE flour_blend_type AS ENUM ('white', 'cottage', 'rye', '50/50', 'complet', 'integraal');

CREATE TABLE dough (
		id SERIAL PRIMARY KEY,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		water_amt INTEGER,
		water_temp INTEGER,
		leaven_amt INTEGER,
		flour_amt INTEGER,
		flour_blend flour_blend_type,
		start_time TIMESTAMPTZ,
		start_temp INTEGER,
		salt_time TIMESTAMPTZ,
		end_time TIMESTAMPTZ,
		end_temp INTEGER
);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updated_at column on update
CREATE TRIGGER update_dough_updated_at
BEFORE UPDATE ON dough
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

COMMIT;
