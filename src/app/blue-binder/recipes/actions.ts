'use server';
// import { query } from '../../../db/index.mjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CREATE_RECIPE, UPDATE_RECIPE, ADD_INGREDIENT_TO_RECIPE, ADD_STEP_TO_RECIPE, DELETE_RECIPE_INGREDIENTS, DELETE_RECIPE_STEPS, DELETE_RECIPE_NOTES, ADD_NOTE_TO_RECIPE, DELETE_RECIPE_BY_ID, CREATE_AUTHOR, UPDATE_AUTHOR } from '../../_lib/sqlQueriesRecipes';

// server side
// this functions wraps the async vercel sql call, catches the errors
// allowing the sql call to be reused if needed
// and allowing further actions like redirect

// IN PROGRESS - WRITE TESTING

// createRecipeAndRedirect takea a title and categoryID and creates the recipe and adds it to the category
export const createRecipeAndRedirect = async (title: string, categoryID: number, sourceID: number, authorID: number, ingredients: string[], steps: string[], notes: string[]) => {
	let newRecipeSlug;
	try {
		// TODO write validations for incoming data
		const result = await CREATE_RECIPE(title, categoryID, sourceID, authorID);
		newRecipeSlug = result.slug;
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
		if (notes && notes.length > 0) {
			for (const note of notes) {
				await ADD_NOTE_TO_RECIPE(newRecipeID, note);
			}
		}
	} catch (error: any) {
		// Check for unique constraint violation (duplicate slug)
		// Postgres error code for unique_violation is '23505'
		if (error && (error.code === '23505' || (error.message && error.message.includes('duplicate key value')))) {
			return { error: 'duplicate_slug', message: 'A recipe with this title already exists. Please choose another title.' };
		}
		// Other errors
		return { error: 'server_error', message: error?.message || 'An unknown error occurred.' };
	}
	revalidatePath('blue-binder/recipes');
	redirect(`/blue-binder/recipes/${newRecipeSlug}`);
};

export const updateRecipeAndRedirect = async (recipeID: number, title: string, categoryID: number, sourceID: number, authorID: number, ingredients: string[], steps: string[], notes: string[]) => {
	// TODO write validations for incoming data
	let slugrow;
	try {
		slugrow = await UPDATE_RECIPE(recipeID, title, categoryID, sourceID, authorID);
		await DELETE_RECIPE_INGREDIENTS(recipeID)
		await DELETE_RECIPE_STEPS(recipeID)
		await DELETE_RECIPE_NOTES(recipeID)
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
		if (notes && notes.length > 0) {
			console.log("notes on update were: ", notes)
			for (const note of notes) {
				await ADD_NOTE_TO_RECIPE(recipeID, note)
			}
		}

	} catch (error) {
		console.log(slugrow)
		throw error
	}
	console.log(slugrow)
	revalidatePath(`/blue-binder/recipes/${slugrow.slug}`);
	redirect(`/blue-binder/recipes/${slugrow.slug}`);
};


export const deleteRecipeAndRedirect = async (recipeID: number) => {

	try {
		await DELETE_RECIPE_BY_ID(recipeID);

	} catch (error) {
		throw error
	}
	revalidatePath('/blue-binder/recipes')
	redirect(`/blue-binder/recipes`);
};

export const createAuthorAndRedirect = async (authorName: string, isProfi: boolean) => {
	let authorID
	try {
		const result = await CREATE_AUTHOR(authorName, isProfi)
		authorID = result.id;
	} catch (error) {
		throw error
	}
	revalidatePath('/blue-binder/authors');
	redirect(`/blue-binder/authors/${authorID}`)
}

export const updateAuthorAndRedirect = async (authorID: number, authorName: string, isProfi: boolean) => {
	try {
		const result = await UPDATE_AUTHOR(authorID, authorName, isProfi)
	} catch (error) {
		throw error
	}
	revalidatePath(`/blue-binder/authors/${authorID}`);
	redirect(`/blue-binder/authors/${authorID}`)
}