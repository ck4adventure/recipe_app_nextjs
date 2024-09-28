import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const dataDir = path.join(process.cwd(), 'data');
const dataFolders = fs.readdirSync(dataDir);

export const loadRecipes = async (client) => {
	try {
		let authorId;
		// iterate over data folders and parse sub folders, reading in recipes
		for (const folderAuthorSlug of dataFolders) {
			// there are some json files in the data folder, skip those
			if (path.extname(folderAuthorSlug) === '.json' || folderAuthorSlug === 'json') {
				console.log(`Skipping json file or folder ${folderAuthorSlug}`);
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
					console.log(`Looking for category ${recipe.category}`)
					const categoryResult = await client.sql`SELECT id FROM categories WHERE name = ${recipe.category}`
					const categoryId = categoryResult.rows[0].id;
					console.log(`Found category id ${categoryId} for category ${recipe.category}`);

					// insert recipe into database
					const recipeResult = await client.sql`INSERT INTO recipes (title, category_id, source_id, author_id) VALUES (${recipe.title}, ${categoryId}, ${sourceId}, ${authorId}) RETURNING id`
					const recipeId = recipeResult.rows[0].id;
					console.log(`Inserted recipe ${recipe.title} into database with id ${recipeId}`);

					// insert recipe ingredients into database
					if (recipe.ingredients && recipe.ingredients.length > 0) {
						for (const ingredient of recipe.ingredients) {
							await client.sql`INSERT INTO recipe_ingredients (recipe_id, ingredient) VALUES (${recipeId}, ${ingredient})`
						}
						console.log(`Inserted ingredients for recipe ${recipe.title}`);
					}

					// insert recipe steps into database
					if (recipe.steps && recipe.steps.length > 0) {
						for (const step of recipe.steps) {
							await client.sql`INSERT INTO recipe_steps (recipe_id, step) VALUES (${recipeId}, ${step})`
						}
						console.log(`Inserted steps for recipe ${recipe.title}`);
					}

				}
			}
		}
	} catch (err) {
		console.error('Error loading recipes ', err);
	}
}