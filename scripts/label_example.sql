WITH allergens_unnested AS (
  SELECT recipe.id as recipe_id, unnest(ingrs.allergens) as allergen
  FROM chefs_recipes as recipe
  LEFT JOIN chefs_recipe_ingrs as recipe_ingrs ON recipe.id = recipe_ingrs.recipe_id
  LEFT JOIN ingrs ON ingrs.id = recipe_ingrs.ingr_id
  WHERE recipe.id = 37
)
SELECT 
  recipe.id as id, 
  recipe.label, 
  array_agg(DISTINCT ingrs.label_name) as ingredient_labels, 
  array_agg(DISTINCT allergens_unnested.allergen) as allergens
FROM chefs_recipes as recipe
LEFT JOIN chefs_recipe_ingrs as recipe_ingrs ON recipe.id = recipe_ingrs.recipe_id
LEFT JOIN ingrs ON ingrs.id = recipe_ingrs.ingr_id
LEFT JOIN allergens_unnested ON recipe.id = allergens_unnested.recipe_id
WHERE recipe.id = 37
GROUP BY recipe.id, recipe.label;