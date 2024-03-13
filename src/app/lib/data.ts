'use server';
// import { cache } from 'react'
import { query } from '../../../db/index.mjs';
// getCategories returns rows containing category data
export const getCategories = async () => {
	const res = await query(`SELECT * FROM categories`);
	return res.rows;
}

// getCategoriesAndRecipes returns rows containing category and recipe data
export const getCategoriesAndRecipes = async () => {
	const res = await query(`
	  SELECT c.id AS category_id, c.name AS category_name, r.id AS recipe_id, r.title AS recipe_title
	  FROM categories c LEFT JOIN recipe_categories rc ON c.id = rc.category_id LEFT JOIN recipes r ON rc.recipe_id = r.id
	`);
	return res.rows;
}