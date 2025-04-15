// tests next.js actions for chefs/recipe pages
import { createChefsRecipe } from '@/app/chef/actions';
import { CREATE_NEW_RECIPE, ADD_RECIPE_INGRS } from '@/app/_lib/sqlQueriesChef';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { RecipeFormSchema } from '@/app/_ui/chef/recipe_form';
import { z } from 'zod';

import { expect as jestExpect } from '@jest/globals';

jest.mock('../../src/app/_lib/sqlQueriesChef');
jest.mock('next/cache');
jest.mock('next/navigation');

jest.mock("lucide-react", () => ({
  ChevronUp: () => <div data-testid="chevron-up" />,
  // Mock other icons you use here
}));


describe('createChefsRecipe', () => {
	const mockFormData: RecipeFormData = {
		title: 'Test Recipe',
		category: 'misc.',
		label: 'test recipe',
		slug: 'test-recipe',
		ingredients: [{ qty: 1, measure: "tsp", ingr_id: 1 }, { qty: 2, measure: "Tbsp", ingr_id: 2, note: "note" }],
		steps: [{value: "step 1 text"}],
		notes: [{value: "note 1 text"}]
	};

	type RecipeFormData = z.infer<typeof RecipeFormSchema>;
	const validatedFormData = RecipeFormSchema.parse(mockFormData) as RecipeFormData;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should create a new recipe and add ingredients successfully', async () => {
		const mockRecipeResult = { rows: [{
		id: 1,
		title: 'Test Recipe',
		category: 'misc.',
		label: 'test recipe',
		slug: 'test-recipe',
		steps: [{value: "step 1 text"}],
		notes: [{value: "note 1 text"}]
	}] };
		(CREATE_NEW_RECIPE as jest.Mock).mockResolvedValue(mockRecipeResult);

		await createChefsRecipe(validatedFormData);

		jestExpect(CREATE_NEW_RECIPE).toHaveBeenCalledWith(validatedFormData);
		jestExpect(ADD_RECIPE_INGRS).toHaveBeenCalledTimes(2);
		jestExpect(ADD_RECIPE_INGRS).toHaveBeenCalledWith(1, { qty: 1, measure: "tsp", ingr_id: 1 });
		jestExpect(ADD_RECIPE_INGRS).toHaveBeenCalledWith(1, { qty: 2, measure: "Tbsp", ingr_id: 2, note: "note" });
		jestExpect(revalidatePath).toHaveBeenCalledWith('/chef/recipes');
		jestExpect(redirect).toHaveBeenCalledWith('/chef/recipes/test-recipe');
	});

});