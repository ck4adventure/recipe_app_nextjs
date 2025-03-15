'use server'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { CREATE_NEW_RECIPE, ADD_RECIPE_INGRS } from '../_lib/sqlQueriesChef'
import { revalidatePath } from 'next/cache';
import { RecipeFormSchema } from '../_ui/chef/recipe_form';

export async function createChefsRecipe(formData: z.infer<typeof RecipeFormSchema>) {
	let slug
	try {
		// console.log("form data received: ", formData);
		const recipeResult = await CREATE_NEW_RECIPE(formData);
		// console.log(result);
		const id = recipeResult.rows[0].id;
		slug = recipeResult.rows[0].slug;
		if (!id) {
			throw new Error("error within create recipe sql command");
		}

		const ingrs = formData.ingredients;
		for (const ingrData of ingrs) {
			await ADD_RECIPE_INGRS(id, ingrData);
		}



	} catch (error) {
		console.log("db creation error")
		console.log(error)
	}
	revalidatePath('/chef/recipes');
	redirect(`/chef/recipes/${slug}`);

}