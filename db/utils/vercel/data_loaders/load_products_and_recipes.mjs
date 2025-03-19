import fs from 'fs';
import path from 'path';

// load product
// save main product entry
// get id
// iterate over ingredients keys
// get recipes for each key
// look up recipe id
// create entry into product_recipes


export const loadProductsAndRecipes = async (client) => {
	try {
		// recipe_store/products/tarts/blueberry_muffin_tart.mjs
		// for each recipe file that is also an ingredient
		const categoryFolders = ['tarts', 'cookies'];
		for (let cat of categoryFolders) {
			const files = fs.readdirSync(path.join(process.cwd(), 'recipe_store', 'products', cat));
			for (const file of files) {
				const filePath = path.join(process.cwd(), 'recipe_store', 'products', cat, file);
				const { default: product } = await import(filePath);
				console.log("product: ", product.id); // id in this case is slug (uniq)

				// create product
				if (!product.steps) {
					product.steps = [];
				}
				if (!product.notes) {
					product.notes = [];
				}
				const productResult = await client.sql`
						INSERT INTO products (
							category,
							name,
							description,
							slug,
							steps,
							notes
						) VALUES (${cat}, ${product.label}, ${product.description}, ${product.id}, ${product.steps}, ${product.notes})
						RETURNING id, name`

				// if (productResult.rows.length === 0) {
				// 	throw new Error("problem creating product")
				// }
				const productID = productResult.rows[0].id;

				const components = ["base", "filling", "topping"]
				for (const component of components) {
					// console.log("processing ingr: ", ingredient.name)
					for (let recipeSlug of product.ingredients[component]) {
						recipeSlug = recipeSlug.toLowerCase();
						const recipeResult = await client.sql`
							SELECT * FROM chefs_recipes WHERE slug LIKE ${recipeSlug}
					`;

						if (recipeResult.rows.length === 0) {
							console.error(`Recipe not found: ${recipeSlug}`);
							continue; // Skip this ingredient if not found
						} else {
							// recipe was found, so create entry in product_recipes
							const recipeID = recipeResult.rows[0].id;
							const productRecipeResult = await client.sql`
								INSERT INTO product_recipes (
								product_id,
								recipe_id,
								component
							) VALUES (${productID}, ${recipeID}, ${component})
								RETURNING id
							`;
							console.log(productRecipeResult.rows[0])
							// if (productRecipeResult.rows.length === 0) {
							// 	console.log("error creating entry for: ", recipeSlug, product.label)
							// }
						}
					}
				}

			}
		}

		console.log('products and product_recipes files script finished');
	} catch (error) {
		console.error(error);
	}
}

// migrateTables();