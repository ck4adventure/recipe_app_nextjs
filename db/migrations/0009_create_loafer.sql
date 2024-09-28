BEGIN;

CREATE TABLE loafer (
		id SERIAL PRIMARY KEY,
		leaven_temp INTEGER NOT NULL,
		leaven_start_time TIMESTAMP,
		createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create a function to update the updatedAt column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the updatedAt column on update
CREATE TRIGGER update_loafer_updated_at
BEFORE UPDATE ON loafer
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

COMMIT;
