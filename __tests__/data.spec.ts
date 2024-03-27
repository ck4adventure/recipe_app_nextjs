import { query } from '../db/index.mjs';
import { getCategories, getCategoriesAndRecipes, getRecipeById, getRecipeBySlug, createRecipeWithCategory } from '@/app/lib/data';
import {
	CREATE_RECIPE,
	GET_CATEGORIES, 
	GET_CATEGORIES_AND_RECIPES, 
	GET_RECIPE_BY_ID, 
	GET_RECIPE_BY_SLUG
} from '@/app/lib/sqlQueries';
import { expect as jestExpect } from '@jest/globals';

// jest mock will replace the actual implementation of the function with a jest mock function
jest.mock('../db/index.mjs');

describe('data', () => {
	beforeEach(() => {
		// Clear all instances and calls to constructor and all methods:
		(query as jest.Mock).mockClear();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('getCategories calls the query function with the correct SQL', async () => {
		const mockResult = {
			rows: [
				{ id: 1, name: 'Category 1' },
				{ id: 2, name: 'Category 2' },
			],
		};
		(query as jest.Mock).mockResolvedValue(mockResult);
		const result = await getCategories();
		jestExpect((query as jest.Mock)).toHaveBeenCalledWith(GET_CATEGORIES, null);
		jestExpect(result).toEqual(mockResult.rows);
	});

	it('getCategoriesAndRecipes calls the query function with the correct SQL', async () => {
		const mockResult = {
			rows: [
				{
					category_id: 1,
					category_name: 'Category 1',
					recipe_id: 1,
					recipe_title: 'Recipe 1',
					recipe_slug: 'recipe-1',
				},
				{
					category_id: 1,
					category_name: 'Category 1',
					recipe_id: 2,
					recipe_title: 'Recipe 2',
					recipe_slug: 'recipe-2',
				},
				{
					category_id: 2,
					category_name: 'Category 2',
					recipe_id: 3,
					recipe_title: 'Recipe 3',
					recipe_slug: 'recipe-3',
				},
			],
		};
		(query as jest.Mock).mockResolvedValue(mockResult);
		const result = await getCategoriesAndRecipes();
		jestExpect((query as jest.Mock)).toHaveBeenCalledWith(GET_CATEGORIES_AND_RECIPES, null);
		jestExpect(result).toEqual(mockResult.rows);
	});

	it('getRecipeById calls the query function with the correct SQL and parameters', async () => {
		const mockResult = {
			rows: [
				{
					recipe_id: 1,
					recipe_title: 'Recipe 1',
					recipe_slug: 'recipe-1',
					category_id: 1,
					category_name: 'Category 1',
					ingredients: ['Ingredient 1', 'Ingredient 2'],
				},
			],
		};
		const id = 1;
		(query as jest.Mock).mockResolvedValue(mockResult);
		const result = await getRecipeById(id);
		jestExpect((query as jest.Mock)).toHaveBeenCalledWith(GET_RECIPE_BY_ID, [id]);
		jestExpect(result).toEqual(mockResult.rows[0]);
	});

	it('getRecipeBySlug calls the query function with the correct SQL and parameters', async () => {
		const mockResult = {
			rows: [
				{
					recipe_id: 1,
					recipe_title: 'Recipe 1',
					recipe_slug: 'recipe-1',
					category_id: 1,
					category_name: 'Category 1',
					ingredients: ['Ingredient 1', 'Ingredient 2'],
					steps: ['Step 1', 'Step 2'],
				},
			],
		};
		const slug = 'recipe-1';
		(query as jest.Mock).mockResolvedValue(mockResult);
		const result = await getRecipeBySlug(slug);
		jestExpect((query as jest.Mock)).toHaveBeenCalledWith(GET_RECIPE_BY_SLUG, [slug]);
		jestExpect(result).toEqual(mockResult.rows[0]);
	});
});