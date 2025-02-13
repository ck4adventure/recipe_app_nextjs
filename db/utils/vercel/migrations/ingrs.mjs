// TODO NEED TO ADD SLUG aka KEY, UNIQUE

export const createIngrsTable = async (client) => {
	await client.sql`CREATE TABLE IF NOT EXISTS ingrs (
		id SERIAL PRIMARY KEY,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		category VARCHAR(255) NOT NULL,
		slug VARCHAR(255) NOT NULL CONSTRAINT ingr_slug_unique UNIQUE,
		brand VARCHAR(255) NULL,
		packaged_name VARCHAR(255) NULL,
		label_name VARCHAR(255) NOT NULL,
		ingredients TEXT[] NOT NULL,
		allergens TEXT[],
		CONSTRAINT check_valid_allergens CHECK (
        allergens IS NULL OR (
            allergens <@ ARRAY[
                'milk', 'eggs', 'fish', 'shellfish', 'tree nuts', 
                'peanuts', 'wheat', 'soy', 'sesame'
            ]::TEXT[]
        )
    )
	);`

	await client.sql`CREATE TRIGGER update_ingrs_updated_at
		BEFORE UPDATE ON ingrs
		FOR EACH ROW
		EXECUTE FUNCTION update_updated_at_column();`

	console.log('ingrs table created');
};