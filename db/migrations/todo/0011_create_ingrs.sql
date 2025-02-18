BEGIN;

-- key_name VARCHAR(255) NOT NULL CONSTRAINT key_name_unique UNIQUE,

CREATE TABLE IF NOT EXISTS ingrs (
		id SERIAL PRIMARY KEY,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		slug VARCHAR(255) NOT NULL CONSTRAINT ingr_slug_unique UNIQUE,
		category VARCHAR(255) NOT NULL DEFAULT 'misc.',
		brand VARCHAR(255) NULL,
		packaged_name VARCHAR(255) NULL,
		label_name VARCHAR(255) NOT NULL,
		ingredients TEXT[] NOT NULL,
		allergens TEXT[] NOT NULL DEFAULT '{}',
		CONSTRAINT check_valid_allergens CHECK (
				allergens <@ ARRAY[
						'milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 
						'peanuts', 'wheat', 'soy', 'sesame'
				]::TEXT[]
    )
);


-- Create a trigger to automatically update the updated_at column on update
CREATE TRIGGER update_ingrs_updated_at
BEFORE UPDATE ON ingrs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

COMMIT;
