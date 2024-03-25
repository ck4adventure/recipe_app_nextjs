export const GET_CATEGORIES = `
	SELECT * FROM categories
`;

export const GET_CATEGORIES_AND_RECIPES = `
  SELECT c.id AS category_id, c.name AS category_name, r.id AS recipe_id, r.title AS recipe_title, r.slug AS recipe_slug
	FROM categories c LEFT JOIN recipe_categories rc ON c.id = rc.category_id 
	LEFT JOIN recipes r ON rc.recipe_id = r.id
`;

export const GET_RECIPE_BY_ID = `
	SELECT r.id AS recipe_id, r.title AS recipe_title, r.slug as recipe_slug, c.id AS category_id, c.name AS category_name, array_agg(ri.ingredient) AS ingredients
	FROM recipes r 
	LEFT JOIN recipe_categories rc ON r.id = rc.recipe_id LEFT JOIN categories c ON rc.category_id = c.id
	LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
	WHERE r.id = $1
	GROUP BY r.id, c.id
`;

export const GET_RECIPE_BY_SLUG = `
	SELECT r.id AS recipe_id, r.title AS recipe_title, r.slug as recipe_slug, c.id AS category_id, c.name AS category_name, ingredients, steps
	FROM recipes r 
	LEFT JOIN recipe_categories rc ON r.id = rc.recipe_id 
	LEFT JOIN categories c ON rc.category_id = c.id
	LEFT JOIN (
		SELECT recipe_id, array_agg(ingredient) AS ingredients
		FROM recipe_ingredients
		GROUP BY recipe_id 
	) ri ON r.id = ri.recipe_id
	LEFT JOIN (
		SELECT recipe_id, array_agg(step) AS steps
		FROM recipe_steps
		GROUP BY recipe_id
	) rs ON r.id = rs.recipe_id
	WHERE r.slug = $1
	GROUP BY c.id, r.id, ri.ingredients, rs.steps

`;

export const CREATE_RECIPE = `
  INSERT INTO recipes (title) VALUES ($1) RETURNING id
`;

export const ADD_RECIPE_TO_CATEGORY = `
  INSERT INTO recipe_categories (recipe_id, category_id) VALUES ($1, $2)
`;

export const ADD_INGREDIENT_TO_RECIPE = `
  INSERT INTO recipe_ingredients (recipe_id, ingredient) VALUES ($1, $2)
`;

export const ADD_STEP_TO_RECIPE = `
	INSERT INTO recipe_steps (recipe_id, step) VALUES ($1, $2)
`;