'use server';
// import { cache } from 'react'
import { query } from '../../../db/index.mjs';
import { pool } from '../../../db/db.mjs';
import {
	ADD_INGREDIENT_TO_RECIPE,
	ADD_RECIPE_TO_CATEGORY,
	ADD_STEP_TO_RECIPE,
	CREATE_RECIPE,
	DELETE_RECIPE_FROM_CATEGORIES,
	DELETE_RECIPE_INGREDIENTS,
	DELETE_RECIPE_STEPS,
	GET_CATEGORIES,
	GET_CATEGORIES_AND_RECIPES,
	GET_RECIPE_BY_ID,
	GET_RECIPE_BY_SLUG,
	UPDATE_RECIPE_TITLE
} from './sqlQueries';
// getCategories returns rows containing category data
export const getCategories = async () => {
	const result = await query(GET_CATEGORIES, null);
	return result.rows;
}

// getCategoriesAndRecipes returns rows containing category and recipe data
export const getCategoriesAndRecipes = async () => {
	const result = await query(GET_CATEGORIES_AND_RECIPES, null);
	return result.rows;
}

// getRecipeById returns a single row containing recipe and category data
export const getRecipeById = async (id: number) => {
	const result = await query(GET_RECIPE_BY_ID, [id]);
	return result.rows[0];
}

// getRecipeBySlug returns a single row containing recipe, ingrs and category data
export const getRecipeBySlug = async (slug: string) => {
	const result = await query(GET_RECIPE_BY_SLUG, [slug]);
	return result.rows[0];
}

// createRecipeWithCategory takes a title, categoryID, ingredients and steps and creates a recipe
export const createRecipeWithCategory = async (title: string, categoryID: number, ingredients: string[], steps: string[]) => {
	// TODO write validations for incoming data
	// first add the recipe, then grab the id to add an entry into the joins table
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		const results = await client.query(CREATE_RECIPE, [title]);
		const data = results.rows as any[];
		const newRecipeID = data[0].id as Number;
		// add recipe to category
		await client.query(ADD_RECIPE_TO_CATEGORY, [newRecipeID, categoryID]);
		// add recipe ingredients to recipe_ingredients table
		if (ingredients && ingredients.length > 0) {
			for (const ingr of ingredients) {
				await client.query(ADD_INGREDIENT_TO_RECIPE, [newRecipeID, ingr]);
			}
		}
		if (steps && steps.length > 0) {
			for (const step of steps) {
				await client.query(ADD_STEP_TO_RECIPE, [newRecipeID, step]);
			}
		}
		await client.query('COMMIT');
	} catch (e) {
		await client.query('ROLLBACK')
		console.error(e);
	} finally {
		client.release()
	}
}

// updateRecipe has to work across many joins tables
// updating title is easy, but ingredients and steps require deleting old entries
// and adding new ones
// or, we need to have the id for each step and ingredient and update them individually
export const updateRecipe = async (recipeID: number, title: string, categoryID: number, ingredients: string[], steps: string[]) => {
	// TODO write validations for incoming data
	const client = await pool.connect();
	try {
		await client.query('BEGIN');
		// currently a bit brute force
		// TODO create a more sophisticated data structure to determine
		// which fields have changed
		await client.query(DELETE_RECIPE_FROM_CATEGORIES, [recipeID]);
		await client.query(DELETE_RECIPE_INGREDIENTS, [recipeID]);
		await client.query(DELETE_RECIPE_STEPS, [recipeID]);
		
		await client.query(UPDATE_RECIPE_TITLE, [title, recipeID]);
		await client.query(ADD_RECIPE_TO_CATEGORY, [recipeID, categoryID]);
		// add recipe ingredients to recipe_ingredients table
		if (ingredients && ingredients.length > 0) {
			for (const ingr of ingredients) {
				await client.query(ADD_INGREDIENT_TO_RECIPE, [recipeID, ingr]);
			}
		}
		if (steps && steps.length > 0) {
			for (const step of steps) {
				await client.query(ADD_STEP_TO_RECIPE, [recipeID, step]);
			}
		}
		await client.query('COMMIT');
	} catch (e) {
		await client.query('ROLLBACK')
		console.error(e);
	} finally {
		client.release()
	}
}
