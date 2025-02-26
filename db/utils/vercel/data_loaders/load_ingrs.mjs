
import chocolates from '../../../../recipe_store/ingrs/chocolates.mjs';
import dairy_ingredients from '../../../../recipe_store/ingrs/dairy.mjs';
import flours_flakes from '../../../../recipe_store/ingrs/flours_flakes.mjs';
import fruit_ingrs from '../../../../recipe_store/ingrs/fruit.mjs';
import misc_ingredients from '../../../../recipe_store/ingrs/misc.mjs';
import nuts_seeds from '../../../../recipe_store/ingrs/nuts_seeds.mjs';
import spices_powders from '../../../../recipe_store/ingrs/spices_powders.mjs';

async function createItem(category, key, item, client) {
	await client.sql`INSERT INTO ingrs (
					category,
					slug,
					brand, 
					packaged_name, 
					label_name, 
					ingredients, 
					allergens
			) VALUES (        
					${category},
					${key},
					${item.brand}, 
          ${item.name}, 
          ${item.label}, 
          ${item.ingredients}, 
          ${item.allergens})`;
}

export const loadIngrsData = async (client) => {
	try {
		const cKeys = Object.keys(chocolates);
		for (const key of cKeys) {
			const item = chocolates[key];
			console.log('processing: ', key)
			if (!item.allergens) item.allergens = [];
			await createItem("chocolate", key, item, client);
		}

		const dKeys = Object.keys(dairy_ingredients);
		for (const key of dKeys) {
			const item = dairy_ingredients[key];
			console.log('processing: ', key)
			if (!item.allergens) item.allergens = [];
			await createItem("dairy", key, item, client);
		}

		const fKeys = Object.keys(flours_flakes);
		for (const key of fKeys) {
			const item = flours_flakes[key];
			console.log('processing: ', key)
			if (!item.allergens) item.allergens = [];
			await createItem("flours", key, item, client);
		}

		const frKeys = Object.keys(fruit_ingrs);
		for (const key of frKeys) {
			const item = fruit_ingrs[key];
			console.log('processing: ', key)
			if (!item.allergens) item.allergens = [];
			await createItem("fruit", key, item, client);
		}

		const miKeys = Object.keys(misc_ingredients);
		for (const key of miKeys) {
			const item = misc_ingredients[key];
			console.log('processing: ', key)
			if (!item.allergens) item.allergens = [];
			await createItem("misc.", key, item, client);
		}

		const nKeys = Object.keys(nuts_seeds);
		for (const key of nKeys) {
			const item = nuts_seeds[key];
			console.log('processing: ', key)
			if (!item.allergens) item.allergens = [];
			await createItem("nuts", key, item, client);
		}

		const spKeys = Object.keys(spices_powders);
		for (const key of spKeys) {
			const item = spices_powders[key];
			console.log('processing: ', key)
			if (!item.allergens) item.allergens = [];
			await createItem("spices", key, item, client);
		}

		console.log('ingrs loaded');
	} catch (err) {
		console.error('Error loading ingrs lists ', err);
	}
}