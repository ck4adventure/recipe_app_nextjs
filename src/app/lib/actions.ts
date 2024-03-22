'use server';
import { query } from '../../../db/index.mjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'

// createRecipe takea a title and categoryID and creates the recipe and adds it to the category
export const createRecipe = async (title: string, categoryID: number, ingredients: string[], steps: string[]) => {
	// TODO write validations for incoming data
	// first add the recipe, then grab the id to add an entry into the joins table
	console.log('begin createRecipe');
	const results = await query(`INSERT INTO recipes (title) VALUES ($1) RETURNING id`, [title]);
	const data = results.rows as any[];
	const newRecipeID = data[0].id as Number;
	console.log(`newRecipeID: ${newRecipeID}; categoryID: ${categoryID}`);
	await query(`INSERT INTO recipe_categories (recipe_id, category_id) VALUES ($1, $2)`, [newRecipeID, categoryID]);
	// add recipe ingredients to recipe_ingredients table
	if (ingredients && ingredients.length > 0) {
		for (const ingr of ingredients) {
			await query(`INSERT INTO recipe_ingredients (recipe_id, ingredient) VALUES ($1, $2)`, [newRecipeID, ingr]);
		}
	}
	if (steps && steps.length > 0) {
		for (const step of steps) {
			await query(`INSERT INTO recipe_steps (recipe_id, step) VALUES ($1, $2)`, [newRecipeID, step]);
		}
	}

	revalidatePath('/recipes');
	redirect('/recipes');
}

// deleteRecipeById takes a recipeID 
export const deleteRecipeById = async (recipeID: number) => {
	await query(`DELETE FROM recipes WHERE id = $1`, [recipeID]);
	revalidatePath('/recipes');
	redirect('/recipes');
}