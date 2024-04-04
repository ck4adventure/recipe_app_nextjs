'use server';
import { query } from '../../../db/index.mjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createRecipe, updateRecipe } from './data';

// createRecipeAndRedirect takea a title and categoryID and creates the recipe and adds it to the category
export const createRecipeAndRedirect = async (title: string, categoryID: number, sourceID: number, ingredients: string[], steps: string[]) => {
	// TODO write validations for incoming data
	await createRecipe(title, categoryID, sourceID, ingredients, steps);
	revalidatePath('/recipes');
	redirect('/recipes');
};

export const updateRecipeAndRedirect = async (recipeID: number, title: string, categoryID: number, sourceID: number, ingredients: string[], steps: string[]) => {
	// TODO write validations for incoming data
	const slug = await updateRecipe(recipeID, title, categoryID, sourceID, ingredients, steps);
	revalidatePath(`/recipes/${slug}`);
	redirect(`/recipes/${slug}`);
};


// deleteRecipeByIdAndRedirect takes a recipeID 
export const deleteRecipeByIdAndRedirect = async (recipeID: number) => {
	try {
		await query(`DELETE FROM recipes WHERE id = $1`, [recipeID]);
	} catch (e) {
		console.error(e);
	}
	revalidatePath('/recipes');
	redirect('/recipes');
};