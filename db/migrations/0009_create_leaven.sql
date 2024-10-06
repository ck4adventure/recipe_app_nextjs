BEGIN;

CREATE TABLE leaven (
		id SERIAL PRIMARY KEY,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		leaven_start_time TIMESTAMPTZ
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
CREATE TRIGGER update_leaven_updated_at
BEFORE UPDATE ON leaven
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

COMMIT;
