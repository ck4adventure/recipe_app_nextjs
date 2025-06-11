'use server';
// import { query } from '../../../db/index.mjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CREATE_RECIPE, UPDATE_RECIPE, ADD_INGREDIENT_TO_RECIPE, ADD_STEP_TO_RECIPE, DELETE_RECIPE_INGREDIENTS, DELETE_RECIPE_STEPS } from '../_lib/sqlQueriesRecipes';

// server side
// this functions wraps the async vercel sql call, catches the errors
// allowing the sql call to be reused if needed
// and allowing further actions like redirect

// IN PROGRESS - WRITE TESTING

// createRecipeAndRedirect takea a title and categoryID and creates the recipe and adds it to the category
export const createRecipeAndRedirect = async (title: string, categoryID: number, sourceID: number, authorID: number, ingredients: string[], steps: string[]) => {
	try {
	// TODO write validations for incoming data
	const result = await CREATE_RECIPE(title, categoryID, sourceID, authorID);
	const newRecipeID = result.id as number;
		// add recipe ingredients to recipe_ingredients table
		if (ingredients && ingredients.length > 0) {
			for (const ingr of ingredients) {
				await ADD_INGREDIENT_TO_RECIPE(newRecipeID, ingr);
			}
		}
		if (steps && steps.length > 0) {
			for (const step of steps) {
				await ADD_STEP_TO_RECIPE(newRecipeID, step);
			}
		}
	} catch (error) {
		throw error
	}
	revalidatePath('/recipes');
	redirect('/recipes');
};

export const updateRecipeAndRedirect = async (recipeID: number, title: string, categoryID: number, sourceID: number, authorID: number, ingredients: string[], steps: string[]) => {
	// TODO write validations for incoming data
	const slugrow = await UPDATE_RECIPE(recipeID, title, categoryID, sourceID, authorID);
	await DELETE_RECIPE_INGREDIENTS(recipeID)
	await DELETE_RECIPE_STEPS(recipeID)
	if (ingredients && ingredients.length > 0) {
		for (const ingr of ingredients) {
			await ADD_INGREDIENT_TO_RECIPE(recipeID, ingr)
		}
	}
	if (steps && steps.length > 0) {
		for (const step of steps) {
			await ADD_STEP_TO_RECIPE(recipeID, step)
		}
	}
	console.log(slugrow)
	revalidatePath(`/recipes/${slugrow.slug}`);
	redirect(`/recipes/${slugrow.slug}`);
};