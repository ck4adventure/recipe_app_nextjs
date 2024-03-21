'use server';
import { query } from '../../../db/index.mjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'

// createRecipeWithCategory takea a title and categoryID and creates the recipe and adds it to the category
export const createRecipeWithCategory = async (title: string, categoryID: number) => {
	// first add the recipe, then grab the id to add an entry into the joins table
	const data: Array<any> = await query(`INSERT INTO recipes (title) VALUES ($1) RETURNING id`, [title]);
	const newRecipeID = data[0].id as Number;
	console.log(`newRecipeID: ${newRecipeID}; categoryID: ${categoryID}`);
	await query(`INSERT INTO recipe_categories (recipe_id, category_id) VALUES ($1, $2)`, [newRecipeID, categoryID]);

	revalidatePath('/recipes');
	redirect('/recipes');
}