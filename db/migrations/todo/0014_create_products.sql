BEGIN;

	-- "id": "blueberry_muffin",
	-- "label": "Blueberry Muffin Tart",
	-- "description": "Almond almond cream and homemade blueberry jam with a vanilla crumble combine for the ultimate blueberry muffin flavor",
	-- "price": 4.0,
	-- "unit": "each",
	-- "ingredients": {
	-- 	"base": ["TART_CASE"],
	-- 	"filling": ["ALMOND_CREAM", "BLUEBERRY_JAM"],
	-- 	"topping": ["VANILLA_CRUMBLE"]
	-- }

CREATE TABLE if NOT EXISTS products (
		id SERIAL PRIMARY KEY,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		name VARCHAR(255) NOT NULL,
		slug VARCHAR(255) NOT NULL CONSTRAINT product_slug_unique UNIQUE,
		category VARCHAR(255) DEFAULT 'misc.' NOT NULL,
		description VARCHAR(255),
		steps TEXT [] NOT NULL DEFAULT '{}',
		notes TEXT [] NOT NULL DEFAULT '{}'
);

-- Create a trigger to automatically update the updated_at column on update
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

COMMIT;