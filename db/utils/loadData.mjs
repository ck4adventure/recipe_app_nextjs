// read the folders of the data folder and parse
// author name then types, then source title, finally recipes
// and insert them into the database

import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import authorsData from '../../data/authors-sources.json' assert { type: "json" };
import categoriesData from '../../data/categories.json' assert { type: "json" };
import foods from '../../data/foods.json' assert { type: "json" };


const dataDir = path.join(process.cwd(), 'data');
const dataFolders = fs.readdirSync(dataDir);

// createAuthor takes a name and is_profi  
const createAuthorQuery = `
	INSERT INTO authors (name, is_profi) VALUES ($1, $2) RETURNING id, slug
`;

// getAuthorBySlugQuery takes a name and finds the id
const getAuthorBySlugQuery = `
	SELECT id FROM authors WHERE slug = $1
`;

// createSourceQuery takes a title, source_url, and source_type
const createSourceQuery = `
	INSERT INTO sources (title, source_url, source_type) VALUES ($1, $2, $3) RETURNING id
`;

// getSourceBySlugQuery takes a title and finds source like it
const getSourceBySlugQuery = `
	SELECT id FROM sources WHERE slug = $1
`;

// createCategoryQuery takes a category name
const createCategoryQuery = `INSERT INTO categories (name) VALUES ($1)`;

// getCategoryByNameQuery takes a category name and finds the id
const getCategoryByNameQuery = `
	SELECT id FROM categories WHERE name = $1
`;

// createFoodQuery takes a food name and inserts it into the table
const createFoodQuery = `
	INSERT into foods (name) VALUES ($1)
`;

// createSourceAuthorsQuery takes a category_id, source_id, author_id
const createRecipeQuery = `
	INSERT INTO recipes (title, category_id, source_id, author_id) VALUES ($1, $2, $3, $4) RETURNING id
`;

export const loadData = async (client) => {
	let authorId;

	try {
		// first read in authors and sources data
		for (const authorObject of authorsData) {
			const { author_name, author_slug, is_profi, sources } = authorObject;

			// create author
			await client.query(createAuthorQuery, [author_name, is_profi]);

			// iterate the authors sources
			if (sources) {
				for (const sourceObject of sources) {
					const { source_title, source_url, source_type } = sourceObject;

					// create source
					await client.query(createSourceQuery,[source_title, source_url, source_type]);
				}
			}
		}
		console.log("Authors and sources loaded")


		// next create the categories
		for (const category of categoriesData) {
			await client.query(createCategoryQuery, [category]);
		}
		console.log('Categories loaded');

		// third is foods
		for (const food of foods) {
			await client.query(createFoodQuery, [food]);
		}
		console.log('Foods loaded');


		let authorId;
		// iterate over data folders and parse sub folders, reading in recipes
		for (const folderAuthorSlug of dataFolders) {
			// there are some json files in the data folder, skip those
			if (path.extname(folderAuthorSlug) === '.json' || folderAuthorSlug === "json") {
				console.log(`Skipping json file or folder ${folderAuthorSlug}`);
				continue;
			}

			// read in source folders for that author
			console.log(`Processing author folder ${folderAuthorSlug}`);
			const authorDir = path.join(dataDir, folderAuthorSlug);
			if (folderAuthorSlug != 'various') {
				const authorResult = await client.query(getAuthorBySlugQuery, [folderAuthorSlug]);
				authorId = authorResult.rows[0].id;
			}
			const sourceFolders = fs.readdirSync(authorDir);

			// iterate over source folders
			for (const sourceFolder of sourceFolders) {
				console.log(`Processing source folder ${sourceFolder}`);
				const sourceDir = path.join(authorDir, sourceFolder);
				const sourceResult = await client.query(getSourceBySlugQuery, [sourceFolder]);
				const sourceId = sourceResult.rows[0].id;

				// read in recipe files for that source
				const recipeFiles = fs.readdirSync(sourceDir);
				// iterate over recipe files
				for (const recipeFile of recipeFiles) {
					console.log(`Processing recipe file ${recipeFile}`);
					const recipePath = path.join(sourceDir, recipeFile);
					// parse yaml file
					const recipeData = fs.readFileSync(recipePath, 'utf-8');
					const recipe = yaml.parse(recipeData);

					// if various, get author id from recipe
					if (folderAuthorSlug === 'various') {
						const authorResult = await client.query(getAuthorBySlugQuery, [recipe.author]);
						authorId = authorResult.rows[0].id;
					}

					if (!authorId) {
						throw new Error('Author id not assigned');
					}

					//get category id
					console.log(`Looking for category ${recipe.category}`)
					const categoryResult = await client.query(getCategoryByNameQuery, [recipe.category]);
					const categoryId = categoryResult.rows[0].id;
					console.log(`Found category id ${categoryId} for category ${recipe.category}`);

					// insert recipe into database
					const recipeResult = await client.query(createRecipeQuery, [recipe.title, categoryId, sourceId, authorId]);
					const recipeId = recipeResult.rows[0].id;
					console.log(`Inserted recipe ${recipe.title} into database with id ${recipeId}`);

					// insert recipe ingredients into database
					if (recipe.ingredients && recipe.ingredients.length > 0) {
						for (const ingredient of recipe.ingredients) {
							await client.query('INSERT INTO recipe_ingredients (recipe_id, ingredient) VALUES ($1, $2)', [recipeId, ingredient]);
						}
						console.log(`Inserted ingredients for recipe ${recipe.title}`);
					}

					// insert recipe steps into database
					if (recipe.steps && recipe.steps.length > 0) {
						for (const step of recipe.steps) {
							await client.query('INSERT INTO recipe_steps (recipe_id, step) VALUES ($1, $2)', [recipeId, step]);
						}
						console.log(`Inserted steps for recipe ${recipe.title}`);
					}

				}
			}
		}
	} catch (error) {
		console.error('Error loading authors and sources', error);
		throw error;
	}

}