
export const createProductsTable = async (client) => {

	await client.sql`CREATE TABLE if NOT EXISTS products (
		id SERIAL PRIMARY KEY,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		name VARCHAR(255) NOT NULL,
		slug VARCHAR(255) NOT NULL CONSTRAINT product_slug_unique UNIQUE,
		category VARCHAR(255) DEFAULT 'misc.' NOT NULL,
		description VARCHAR(255),
		steps TEXT [] NOT NULL DEFAULT '{}',
		notes TEXT [] NOT NULL DEFAULT '{}'
	);`;

	await client.sql`
		CREATE TRIGGER update_products_updated_at
		BEFORE UPDATE ON products
		FOR EACH ROW
		EXECUTE FUNCTION update_updated_at_column();`;

	console.log('products table created');
};