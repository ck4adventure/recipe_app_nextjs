'use server';
import { query } from '../../../db/index.mjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createRecipeWithCategory } from './data';

// createRecipeAndRedirect takea a title and categoryID and creates the recipe and adds it to the category
export const createRecipeAndRedirect = async (title: string, categoryID: number, ingredients: string[], steps: string[]) => {
	// TODO write validations for incoming data
	await createRecipeWithCategory(title, categoryID, ingredients, steps);
	revalidatePath('/recipes');
	redirect('/recipes');
};


// deleteRecipeByIdAndRedirect takes a recipeID 
export const deleteRecipeByIdAndRedirect = async (recipeID: number) => {
	try {
		await query(`DELETE FROM recipes WHERE id = $1`, [recipeID]);
		revalidatePath('/recipes');
		redirect('/recipes');
	} catch (e) {
		console.error(e);
	}
};