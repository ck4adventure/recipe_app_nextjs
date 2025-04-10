
export const createProductRecipesTable = async (client) => {

	await client.sql`CREATE TYPE component_type AS ENUM ('base', 'filling', 'topping');`;

	await client.sql`CREATE TABLE if NOT EXISTS product_recipes (
		id SERIAL PRIMARY KEY,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		recipe_id INT REFERENCES chefs_recipes(id),
		product_id INT REFERENCES products(id),
		component component_type NOT NULL
	);`;

	await client.sql`CREATE TRIGGER update_product_recipes_updated_at
		BEFORE UPDATE ON product_recipes
		FOR EACH ROW
		EXECUTE FUNCTION update_updated_at_column();
	`;

	console.log('product_recipes table created');
};