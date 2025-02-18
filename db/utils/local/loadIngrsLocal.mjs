// read the folders of the data folder and parse
// author name then types, then source title, finally recipes
// and insert them into the database

import chocolates from '../../../recipe_store/ingrs/chocolates.mjs'

export const loadIngrsLocal = async (client) => {
	try {
		const keys = Object.keys(chocolates);
		for (const key of keys) {
			const item = chocolates[key];
			console.log("proc: ", key)
			if (!item.allergens) item.allergens = [];
      await client.query(
        `INSERT INTO ingrs (
					category,
					slug,
					brand, 
					packaged_name, 
					label_name, 
					ingredients, 
					allergens
			) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        ['chocolate', key, item.brand, item.name, item.label, item.ingredients, item.allergens]
      );
    }
		console.log("ingrs loaded")
	} catch (error) {
		console.error('Error loading ingrs', error);
		throw error;
	}

}