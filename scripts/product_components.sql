		SELECT 
			products.id,
			product_recipes.component,
				JSON_AGG(
						JSON_BUILD_OBJECT(
								'id', chefs_recipes.id,
								'title', chefs_recipes.title,
								'slug', chefs_recipes.slug
						)
				) AS recipe
		FROM products 
		JOIN product_recipes on products.id = product_recipes.product_id
		JOIN chefs_recipes on product_recipes.recipe_id = chefs_recipes.id
		WHERE products.id = 5
		GROUP BY products.id, product_recipes.component