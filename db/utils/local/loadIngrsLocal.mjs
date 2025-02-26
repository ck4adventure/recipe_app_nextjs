// read the folders of the data folder and parse
// author name then types, then source title, finally recipes
// and insert them into the database
import fs from 'fs';
import path from 'path';
// import chocolates from '../../../recipe_store/ingrs/chocolates.mjs'

export const loadIngrsLocal = async (pool) => {
	try {
		const files = fs.readdirSync(path.join(process.cwd(), 'recipe_store', 'ingrs'));

		for (const catFileName of files) {
			console.log("processsing file ", catFileName);
			const filePath = path.join(process.cwd(), 'recipe_store', 'ingrs', catFileName);
			const { default: ingredients } = await import(filePath);
			const keys = Object.keys(ingredients)
			for (const key of keys) {
				const item = ingredients[key];
				console.log("proc: ", key)
				if (!item.allergens) item.allergens = [];
				await pool.query(
					`INSERT INTO ingrs (
					category,
					slug,
					brand, 
					packaged_name, 
					label_name, 
					ingredients, 
					allergens
			) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
					[catFileName, key, item.brand, item.name, item.label, item.ingredients, item.allergens]
				);
			}
		}
		console.log("ingrs loaded")
	} catch (error) {
		console.error('Error loading ingrs', error);
		throw error;
	}

}