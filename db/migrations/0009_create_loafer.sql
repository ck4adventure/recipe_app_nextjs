BEGIN;

-- Then create with currently listed options
CREATE TYPE flour_blend_type AS ENUM ('white', 'cottage', 'rye', 'complet', 'integraal');

CREATE TABLE loafer (
		id SERIAL PRIMARY KEY,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
		leaven_temp INTEGER CHECK (leaven_temp > 32),
		leaven_start_time TIMESTAMP,
		dough_creation_time TIMESTAMP,
		water_ml INTEGER DEFAULT 700,
		water_temp INTEGER CHECK (water_temp > 32),
		starter_g INTEGER CHECK (starter_g > 0),
		flour_g INTEGER CHECK (flour_g > 0),
		flour_blend flour_blend_type NOT NULL DEFAULT 'cottage',
		dough_creation_temp INTEGER CHECK (dough_creation_temp > 32)
);

-- Create a function to update the updatedAt column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updatedAt column on update
CREATE TRIGGER update_loafer_updated_at
BEFORE UPDATE ON loafer
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

COMMIT;
