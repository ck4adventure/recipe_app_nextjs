WITH allergens_unnested AS (
  SELECT recipe.id as recipe_id, unnest(ingrs.allergens) as allergen
  FROM chefs_recipes as recipe
  LEFT JOIN chefs_recipe_ingrs as recipe_ingrs ON recipe.id = recipe_ingrs.recipe_id
  LEFT JOIN ingrs ON ingrs.id = recipe_ingrs.ingr_id
  WHERE recipe.id IN (
  	SELECT recipe_id
  	FROM product_recipes
  	WHERE product_id = 16
  )
)
SELECT 
  p.id as id,
  p.name as name, 
  array_agg(DISTINCT ingrs.label_name) as ingredient_labels, 
  array_agg(DISTINCT allergens_unnested.allergen) as allergens
FROM products as p
JOIN product_recipes AS pr ON p.id = pr.product_id
JOIN chefs_recipes as r on pr.recipe_id = r.id
LEFT JOIN chefs_recipe_ingrs as recipe_ingrs ON r.id = recipe_ingrs.recipe_id
LEFT JOIN ingrs ON ingrs.id = recipe_ingrs.ingr_id
LEFT JOIN allergens_unnested ON r.id = allergens_unnested.recipe_id
WHERE p.id = 16
GROUP BY p.id, p.name;