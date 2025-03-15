BEGIN;

-- // title
-- // label
-- // ingredients []{ qty, measure, ingredient }
-- // directions []text

CREATE TYPE measure_type AS ENUM ('drop', 'g', 'ml', 'liter', 'tsp', 'Tbsp', 'whole',
  'pinch', 'percent', 'piece', 'cup', 'ounce');

CREATE TABLE if NOT EXISTS chefs_recipe_ingrs (
		id SERIAL PRIMARY KEY,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		recipe_id INT REFERENCES chefs_recipes(id),
		ingr_id INT REFERENCES ingrs(id),
		measure measure_type NOT NULL,
		qty NUMERIC CHECK (qty > 0) NOT NULL,
		note TEXT
);

-- Create a trigger to automatically update the updated_at column on update
CREATE TRIGGER update_chefs_recipes_ingrs_updated_at
BEFORE UPDATE ON chefs_recipe_ingrs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

COMMIT;