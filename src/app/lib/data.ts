'use server';
// import { cache } from 'react'
import { query } from '../../../db/index.mjs';
// getCategories returns rows containing category data
export const getCategories = async () => {
	const result = await query(`SELECT * FROM categories`, null);
	return result.rows;
}

// getCategoriesAndRecipes returns rows containing category and recipe data
export const getCategoriesAndRecipes = async () => {
	const result = await query(`
	  SELECT c.id AS category_id, c.name AS category_name, r.id AS recipe_id, r.title AS recipe_title, r.slug AS recipe_slug
	  FROM categories c LEFT JOIN recipe_categories rc ON c.id = rc.category_id LEFT JOIN recipes r ON rc.recipe_id = r.id
	`, null);
	return result.rows;
}

// getRecipeById returns a single row containing recipe and category data
export const getRecipeById = async (id: number) => {
	const result = await query(`
	  SELECT r.id AS recipe_id, r.title AS recipe_title, r.slug as recipe_slug, c.id AS category_id, c.name AS category_name, array_agg(ri.ingredient) AS ingredients
	  FROM recipes r 
		LEFT JOIN recipe_categories rc ON r.id = rc.recipe_id LEFT JOIN categories c ON rc.category_id = c.id
	  LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
		WHERE r.id = $1
		GROUP BY r.id, c.id
	`, [id]);
	return result.rows[0];
}

// getRecipeBySlug returns a single row containing recipe, ingrs and category data
export const getRecipeBySlug = async (slug: string) => {
	const result = await query(`
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
	`, [slug]);
	return result.rows[0];
}
