BEGIN;

-- // title
-- // label
-- // ingredients []{ qty, measure, ingredient }
-- // directions []text

CREATE TABLE if NOT EXISTS chefs_recipes (
		id SERIAL PRIMARY KEY,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		title VARCHAR(255) NOT NULL,
		label VARCHAR(255) NOT NULL,
		slug VARCHAR(255) NOT NULL CONSTRAINT chefsrecipe_slug_unique UNIQUE,
		steps TEXT [],
		notes TEXT []
);

-- Create a trigger to automatically update the updated_at column on update
CREATE TRIGGER update_chefs_recipes_updated_at
BEFORE UPDATE ON chefs_recipes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

COMMIT;