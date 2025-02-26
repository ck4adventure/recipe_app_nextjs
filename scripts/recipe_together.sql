SELECT 
    r.id AS recipe_id,
    r.title AS recipe_name,
    r.steps,
    JSON_AGG(
        JSON_BUILD_OBJECT(
            'packaged_name', i.packaged_name,
            'quantity', ri.qty,
            'measure', ri.measure
        )
    ) AS ingredients
FROM chefs_recipes r
JOIN chefs_recipe_ingrs ri ON r.id = ri.recipe_id
JOIN ingrs i ON ri.ingr_id = i.id
WHERE r.id = 26
GROUP BY r.id;