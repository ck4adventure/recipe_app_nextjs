BEGIN;

-- // title
-- // label
-- // ingredients []{ qty, measure, ingredient }
-- // directions []text

CREATE TYPE measure_type AS ENUM ("drop", "g", "ml", "l", "tsp", "Tbsp", "whole",
  "pinch", "percent", "piece", "cup", "ounce");

CREATE TABLE if NOT EXISTS chefs_recipes (
		id SERIAL PRIMARY KEY,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		title VARCHAR(255) NOT NULL,
		label VARCHAR(255) NOT NULL,
		steps TEXT [],
		notes TEXT []
);

CREATE TABLE if NOT EXISTS chefs_recipe_ingrs (
		id SERIAL PRIMARY KEY,
		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
		recipe_id INT REFERENCES chefs_recipes(id),
		qty NUMERIC NOT NULL,
		measure measure_type NOT NULL,
		ingr_id INT REFERENCES ingrs(id),
		note TEXT
);

COMMIT;