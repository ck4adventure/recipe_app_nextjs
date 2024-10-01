BEGIN;

-- Then create with currently listed options
CREATE TYPE flour_blend_type AS ENUM ('white', 'cottage', 'rye', 'complet', 'integraal');

CREATE TABLE loafer (
		id SERIAL PRIMARY KEY,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		leaven_start_time TIMESTAMPTZ,
		dough_creation_time TIMESTAMPTZ,
		bench_rest_start_time TIMESTAMPTZ,
		shaped_prove_start_time TIMESTAMPTZ,
		bake_start_time TIMESTAMPTZ,
		bake_end_time TIMESTAMPTZ
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
