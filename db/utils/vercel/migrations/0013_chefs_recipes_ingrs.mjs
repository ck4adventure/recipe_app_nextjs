
export const createChefsRecipeIngrsTable = async (client) => {
	await client.sql`CREATE TYPE measure_type AS ENUM ('drop', 'g', 'ml', 'liter', 'tsp', 'Tbsp', 'whole',
  'pinch', 'percent', 'piece', 'cup', 'ounce');`

	await client.sql`CREATE TABLE if NOT EXISTS chefs_recipe_ingrs (
		id SERIAL PRIMARY KEY,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		recipe_id INT REFERENCES chefs_recipes(id),
		ingr_id INT REFERENCES ingrs(id),
		measure measure_type NOT NULL,
		qty NUMERIC NOT NULL,
		note TEXT
);`

	await client.sql`CREATE TRIGGER update_chefs_recipe_ingrs_updated_at
	BEFORE UPDATE ON chefs_recipe_ingrs
	FOR EACH ROW
	EXECUTE FUNCTION update_updated_at_column();`

	console.log('chefs_recipe_ingrs table created');
};