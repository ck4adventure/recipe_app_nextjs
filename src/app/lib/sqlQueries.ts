export const GET_AUTHORS = `
  SELECT * FROM authors
`;

export const GET_AUTHOR_AND_INFO = `
	SELECT a.id as author_id, a.full_name as author_name, a.is_profi, s.title as source_title, s.source_type, s.source_url, s.id as source_id
	FROM authors a
	LEFT JOIN source_authors sa on sa.author_id = a.id
	LEFT JOIN sources s on s.id = sa.source_id
	WHERE a.id = $1
`;

export const GET_SOURCES = `
	SELECT * FROM sources
`;

export const GET_SOURCE_BY_ID = `
	SELECT s.id as source_id, s.source_type, s.title, s.source_url, a.full_name, a.is_profi, a.id as author_id
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

export const GET_CATEGORIES_AND_RECIPES = `
  SELECT c.id AS category_id, c.name AS category_name, r.id AS recipe_id, r.title AS recipe_title, r.slug AS recipe_slug
	FROM categories c LEFT JOIN recipe_categories rc ON c.id = rc.category_id 
	LEFT JOIN recipes r ON rc.recipe_id = r.id
`;

export const GET_RECIPES_FOR_CATEGORY = `
	SELECT r.id AS recipe_id, r.title AS recipe_title, r.slug AS recipe_slug, c.id AS category_id, c.name AS category_name
	FROM recipes r 
	LEFT JOIN recipe_categories rc ON r.id = rc.recipe_id
	LEFT JOIN categories c ON rc.category_id = c.id
	WHERE c.name = $1
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
SELECT r.id as recipe_id, r.title as recipe_title, r.source_id,
			 c.id as category_id, c.name as category_name,
       ingredients, steps
FROM recipes r
LEFT JOIN recipe_categories rc ON r.id = rc.recipe_id
LEFT JOIN categories c ON rc.category_id = c.id
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

export const GET_SOURCE_AND_AUTHOR_FOR_RECIPE = `
	SELECT r.id as recipe_id, a.full_name as author_name, a.id as author_id, s.id as source_id, s.title as source_title, s.source_type, s.source_url, s.source_type
	FROM sources s
	JOIN recipes r on r.source_id = s.id
	JOIN source_authors sa on sa.source_id = s.id
	JOIN authors a on sa.author_id = a.id
	WHERE r.id = $1
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

// Add a step to a recipe
export const ADD_STEP_TO_RECIPE = `
	INSERT INTO recipe_steps (recipe_id, step) VALUES ($1, $2)
`;

// Delete recipe steps
export const DELETE_RECIPE_STEPS = 'DELETE FROM recipe_steps WHERE recipe_id = $1';

// Update recipe title and return slug
export const UPDATE_RECIPE_TITLE = 'UPDATE recipes SET title = $1 WHERE id = $2 RETURNING slug';

// Delete recipe from categories
export const DELETE_RECIPE_FROM_CATEGORIES = 'DELETE FROM recipe_categories WHERE recipe_id = $1';

// Delete recipe ingredients
export const DELETE_RECIPE_INGREDIENTS = 'DELETE FROM recipe_ingredients WHERE recipe_id = $1';