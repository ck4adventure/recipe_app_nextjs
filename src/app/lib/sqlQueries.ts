export const GET_AUTHORS = `
  SELECT * FROM authors
`;

export const GET_AUTHOR_AND_INFO = `
	SELECT a.id as author_id, a.name as author_name, a.is_profi, s.title as source_title, s.source_type, s.source_url, s.id as source_id
	FROM authors a
	LEFT JOIN source_authors sa on sa.author_id = a.id
	LEFT JOIN sources s on s.id = sa.source_id
	WHERE a.id = $1
`;

export const GET_SOURCES = `
	SELECT * FROM sources
`;

export const GET_SOURCE_BY_ID = `
	SELECT s.id as source_id, s.source_type, s.title, s.source_url, a.name as author_name, a.is_profi, a.id as author_id
	FROM sources s
	JOIN source_authors sa on sa.source_id = s.id
	JOIN authors a on sa.author_id = a.id
	WHERE s.id = $1
`

export const GET_RECIPES_FOR_SOURCE = `
  SELECT r.id as recipe_id, r.title as recipe_title, r.slug as recipe_slug, s.id as source_id
	FROM recipes r
	JOIN sources s on r.source_id = s.id
	WHERE s.id = $1
`
export const GET_CATEGORIES = `
	SELECT * FROM categories
`;

// Get all categories and recipes
export const GET_CATEGORIES_AND_RECIPES = `
  SELECT c.id AS category_id, c.name AS category_name, r.id AS recipe_id, r.title AS recipe_title, r.slug AS recipe_slug
	FROM categories c LEFT JOIN recipes r ON c.id = r.category_id
`;

// Get recipes for a category
export const GET_RECIPES_FOR_CATEGORY = `
	SELECT r.id AS recipe_id, r.title AS recipe_title, r.slug AS recipe_slug, c.id AS category_id, c.name AS category_name
	FROM recipes r 
	LEFT JOIN categories c ON r.category_id = c.id
	WHERE c.name = $1
`;

// Get recipe by slug returns ALL THE THINGS
export const GET_RECIPE_BY_SLUG = `
	SELECT r.id as recipe_id, r.title as recipe_title,
			c.id as category_id, c.name as category_name,
			s.id as source_id, s.title as source_title,
			a.id as author_id, a.name as author_name,
			ingredients, steps
	FROM recipes r
	INNER JOIN categories c ON r.category_id = c.id
	INNER JOIN sources s on r.source_id = s.id
	INNER JOIN source_authors sa on s.id = sa.source_id
	INNER JOIN authors a on a.id = sa.author_id
	LEFT JOIN (
		SELECT recipe_id, array_agg(ingredient) as ingredients
		FROM recipe_ingredients
		GROUP BY recipe_id
	) ri ON r.id = ri.recipe_id
	LEFT JOIN (
			SELECT recipe_id, array_agg(step) as steps
			FROM recipe_steps
			GROUP BY recipe_id
	) rs ON r.id = rs.recipe_id
	WHERE r.slug = $1
`;

// create recipe with title, category_id, source_id
export const CREATE_RECIPE = `
  INSERT INTO recipes (title, category_id, source_id) VALUES ($1, $2, $3) RETURNING id
`;

// Add ingredients to a recipe
export const ADD_INGREDIENT_TO_RECIPE = `
  INSERT INTO recipe_ingredients (recipe_id, ingredient) VALUES ($1, $2)
`;

// Delete recipe ingredients
export const DELETE_RECIPE_INGREDIENTS = 'DELETE FROM recipe_ingredients WHERE recipe_id = $1';

// Add a step to a recipe
export const ADD_STEP_TO_RECIPE = `
	INSERT INTO recipe_steps (recipe_id, step) VALUES ($1, $2)
`;

// Delete recipe steps
export const DELETE_RECIPE_STEPS = 'DELETE FROM recipe_steps WHERE recipe_id = $1';

// Update takes recipe title, category_id, source_id
export const UPDATE_RECIPE = `
	UPDATE recipes SET title = $2, category_id = $3, source_id = $4 WHERE id = $1 RETURNING slug
`;