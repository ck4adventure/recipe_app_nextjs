// 'use server';
// // import { cache } from 'react'
// import { query } from '../../../db/index.mjs';
// import { pool } from '../../../db/db.mjs';
// import {
// 	GET_AUTHORS,
// 	GET_AUTHOR_AND_SOURCES,
// 	GET_AUTHOR_BY_ID,
// 	GET_SOURCES,
// 	GET_SOURCE_AND_RECIPES_BY_ID,
// 	GET_SOURCE_DATA_BY_ID,
// 	GET_CATEGORIES,
// 	GET_CATEGORIES_AND_RECIPES,
// 	GET_RECIPES_FOR_CATEGORY,
// 	GET_RECIPE_BY_SLUG,
// 	CREATE_RECIPE,
// 	ADD_INGREDIENT_TO_RECIPE,
// 	ADD_STEP_TO_RECIPE,
// 	DELETE_RECIPE_INGREDIENTS,
// 	DELETE_RECIPE_STEPS,
// 	UPDATE_RECIPE
// } from './sqlQueries';

// // getAuthors returns rows containing author data
// export const getAuthors = async () => {
// 	const result = await query(GET_AUTHORS, null);
// 	return result.rows;
// };

// export const getAuthorAndSources = async (authorID: number) => {
// 	const result = await query(GET_AUTHOR_AND_SOURCES, [authorID]);
// 	return result.rows;
// }

// export const getAuthorOnlyById = async (authorID: number) => {
// 	const result = await query(GET_AUTHOR_BY_ID, [authorID]);
// 	return result.rows[0];
// }

// // getSource returns sources data
// export const getSources = async () => {
// 	const result = await query(GET_SOURCES, null);
// 	return result.rows;
// };

// export const getSourceDataById = async (id: number) => {
// 	const result = await query(GET_SOURCE_DATA_BY_ID, [id]);
// 	return result.rows[0];
// }

// export const getRecipesAuthorsForSource = async (sourceID: number) => {
// 	const result = await query(GET_SOURCE_BY_ID, [sourceID]);
// 	return result.rows;
// }


// // getCategories returns rows containing category data
// export const getCategories = async () => {
// 	const result = await query(GET_CATEGORIES, null);
// 	return result.rows;
// };

// // getCategoriesAndRecipes returns rows containing category and recipe data
// export const getCategoriesAndRecipes = async () => {
// 	const result = await query(GET_CATEGORIES_AND_RECIPES, null);
// 	return result.rows;
// };

// export const getRecipesForCategory = async (name: string) => {
// 	const result = await query(GET_RECIPES_FOR_CATEGORY, [name]);
// 	return result.rows;
// };

// // getRecipeBySlug returns a single row containing recipe, ingrs and category data
// export const getRecipeBySlug = async (slug: string) => {
// 	const result = await query(GET_RECIPE_BY_SLUG, [slug]);
// 	return result.rows[0];
// };

// // createRecipe takes a title, categoryID, sourceID, ingredients and steps and creates a recipe
// export const createRecipe = async (title: string, categoryID: number, sourceID: number, ingredients: string[], steps: string[]) => {
// 	// TODO write validations for incoming data
// 	const client = await pool.connect();
// 	try {
// 		await client.query('BEGIN');
// 		const results = await client.query(CREATE_RECIPE, [title, categoryID, sourceID]);
// 		const data = results.rows as any[];
// 		const newRecipeID = data[0].id as Number;
// 		// add recipe ingredients to recipe_ingredients table
// 		if (ingredients && ingredients.length > 0) {
// 			for (const ingr of ingredients) {
// 				await client.query(ADD_INGREDIENT_TO_RECIPE, [newRecipeID, ingr]);
// 			}
// 		}
// 		if (steps && steps.length > 0) {
// 			for (const step of steps) {
// 				await client.query(ADD_STEP_TO_RECIPE, [newRecipeID, step]);
// 			}
// 		}
// 		await client.query('COMMIT');
// 	} catch (e) {
// 		await client.query('ROLLBACK')
// 		console.error(e);
// 	} finally {
// 		client.release()
// 	}
// };

// // updateRecipe has to work across many joins tables
// // updating title is easy, but ingredients and steps require deleting old entries
// // and adding new ones
// // or, we need to have the id for each step and ingredient and update them individually
// export const updateRecipe = async (recipeID: number, title: string, categoryID: number, sourceID: number, ingredients: string[], steps: string[]) => {
// 	// TODO write validations for incoming data
// 	const client = await pool.connect();
// 	let newSlug = '';
// 	try {
// 		await client.query('BEGIN');
// 		// currently a bit brute force
// 		// TODO create a more sophisticated data structure to determine
// 		// which fields have changed
// 		await client.query(DELETE_RECIPE_INGREDIENTS, [recipeID]);
// 		await client.query(DELETE_RECIPE_STEPS, [recipeID]);

// 		const results = await client.query(UPDATE_RECIPE, [recipeID, title, categoryID, sourceID]);
// 		const data = results.rows as any[];
// 		newSlug = data[0].slug as string;
// 		// add recipe ingredients to recipe_ingredients table
// 		if (ingredients && ingredients.length > 0) {
// 			for (const ingr of ingredients) {
// 				await client.query(ADD_INGREDIENT_TO_RECIPE, [recipeID, ingr]);
// 			}
// 		}
// 		if (steps && steps.length > 0) {
// 			for (const step of steps) {
// 				await client.query(ADD_STEP_TO_RECIPE, [recipeID, step]);
// 			}
// 		}
// 		await client.query('COMMIT');
// 	} catch (e) {
// 		await client.query('ROLLBACK')
// 		console.error(e);
// 	} finally {
// 		client.release()
// 	}
// 	return newSlug;
// }
