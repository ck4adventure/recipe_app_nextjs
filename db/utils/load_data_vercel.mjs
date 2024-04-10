// read the folders of the data folder and parse
// author name then types, then source title, finally recipes
// and insert them into the database

import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import authorsData from '../../data/authors-sources.json' assert { type: "json" };
import categoriesData from '../../data/categories.json' assert { type: "json" };

const dataDir = path.join(process.cwd(), 'data');
const dataFolders = fs.readdirSync(dataDir);


export const loadData = async (client) => {
	let authorId;

	try {
		// first read in authors and sources data
		for (const authorObject of authorsData) {
			const { author_name, author_slug, is_profi, sources } = authorObject;

			// create author
			await client.sql`INSERT INTO authors (name, is_profi) VALUES (${author_name}, ${is_profi})`;

			// iterate the authors sources
			if (sources) {
				for (const sourceObject of sources) {
					const { source_title, source_url, source_type } = sourceObject;

					// create source
					await client.sql`INSERT INTO sources (title, source_url, source_type) VALUES (${source_title}, ${source_url}, ${source_type})`;

				}
			}
		}

		// next create the categories
		for (const category of categoriesData) {
			await client.sql`INSERT INTO categories (name) VALUES (${category})`;
		}
		console.log('Categories loaded');



		// iterate over data folders and parse sub folders, reading in recipes
		for (const folderAuthorSlug of dataFolders) {
			// there are some json files in the data folder, skip those
			if (path.extname(folderAuthorSlug) === '.json') {
				console.log(`Skipping json file ${folderAuthorSlug}`);
				continue;
			}

			// read in source folders for that author
			console.log(`Processing author folder ${folderAuthorSlug}`);
			const authorDir = path.join(dataDir, folderAuthorSlug);
			if (folderAuthorSlug != 'various') {
				const authorResult = await client.sql`SELECT id FROM authors WHERE slug = ${folderAuthorSlug}`
				authorId = authorResult.rows[0].id;
			}
			const sourceFolders = fs.readdirSync(authorDir);

			// iterate over source folders
			for (const sourceFolder of sourceFolders) {
				console.log(`Processing source folder ${sourceFolder}`);
				const sourceDir = path.join(authorDir, sourceFolder);
				const sourceResult = await client.sql`SELECT id FROM sources WHERE slug = ${sourceFolder}`
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
						const authorResult = await client.sql`SELECT id FROM authors WHERE slug = ${recipe.author}`
						authorId = authorResult.rows[0].id;
					}

					if (!authorId) {
						throw new Error('Author id not assigned');
					}

					//get category id
					console.log(`Looking for category ${recipe.category}`);
					const categoryResult = await client.sql`SELECT id FROM categories WHERE name = ${recipe.category}`;
					const categoryId = categoryResult.rows[0].id;
					console.log(`Found category id ${categoryId} for category ${recipe.category}`);

					// insert recipe into database
					const recipeResult = await client.sql`INSERT INTO recipes (title, category_id, source_id, author_id) VALUES (${recipe.title}, ${categoryId}, ${sourceId}, ${authorId}) RETURNING id
`
					const recipeId = recipeResult.rows[0].id;
					console.log(`Inserted recipe ${recipe.title} into database with id ${recipeId}`);

					// insert recipe ingredients into database
					if (recipe.ingredients && recipe.ingredients.length > 0) {
						for (const ingredient of recipe.ingredients) {
							await client.sql`INSERT INTO recipe_ingredients (recipe_id, ingredient) VALUES (${recipeId}, ${ingredient})`;
						}
						console.log(`Inserted ingredients for recipe ${recipe.title}`);
					}

					// insert recipe steps into database
					if (recipe.steps && recipe.steps.length > 0) {
						for (const step of recipe.steps) {
							await client.sql`INSERT INTO recipe_steps (recipe_id, step) VALUES (${recipeId}, ${step})`;
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