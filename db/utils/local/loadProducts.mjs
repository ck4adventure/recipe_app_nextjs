import fs from 'fs';
import path from 'path';
// first read in the files, then sort
// then open the connection to client
// then read in each file
// catch any errors
// and finallly end the client connection
// migrateTables takes a pool/client and runs all sql migrations in numerical order

// CREATE TABLE if NOT EXISTS products (
// 		id SERIAL PRIMARY KEY,
// 		created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
//     updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
// 		name VARCHAR(255) NOT NULL,
// 		slug VARCHAR(255) NOT NULL CONSTRAINT product_slug_unique UNIQUE,
// 		category VARCHAR(255) DEFAULT 'misc.' NOT NULL,
// 		description VARCHAR(255),
// 		steps TEXT [] NOT NULL DEFAULT '{}',
// 		notes TEXT [] NOT NULL DEFAULT '{}'
// );

// "id": "blueberry_muffin",
// "label": "Blueberry Muffin Tart",
// "description": "Almond almond cream and homemade blueberry jam with a vanilla crumble combine for the ultimate blueberry muffin flavor",
// "price": 4.0,
// "unit": "each",
// "ingredients": {
// 	"base": ["TART_CASE"],
// 	"filling": ["ALMOND_CREAM", "BLUEBERRY_JAM"],
// 	"topping": ["VANILLA_CRUMBLE"]
// }

export const loadProducts = async (pool) => {
	try {
		//recipe_store/recipes/almond_cream/chocolate_almond_cream.mjs
		const folders = fs.readdirSync(path.join(process.cwd(), 'recipe_store', 'products'));

		// tarts, cookies as first categories
		for (const catFolder of folders) {
			// console.log("processing category: ", catFolder);
			const files = fs.readdirSync(path.join(process.cwd(), 'recipe_store', 'products', catFolder));
			for (const file of files) {
				// console.log("processing file", file);
				const filePath = path.join(process.cwd(), 'recipe_store', 'products', catFolder, file);
				const { default: product } = await import(filePath);

				// change style from UPPERCASE_UNDERSCORE to lowercase-dash-spacing
				const slug = product.id.toLowerCase().replace(/_/g, '-');
				if (!product.notes) {
					product.notes = [];
				}
				if (!product.steps) {
					product.steps = [];
				}

				const productResult = await pool.query(`
				INSERT INTO products (
					category,
					name,
					description,
					slug,
					steps,
					notes
				) VALUES ($1, $2, $3, $4, $5, $6)
				RETURNING id, name
			`, [catFolder, product.label, product.description, slug, product.steps, product.notes])

				const productID = productResult.rows[0].id;

				//TODO update to go through base, filling, topping keys
				// ingredients["base"], ["filling"], ["topping"]
				const keys = Object.keys(product.ingredients);
				for (const component of keys) {
					const recipeNames = product.ingredients[component];
					for (let slug of recipeNames) {
						console.log("looking up product recipe: ", slug)
						const recipeResult = await pool.query(
							`SELECT id FROM chefs_recipes WHERE slug LIKE ($1)`,
							[slug.toLowerCase()]
						);

						if (recipeResult.rows.length === 0) {
							console.error(`Recipe not found: ${slug}`);
							throw new Error('recipe not found');
						} else {
							const recipeID = recipeResult.rows[0].id;

							await pool.query(`
							INSERT INTO product_recipes (
								product_id,
								recipe_id,
								component
							) VALUES ($1, $2, $3)
						`, [productID, recipeID, component])
						}
					}
				}

			}
		}
		console.log('products file script finished');
	} catch (error) {
		console.error(error);
	}
}