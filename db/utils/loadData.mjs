// read the folders of the data folder and parse
// author name then types, then source title, finally recipes
// and insert them into the database

import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import authorsData from '../../data/authors-sources.json' assert { type: "json" };
import categoriesData from '../../data/categories.json' assert { type: "json" };
import assert from 'assert';

const dataDir = path.join(process.cwd(), 'data');
const dataFolders = fs.readdirSync(dataDir);

// getCategoryByNameQuery takes a category name and finds the id
const getCategoryByNameQuery = `
	SELECT id FROM categories WHERE name = $1
`;

// createAuthor takes a name and is_profi  
const createAuthorQuery = `
	INSERT INTO authors (name, is_profi) VALUES ($1, $2) RETURNING id, slug
`;

// getSourceBySlugQuery takes a title and finds source like it
const getSourceBySlugQuery = `
	SELECT id FROM sources WHERE slug = $1
`;

// createSourceQuery takes a title, source_url, and source_type
const createSourceQuery = `
	INSERT INTO sources (title, source_url, source_type) VALUES ($1, $2, $3) RETURNING id
`;
// createSourceAuthors takes an author_id and source_id
const createSourceAuthorsQuery = `
	INSERT INTO source_authors (author_id, source_id) VALUES ($1, $2)
`;

const createRecipeQuery = `
	INSERT INTO recipes (title, category_id, source_id) VALUES ($1, $2, $3) RETURNING id
`;

export const loadData = async (client) => {
	
	try {
		// first read in authors and sources data
		for (const authorObject of authorsData) {
			const { author_name, author_slug, is_profi, sources } = authorObject;
			
			// create author
			const authorResult = await client.query(createAuthorQuery, [author_name, is_profi]);
			const authorId = authorResult.rows[0].id;
			
			// iterate the authors sources
			for (const sourceObject of sources) {
				const { source_title, source_url, source_type } = sourceObject;
				
				// create source
				const sourceResult = await client.query(createSourceQuery, [source_title, source_url, source_type]);
				const sourceId = sourceResult.rows[0].id;

				// create source_authors entry
				await client.query(createSourceAuthorsQuery, [authorId, sourceId]);
			}
		}

		// next create the categories
		for (const category of categoriesData) {
			await client.query('INSERT INTO categories (name) VALUES ($1)', [category]);
		}
		console.log('Categories loaded');



		// iterate over data folders and parse sub folders, reading in recipes
		for (const folderNameAuthor of dataFolders) {
			// there are some json files in the data folder, skip those
			if (path.extname(folderNameAuthor) === '.json') {
				console.log(`Skipping json file ${folderNameAuthor}`);
				continue;
			}

			// read in source folders for that author
			console.log(`Processing author folder ${folderNameAuthor}`);
			const authorDir = path.join(dataDir, folderNameAuthor);
			const sourceFolders = fs.readdirSync(authorDir);
			
			// iterate over source folders
			for (const sourceFolder of sourceFolders) {
				console.log(`Processing source folder ${sourceFolder}`);
				const sourceDir = path.join(authorDir, sourceFolder);
				
				// read in recipe files for that source
				const recipeFiles = fs.readdirSync(sourceDir);
				// iterate over recipe files
				for (const recipeFile of recipeFiles) {
					console.log(`Processing recipe file ${recipeFile}`);
					const recipePath = path.join(sourceDir, recipeFile);
					// parse yaml file
					const recipeData = fs.readFileSync(recipePath, 'utf-8');
					const recipe = yaml.parse(recipeData);
					// get source id
					const sourceResult = await client.query(getSourceBySlugQuery, [sourceFolder]);
					const sourceId = sourceResult.rows[0].id;
					console.log(`Found source id ${sourceId} for source ${sourceFolder}`);


					//get category id
					console.log(`Looking for category ${recipe.category}`)
					const categoryResult = await client.query(getCategoryByNameQuery, [recipe.category]);
					const categoryId = categoryResult.rows[0].id;
					console.log(`Found category id ${categoryId} for category ${recipe.category}`);

					// insert recipe into database
					const recipeResult = await client.query(createRecipeQuery, [recipe.title, categoryId, sourceId]);
					const recipeId = recipeResult.rows[0].id;
					console.log(`Inserted recipe ${recipe.title} into database with id ${recipeId}`);

					// insert recipe ingredients into database
					for (const ingredient of recipe.ingredients) {
						await client.query('INSERT INTO recipe_ingredients (recipe_id, ingredient) VALUES ($1, $2)', [recipeId, ingredient]);
					}
					console.log(`Inserted ingredients for recipe ${recipe.title}`);

					// insert recipe steps into database
					for (const step of recipe.steps) {
						await client.query('INSERT INTO recipe_steps (recipe_id, step) VALUES ($1, $2)', [recipeId, step]);
					}
					console.log(`Inserted steps for recipe ${recipe.title}`);

				}
			}
		}
	} catch (error) {
		console.error('Error loading authors and sources', error);
		throw error;
	}

}